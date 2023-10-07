Rails.application.routes.draw do
  resources :albums, only: [:show]
  resources :artists, only: [:show]
  resources :tracks, only: [] do
    member do
      post :play
    end
  end

  root "library#index"
end
