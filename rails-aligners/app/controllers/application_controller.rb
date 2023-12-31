class ApplicationController < ActionController::Base

    protect_from_forgery with: :null_session

    def authenticate_user
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        begin
          @decoded = JWT.decode(header, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')
          @current_user = User.find(@decoded[0]['user_id'])
        rescue ActiveRecord::RecordNotFound => e
          Rails.logger.info "User not found: #{e.message}"
          render json: { errors: e.message }, status: :unauthorized
        rescue JWT::DecodeError => e
          Rails.logger.info "JWT Decode Error: #{e.message}"
          render json: { errors: e.message }, status: :unauthorized
        end
      end

      def current_user
        token = request.headers['Authorization']&.split(' ')&.last
        if token
          user_id = decode_token(token)&.first&.fetch('user_id', nil)
          @current_user ||= User.find_by(id: user_id)
        end
      end

      private

  def decode_token(token)
    JWT.decode(token, Rails.application.credentials.secret_key_base, true, { algorithm: 'HS256' })
  rescue JWT::DecodeError
    nil
  end
end
