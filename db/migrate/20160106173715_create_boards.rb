class CreateChildren < ActiveRecord::Migration
  def change
    create_table :children do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
