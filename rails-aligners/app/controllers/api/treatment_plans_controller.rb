module Api
class TreatmentPlansController < ApplicationController
  before_action :authenticate_user
  before_action :set_treatment_plan, only: [:show, :update, :destroy]

    def create
      treatment_plan = current_user.treatment_plans.new(treatment_plan_params)
      if treatment_plan.save
        render json: { status: 'success', treatment_plan: treatment_plan }, status: :created
      else
        render json: { errors: treatment_plan.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def index
      treatment_plans = current_user.treatment_plans
      render json: treatment_plans
    end

    def show
      render json: {
        treatment_plan: @treatment_plan,
        aligners: @treatment_plan.aligners
      }
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
end
  