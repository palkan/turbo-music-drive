# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "@hotwired--turbo-rails.js" # @8.0.12
pin "@hotwired/turbo", to: "@hotwired--turbo.js" # @8.0.12
pin "@rails/actioncable/src", to: "@rails--actioncable--src.js" # @7.2.200
pin "@hotwired/stimulus", to: "@hotwired--stimulus.js" # @3.2.2
pin "idiomorph" # https://github.com/basecamp/idiomorph/blob/rollout-build/dist/idiomorph-esm.js
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "utils/fake_audio", to: "utils/fake_audio.js"
pin "stimulus-animated-number" # @4.1.0
pin "turbo-view-transitions" # @0.3.0
