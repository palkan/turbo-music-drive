Gem::Specification.new do |s|
  s.name        = "turbo-music-drive"
  s.version     = '0.1.0'
  s.summary     = "Turbo Music Drive as a Rails/Hotwire music player demo"
  s.description = "Turbo Music Drive as a Rails/Hotwire music player demo"
  s.authors     = ["palkan"]
  s.files       = Dir.glob("{app,lib,config,db,public,vendor}/**/*") +
    ["config.ru", "log/.keep"]
  s.license     = "MIT"

  s.required_ruby_version = '>= 3.2.0'

  s.add_dependency "rails", "~> 7.1.0"
  s.add_dependency "propshaft"
  s.add_dependency "importmap-rails"
  s.add_dependency "turbo-rails"
  s.add_dependency "stimulus-rails"
  s.add_dependency "tailwindcss-rails"
end
