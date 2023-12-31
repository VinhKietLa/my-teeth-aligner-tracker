# app/controllers/authentication_controller.rb
module Api
  class AuthenticationController < ApplicationController
    def login
      user = User.find_by(username: params[:username])
  
      if user&.authenticate(params[:password])
        token = encode_token({ user_id: user.id })
        render json: { token: token, user: user }, status: :ok
      else
        render json: { error: 'Invalid username or password' }, status: :unauthorized
      end
    end
  
    private
  
    def encode_token(payload)
      JWT.encode(payload, Rails.application.credentials.secret_key_base)
    end
  end
end