class Artist < ApplicationRecord
  has_many :albums, dependent: :destroy
  has_many :tracks, through: :albums

  validates :name, presence: true, uniqueness: true

  normalizes :name, with: -> { _1.squish }

  scope :search, ->(q) {
    where(arel_table[:name].lower.matches("%#{q.downcase}%"))
  }

  def analytics(period: nil) = Analytics.new(self, period)
end
