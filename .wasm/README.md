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
wasmtime run .wasm/ruby.wasm -e "$(cat .wasm/test.rb)"
```
