class ChildrenController < ApplicationController
  def index
    @children = Child.all.order(:created_at)
  end

  def create
    child = Child.create(child_params)
    render json: child
  end

  def destroy
    Child.find(params[:id]).destroy
    render json: Child.all.order(:created_at)
  end

  private
    def child_params
      params.require(:child).permit(:name)
    end
end
