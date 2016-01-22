class ItemsController < ApplicationController
  before_action :list

  def index
    @items = @list.items.order(:created_at)
  end

  def create
    @item = @list.items.create(item_params)
  end

  def update
    @item = @list.items.find(params[:id])
    @item.update(item_params)
    render json: @item
  end

  def destroy
    @list.items.find(params[:id]).destroy
    head :ok
  end

  def check_item
    checked = params[:item][:complete] == 'true' ? true : false
    item = @list.items.find(params[:id])
    item.update(complete: checked)
    render json: item
  end

  private
    def list
      @list = List.find(params[:list_id])
    end

    def item_params
      params.require(:item).permit(:name, :complete)
    end
end
