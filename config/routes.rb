Rails.application.routes.draw do
  # ... other routes ...
  post '/api/signup', to: 'users#create'
  get '/csrf', to: 'csrf#index'

end
