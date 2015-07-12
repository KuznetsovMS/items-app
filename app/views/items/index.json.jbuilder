json.array!(@items) do |item|
  json.id item.id
  json.name item.name
  json.image item.image.url(:thumb)
  json.created_at item.created_at
end