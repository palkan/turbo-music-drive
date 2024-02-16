source "https://rubygems.org"

ruby "3.2.2"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.1.0", group: [:default, :wasm]

# Use sqlite3 as the database for Active Record
gem "sqlite3", "~> 1.4"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Assets management
gem "propshaft", group: [:default, :wasm]

# Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
gem "importmap-rails", group: [:default, :wasm]

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails", group: [:default, :wasm]

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails", group: [:default, :wasm]

# Use Tailwind CSS [https://github.com/rails/tailwindcss-rails]
gem "tailwindcss-rails", group: [:default, :wasm]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.2"

group :wasm do
  # Use nulldb as the database for Active Record
  gem "activerecord-nulldb-adapter"

  # Time zone info for ActiveSupport
  gem "tzinfo-data"

  # Building
  gem "ruby_wasm", "~> 2.5"
end

# JavaScript integration for Wasm
gem "js", group: :js

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ]
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
end
