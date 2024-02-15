const registerServiceWorker = async () => {
  console.log(
    "Register service worker",
    "prod",
    import.meta.env.MODE === "production"
  );
  if ("serviceWorker" in navigator) {
    try {
      const isProd = import.meta.env.MODE === "production";
      const registration = await navigator.serviceWorker.register(
        isProd ? "/sw.js" : "/dev-sw.js?dev-sw",
        {
          scope: "./",
          type: isProd ? "classic" : "module",
        }
      );

      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  } else {
    console.warn("Service worker is not supported");
  }
};

registerServiceWorker();
