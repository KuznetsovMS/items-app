json.extract! @item, :id, :name, :created_at
json.image @item.image.url(:thumb)
