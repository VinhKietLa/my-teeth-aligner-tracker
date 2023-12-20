class AddUserToTreatmentPlans < ActiveRecord::Migration[7.0]
  def change
    add_reference :treatment_plans, :user, null: false, foreign_key: true
  end
end
