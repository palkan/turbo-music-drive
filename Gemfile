source "https://rubygems.org"

ruby "~> 3.3.0"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.0.0"
gem "propshaft"

# Use sqlite3 as the database for Active Record
gem "sqlite3", "~> 2.0"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 6.0"

# Use Vite to manage assets — this is the way! [https://vite-ruby.netlify.app/guide/rails.html]
gem "vite_rails"

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.2"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ]
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
end
