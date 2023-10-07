class CreateAlbums < ActiveRecord::Migration[7.1]
  def change
    create_table :albums do |t|
      t.string :title, null: false
      t.string :cover_url, null: true

      t.integer :year, null: false

      t.belongs_to :artist, foreign_key: true, null: false

      t.integer :tracks_count, null: false, default: 0

      t.timestamps
    end
  end
end
