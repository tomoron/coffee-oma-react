require 'rails_helper'

RSpec.describe 'Auth::Registrations', type: :request do
  let(:user) { create(:user) }
  let(:user1) { create(:user, email: 'test1@example.com', name: 'test1') }

  describe 'GET /show' do
    it 'レスポンス成功' do
      get "/api/v1/auth/registrations/#{user.id}"
      expect(response).to have_http_status(:ok)
    end

    it 'レスポンス失敗' do
      get "/api/v1/auth/registrations/#{user.id + 2}"
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'PUT /update' do
    context 'ログインしている時' do
      sign_in(:user)
      it 'レスポンス成功(パスワードなし)' do
        put api_v1_user_registration_path, params: { registration: { name: 'test20' } }
        expect(response).to have_http_status(:ok)
      end

      it 'レスポンス成功(パスワード)' do
        put api_v1_user_registration_path, params: { registration: { name: 'test20', password: '12345678', password_confirmation: '12345678' } }
        expect(response).to have_http_status(:ok)
      end

      it 'レスポンス失敗' do
        put api_v1_user_registration_path, params: { registration: { name: '' } }
        expect(response).to have_http_status(:not_found)
      end
    end

    it 'ログインしていない時' do
      put api_v1_user_registration_path, params: { registration: { name: 'test20' } }
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
