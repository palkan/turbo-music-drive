# PWA app to run a Rails Wasm app

## Prerequisites

The app relies on a Service Worker to serve requests through the Rails/Wasm app. Service Workers require secure connections, so we recommend using [puma-dev](https://github.com/puma/puma-dev) to deal with this limitation locally.

Install `puma-dev` and add the port 5173 to its configuration:

```sh
echo "5173" > ~/.puma-dev/vite
```

## Running locallly

```sh
yarn install

yarn dev --host 0.0.0.0
```

Then go to [https://vite.test](https://vite.test).

> [!NOTE]
> Use Chrome or another browser supporting [CookieStore API](https://caniuse.com/?search=cookiestore).

## Known issues

The Ruby VM instance sometimes get lost in the worker (idk 🤷‍♂️). Just unregister it manually and restart the app—everything should work.
