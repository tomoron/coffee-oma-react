module Api
  module V1
    class RelationshipsController < ApplicationController
      before_action :authenticate_api_v1_user!, only: %i[create destroy]

      def create
        user = User.find_by(id: params[:relationships][:follow_id])
        follow = current_api_v1_user.follow(user)
        if follow.nil?
          render status: :not_found
        else
          render status: :created
        end
      end

      def destroy
        follow = current_api_v1_user.unfollow(params[:id])
        if follow.nil?
          render status: :not_found
        else
          render status: :ok
        end
      end

      def exists
        user = User.find_by(id: params[:follow_id])
        if user
          follow = current_api_v1_user.following?(user) if api_v1_user_signed_in?
          render json: { follow: follow }, status: :ok
        else
          render status: :not_found
        end
      end
    end
  end
end
