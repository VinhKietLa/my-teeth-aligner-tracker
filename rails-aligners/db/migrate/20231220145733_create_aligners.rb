class CreateAligners < ActiveRecord::Migration[7.0]
  def change
    create_table :aligners do |t|
      t.integer :duration_weeks
      t.references :treatment_plan, null: false, foreign_key: true

      t.timestamps
    end
  end
end
