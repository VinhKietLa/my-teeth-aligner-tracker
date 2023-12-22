module Api
class AlignersController < ApplicationController
    before_action :authenticate_user
    before_action :set_aligner, only: [:show]

    def index
      # Get all treatment plans for the current user
      treatment_plans = current_user.treatment_plans

      # Collect all aligners from these treatment plans
      aligners = treatment_plans.map(&:aligners).flatten

      render json: aligners
    end

  
    def show
      render json: @aligner
    end
  
    private
  
    def set_aligner
     # Find the treatment plan that includes the aligner with the given ID
     treatment_plan = current_user.treatment_plans.find_by('aligners.id': params[:id])

     # If such a treatment plan exists, set the aligner, otherwise render an error
     if treatment_plan
       @aligner = treatment_plan.aligners.find(params[:id])
     else
       render json: { error: 'Aligner not found or not accessible' }, status: :not_found
     end
    end
  end
end