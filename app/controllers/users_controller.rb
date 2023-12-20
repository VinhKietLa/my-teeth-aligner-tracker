class UsersController < ApplicationController

    def create
      user = User.new(user_params)
      if user.save
        # Handle successful save, maybe return the user object or a success message
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
  end
  