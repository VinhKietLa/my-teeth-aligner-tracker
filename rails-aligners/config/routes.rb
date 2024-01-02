Rails.application.routes.draw do

  namespace :api do
    post '/signup', to: 'users#create'
    get '/user', to: 'users#show'
    patch '/user', to: 'users#update'
    patch '/user/changepassword', to: 'users#change_password'

    post '/login', to: 'authentication#login'
    resources :treatment_plans, only: [:create, :show, :update, :destroy, :index]
    resources :aligners, only: [:show, :index]
    get '/csrf', to: 'csrf#index'

  end
end
