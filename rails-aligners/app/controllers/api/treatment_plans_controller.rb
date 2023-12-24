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

    def update
      if @treatment_plan.update(treatment_plan_params)
        render json: { status: 'success', treatment_plan: @treatment_plan }, status: :ok
      else
        render json: { errors: @treatment_plan.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    private

    def set_treatment_plan
      @treatment_plan = current_user.treatment_plans.find(params[:id])
    end
  
    def treatment_plan_params
        params.require(:treatment_plan).permit(
          :start_date,
          :other_attributes,
          aligners_attributes: [:id,:duration_weeks, :other_aligner_attribute, :_destroy]
        )
      end
      
      
  end
end



  