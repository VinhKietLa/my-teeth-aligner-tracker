class UsersController < ApplicationController

    def create
      user = User.new(user_params)
        if user.save
          token = generate_jwt_token(user)
          render json: { id: user.id, email: user.email, username: user.username, token: token }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end    
    rescue ActionController::InvalidAuthenticityToken => e
      render json: { error: "Invalid authenticity token" }, status: :unprocessable_entity
    end
  
    private
  
    def user_params
      params.require(:user).permit(:email, :username, :password, :password_confirmation)
    end

    def generate_jwt_token(user)
      payload = { user_id: user.id }
      # Adjust the below line according to your JWT secret and algorithm
      JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
    end
  end
  