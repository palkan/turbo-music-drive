class Track < ApplicationRecord
  belongs_to :album, counter_cache: true
  has_one :artist, through: :album

  validates :title, length: {maximum: 255}

  normalizes :title, with: -> { _1.squish }

  after_create do
    Artist.increment_counter(:tracks_count, album.artist_id) # rubocop:disable Rails/SkipsModelValidations
  end

  after_destroy do
    Artist.decrement_counter(:tracks_count, album.artist_id) # rubocop:disable Rails/SkipsModelValidations
  end

  scope :ordered, -> { order(position: :asc) }
  scope :sorted, ->(sort) {
    case sort
    when "a-z"
      order(title: :asc)
    when "z-a"
      order(title: :desc)
    when "old-new"
      joins(:album).merge(Album.order(year: :asc, title: :asc)).ordered
    when "new-old"
      joins(:album).merge(Album.order(year: :desc, title: :asc)).ordered
    else
      raise ArgumentError, "Unknown sort parameter: #{sort_by}"
    end
  }
  scope :search, ->(q) {
    where(arel_table[:title].lower.matches("%#{q.downcase}%"))
  }

  def url = @url ||= "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-#{(1..17).to_a.sample}.mp3"
end
