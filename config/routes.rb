Rails.application.routes.draw do
  get '/csrf', to: 'csrf#index'

  namespace :api do
    post '/signup', to: 'users#create'
    get '/user', to: 'users#show'
    post '/login', to: 'authentication#login'
    resources :treatment_plans, only: [:create, :show, :update, :destroy, :index]
    resources :aligners, only: [:show, :index]
  end
end
