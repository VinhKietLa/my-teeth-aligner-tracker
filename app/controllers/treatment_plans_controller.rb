class TreatmentPlansController < ApplicationController
    before_action :authenticate_user # Ensure the user is logged in
  
    def create
      treatment_plan = current_user.treatment_plans.new(treatment_plan_params)
      if treatment_plan.save
        render json: { status: 'success', treatment_plan: treatment_plan }, status: :created
      else
        render json: { errors: treatment_plan.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def treatment_plan_params
        params.require(:treatment_plan).permit(
          :start_date,
          :other_attributes,
          aligners_attributes: [:duration_weeks, :other_aligner_attribute]
        )
      end
      
      
  end
  