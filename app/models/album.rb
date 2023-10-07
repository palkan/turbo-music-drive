class Album < ApplicationRecord
  has_many :tracks, dependent: :destroy, inverse_of: :album

  belongs_to :artist, counter_cache: true

  validates :title, presence: true

  normalizes :title, with: -> { _1.squish }

  scope :ordered, -> { order(year: :desc, title: :desc) }
  scope :search, ->(q) {
    where(arel_table[:title].lower.matches("%#{q.downcase}%"))
  }
end
