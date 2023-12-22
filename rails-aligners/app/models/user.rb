class User < ApplicationRecord
  has_many :treatment_plans, dependent: :destroy

    has_secure_password
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
    # Add any other validations you find necessary
  end
  