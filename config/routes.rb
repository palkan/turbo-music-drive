Rails.application.routes.draw do
  resources :albums, only: [:show]
  resources :artists, only: [:show] do
    resource :analytics, only: [:show], module: :artists
  end
  resources :tracks, only: [] do
    member do
      post :play
    end
  end

  root "library#index"
end
