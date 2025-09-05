Rails.application.routes.draw do
  root 'shopping_lists#show'
  resource :shopping_list, only: [:show]
  resources :items, only: [:show, :create]
end
