Rails.application.routes.draw do
  # ... other routes ...
  post '/api/signup', to: 'users#create'
  get '/csrf', to: 'csrf#index'
post '/login', to: 'authentication_controller#login'
post '/api/treatment_plans', to: 'treatment_plans#create'

end
