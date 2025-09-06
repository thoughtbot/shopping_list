class ItemsController < ApplicationController
  def show
    @item = Item.find(params[:id])
  end

  def create
    @item = Item.new(item_params.merge(completed: false))
    
    if @item.save
      @item.broadcast_append_later_to(
        "shopping",
        save_target: "item_#{@item.id}",
        target: "shopping_list",
        partial: "shopping_lists/item"
      )

      respond_to do |format|
        flash[:notice] = "Item added succesfully"
        format.html { redirect_to root_path }
        format.json { render layout: "stream" }
      end
    else
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { render layout: "stream" }
      end
    end
  end

  def update
    @item = Item.find(params[:id])
    @item.update!(completed: !@item.completed)
    @item.broadcast_save_later_to(
      "shopping",
      target: "item_#{@item.id}",
      partial: "shopping_lists/item"
    )
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { render layout: "stream" }
    end
  end

  private

  def item_params
    params.require(:item).permit(:name)
  end
end