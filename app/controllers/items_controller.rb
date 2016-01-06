class ItemsController < ApplicationController
  def index
    @items = Item.all.order(:created_at)
  end

  def create
    @item = Item.create(item_params)
  end

  def check_item
    checked = params[:item][:complete] == 'true' ? true : false
    item = Item.find(params[:id])
    item.update(complete: checked)
    render json: item
  end

  def update
    item = Item.find(params[:id])
    item.update(item_params)
    render json: item
  end

  def destroy
    Item.find(params[:id]).destroy
    head :ok
  end

  private
    def item_params
      params.require(:item).permit(:name, :completed)
    end
end
