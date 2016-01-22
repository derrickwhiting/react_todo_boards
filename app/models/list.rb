class List < ActiveRecord::Base
  belongs_to :child
  has_many :items, dependent: :destroy
end
