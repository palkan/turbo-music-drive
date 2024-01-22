require "/bundle/setup"

ENV["ACTIVE_RECORD_ADAPTER"] = "nulldb"
ENV["RAILS_ENV"] = "production"

require "turbo_music_drive"

# puts Album.count

request = Rack::MockRequest.env_for("http://localhost:3000", {"HTTP_HOST" => "localhost"})

puts Rails.application.call(request)
