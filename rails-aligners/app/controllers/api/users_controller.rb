module Api
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

    def show
      if current_user
        render json: { id: current_user.id, email: current_user.email, username: current_user.username }, status: :ok
      else
        render json: { error: 'Not Authorized' }, status: :unauthorized
      end
    end

    def update
      # Assuming you have a method `current_user` that returns the logged-in user
      if current_user.update(user_params)
        render json: current_user
      else
        render json: current_user.errors, status: :unprocessable_entity
      end
    end
    
    def change_password
      user = current_user # Assuming you have a way to identify the current user

      if user.authenticate(params[:old_password])
        if user.update(password: params[:new_password])
          # Handle successful password change
          render json: { message: "Password successfully updated" }, status: :ok
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "Old password is incorrect" }, status: :unauthorized
      end
    end
    private
  
    def user_params
      params.require(:user).permit(:email, :username, :password, :password_confirmation)
    end

    def generate_jwt_token(user)
      payload = { user_id: user.id }
      # Adjust the below line according to your JWT secret and algorithm
      JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
    end
  end
end
  