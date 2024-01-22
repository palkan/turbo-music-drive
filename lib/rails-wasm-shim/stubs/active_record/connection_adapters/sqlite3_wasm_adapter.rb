require "active_record/connection_adapters/sqlite3_adapter"

module ActiveRecord
  module ConnectionHandling # :nodoc:
    def sqlite3_wasm_adapter_class
      ConnectionAdapters::SQLite3WasmAdapter
    end

    def sqlite3_wasm_connection(config)
      sqlite3_wasm_adapter_class.new(config)
    end
  end

  module ConnectionAdapters
    class SQLite3WasmAdapter < SQLite3Adapter
    end
  end
end
