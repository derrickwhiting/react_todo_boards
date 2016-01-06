json.items @items do |item|
  json.id item.id
  json.name item.name
  json.complete item.complete
  json.url item_url(item)
end

# json.items @items do |item|
#   json.(item, :id, :name, :complete)
#   json.url item_url(item)
# end