Rails.application.routes.draw do
  # ... other routes ...
  post '/api/signup', to: 'users#create'
  get '/csrf', to: 'csrf#index'
post '/api/login', to: 'authentication#login'
post '/api/treatment_plans', to: 'treatment_plans#create'

end
