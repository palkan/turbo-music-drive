# WASM version

The minimal WASM version of the app can be built as follows:

- Install [wasi-vfs](https://github.com/kateinoigakukun/wasi-vfs):

  ```sh
  brew tap kateinoigakukun/wasi-vfs https://github.com/kateinoigakukun/wasi-vfs.git
  brew install kateinoigakukun/wasi-vfs/wasi-vfs
  ```

- Install Rust toolchain:

  ```sh
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

- Build a WASM module with Ruby and all the app's dependencies (from the project's root):

  ```sh
  bin/rbwasm build --ruby-version 3.2 -o .wasm/ruby.wasm
  ```

Now you should be able to run a test script (performing an HTTP/Rack request) using [wasmtime](https://github.com/bytecodealliance/wasmtime) like this (from the project's root):

```sh
wasmtime run --dir ./::/rails .wasm/ruby.wasm -e "$(cat .wasm/test.rb)"
```

## Packaging

To pack the whole app into a single `.wasm` module (and avoid mounting files), you can use `wasi-vfs`:

```sh
wasi-vfs pack .wasm/ruby.wasm \
  --dir ./.wasm/root::/rails --dir ./app::/rails/app \
  --dir ./config::/rails/config --dir ./db::/rails/db \
  --dir ./vendor::/rails/vendor --dir ./public::/rails/public \
  --dir ./lib::/rails/lib \
  -o .wasm/turbo-music-drive.wasm
```

You can now verify it as follows:

```sh
wasmtime run .wasm/turbo-music-drive.wasm -e "$(cat .wasm/test.rb)"
```

### Web version

To run the app in the browser, we must compile it with the `js` gem included. For that, run the following commands:

```sh
JS=true bin/rbwasm build --ruby-version 3.2 -o .wasm/ruby-js.wasm
```

And now pach the app:

```sh
wasi-vfs pack .wasm/ruby-js.wasm \
  --dir ./.wasm/root::/rails --dir ./app::/rails/app \
  --dir ./config::/rails/config --dir ./db::/rails/db \
  --dir ./vendor::/rails/vendor --dir ./public::/rails/public \
  --dir ./lib::/rails/lib \
  -o .wasm/pwa-app/turbo-music-drive-web.wasm
```
