class TreatmentPlan < ApplicationRecord
    has_many :aligners, dependent: :destroy
    accepts_nested_attributes_for :aligners, allow_destroy:true
  end
  