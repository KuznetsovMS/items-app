class Item < ActiveRecord::Base
  validates :name, presence: true
  has_attached_file :image
  has_attached_file :image, :default_url => "/images/default.jpg", :styles => {:thumb => '100x100'}
  validates_attachment :image, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"] }
end
