class ItemsController < ApplicationController
  def show
    @item = Item.find(params[:id])
  end

  def create
    @item = Item.new(item_params.merge(completed: false))
    
    if @item.save
      redirect_to root_path, notice: 'Item added successfully!'
    else
      redirect_to root_path, alert: 'Failed to add item'
    end
  end

  def update
    @item = Item.find(params[:id])
    @item.update!(completed: !@item.completed)
    redirect_to root_path
  end

  private

  def item_params
    params.require(:item).permit(:name)
  end
end