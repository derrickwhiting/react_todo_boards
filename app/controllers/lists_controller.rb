class ListsController < ApplicationController
  
  before_action :child

  def index
    @lists = @child.lists
  end

  def create
    @list = @child.lists.create(list_params)
  end

  private
  def child
    @child = Child.find(params[:id])
  end

  def list_params
    params.require(:list).permit(:name, :percent_complete)
  end
end
