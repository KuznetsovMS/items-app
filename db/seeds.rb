Item.destroy_all
3.times do 
  Item.create(name: 'Test item')
end