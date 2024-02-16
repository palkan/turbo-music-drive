import { DefaultRubyVM } from "@ruby/wasm-wasi/dist/browser";

import sqlite3WasmAdapterSource from "./sqlite3_wasm.rb?raw";

const APP_URL = "/turbo-music-drive-web.wasm"; //"https://vladem.s3.us-west-1.amazonaws.com/turbo-music-drive/web.wasm";

export const init = async () => {
  const module = await WebAssembly.compileStreaming(fetch(APP_URL));

  const { vm } = await DefaultRubyVM(module);

  vm.eval(`
    require "/bundle/setup"

    require "js"

    ENV["RAILS_ENV"] = "production"
    ENV["ACTIVE_RECORD_ADAPTER"] = "sqlite3_wasm"

    puts "Initializing Rails application..."

    require "/rails/lib/turbo_music_drive"

    ${sqlite3WasmAdapterSource}

    puts "Rails application #{Rails.application.class.name.sub("::Application", "")} (#{Rails::VERSION::STRING}) has been initialized"
  `);

  return vm;
};
