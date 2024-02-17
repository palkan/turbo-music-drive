import { init as initDB } from "./database.js";
import { init as initVM } from "./rails.js";
import setCookieParser from "set-cookie-parser";

self.addEventListener("activate", (event) => {
  console.log("[Service Worker]", event);
  event.waitUntil(Promise.resolve());
});

self.addEventListener("install", (event) => {
  console.log("[Service Worker]", event);
  event.waitUntil(installApp());
});

const installApp = async () => {
  const db = await initDB();

  self.sqlite4rails = {
    exec: function (sql) {
      let cols = [];
      return {
        cols,
        rows: db.exec(sql, { columnNames: cols, returnValue: "resultRows" }),
      };
    },
  };

  self.RailsVM = await initVM();
};

self.addEventListener("fetch", (event) => {
  // console.log("[Service Worker]", event);

  if (event.request.url.includes("/_setup_")) {
    return event.respondWith(fetch(event.request));
  }

  return event.respondWith(respondWithRails(event));
});

const respondWithRails = async (event) => {
  let vm = self.RailsVM;

  if (!vm) {
    await installApp();
    vm = self.RailsVM;
  }

  const railsURL = event.request.url.replace("https://", "http://");
  const railsHeaders = {};

  for (const [key, value] of event.request.headers.entries()) {
    railsHeaders[`HTTP_${key.toUpperCase().replaceAll("-", "_")}`] = value;
  }

  try {
    const cookies = await cookieStore.getAll();
    const railsCookie = cookies.map((c) => `${c.name}=${c.value}`).join("; ");

    railsHeaders["HTTP_COOKIE"] = railsCookie;

    console.log("[Service Worker] Rails request", {
      url: railsURL,
      headers: railsHeaders,
    });

    const command = `
      request = Rack::MockRequest.env_for(
        "${railsURL}",
        JSON.parse(%q[${JSON.stringify(railsHeaders)}]).merge(
          method: :${event.request.method}
        )
      )

      response = Rack::Response[*Rails.application.call(request)]
      status, headers, bodyiter = *response.finish

      body = ""
      bodyiter.each { |part| body += part }

      # Serve images as base64 from Ruby and decode back in JS
      if headers["Content-Type"] == "image/png"
        body = Base64.strict_encode64(body)
      end

      {
        status: status,
        headers: headers,
        body: body
      }
    `;

    // console.log("[Service Worker]", command);

    const res = self.RailsVM.eval(command).toJS();

    console.log("[Service Worker] Rails response", res);

    let { code, headers, body } = res;

    const cookie = headers["set-cookie"];

    if (cookie) {
      const cookies = setCookieParser.parse(cookie, { decodeValues: false });
      cookies.forEach(async (c) => {
        console.log("[Service Worker]", "Setting Cookie", c);
        await cookieStore.set({
          name: c.name,
          value: c.value,
          domain: c.domain,
          path: c.path,
          expires: c.expires,
          sameSite: c.sameSite.toLowerCase(),
        });
      });
    }

    // Convert image into a blob
    if (headers["content-type"] == "image/png") {
      console.log("[Service Worker]", "Converting image into blob");

      body = await fetch(`data:image/png;base64,${body}`).then((res) =>
        res.blob()
      );
    }

    return new Response(body, { headers, status: code });
  } catch (e) {
    console.error(e);
    return new Response(`Application Error: ${e.message}`, {
      status: 500,
    });
  }
};
