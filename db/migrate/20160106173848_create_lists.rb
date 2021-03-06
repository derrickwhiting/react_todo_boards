class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name
      t.float :percent_complete
      t.belongs_to :child, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
