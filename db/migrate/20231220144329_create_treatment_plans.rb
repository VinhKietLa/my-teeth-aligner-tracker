class CreateTreatmentPlans < ActiveRecord::Migration[7.0]
  def change
    create_table :treatment_plans do |t|
      t.date :start_date
      # Add other necessary fields here
      t.timestamps
    end
  end
end
