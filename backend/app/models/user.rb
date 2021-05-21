# frozen_string_literal: true

class User < ActiveRecord::Base # rubocop:disable Rails/ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  has_many :likes, dependent: :destroy

  has_many :relationships, dependent: :destroy
  has_many :followings, through: :relationships,source: :follow
  has_many :reverse_of_relationships,class_name: 'Relationship',foreign_key: 'follow_id',dependent: :destroy
  has_many :followers,through: :reverse_of_relationships, source: :user
end
