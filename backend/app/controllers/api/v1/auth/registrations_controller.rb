module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        before_action :configure_permitted_parameters
        before_action :authenticate_api_v1_user!, only: %i[update]

        def show
          user = User.find_by(id: params[:id])
          if user
            render json: { status: 'success', data: resource_data(resource_json: user.token_validation_response) }
          else
            render status: :unauthorized
          end
        end

        def update
          if @resource.update_without_current_password(account_update_params)
            render_update_success
          else
            render_update_error_user_not_found
          end
        end

        protected

          def configure_permitted_parameters
            devise_parameter_sanitizer.permit(:sign_up, keys: %i[name])
            devise_parameter_sanitizer.permit(:account_update, keys: %i[name icon profile])
          end

        private

          def sign_up_params
            params.require(:registration).permit(:email, :name, :password, :password_confirmation)
          end

          def account_update_params
            params.require(:registration).permit(:password, :email, :profile, :icon, :name, :password_confirmation, :current_password)
          end

          def account_update_no_password_params
            params.require(:registration).permit(:email, :profile, :icon, :name, :password, :password_confirmation)
          end
      end
    end
  end
end
