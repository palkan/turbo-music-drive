class Artist < ApplicationRecord
  has_many :albums, dependent: :destroy
  has_many :tracks, through: :albums

  broadcasts_refreshes

  validates :name, presence: true, uniqueness: true

  normalizes :name, with: -> { _1.squish }

  scope :search, ->(q) {
    where(arel_table[:name].lower.matches("%#{q.downcase}%"))
  }

  def analytics(period: nil) = Analytics.new(self, period)

  def current_listeners
    @current_listeners ||= begin
      cache_key = "listeners:#{id}"
      # We keep the array of expiration timestamps
      Rails.cache.read(cache_key).then do |timestamps|
        next 0 unless timestamps

        old_count = timestamps.map(&:first).uniq.size

        timestamps.select! { |(user_id, ts)| ts > Time.current.to_i }

        Rails.cache.write(cache_key, timestamps)

        new_count = timestamps.map(&:first).uniq.size

        broadcast_refresh if old_count != new_count

        new_count
      end
    end
  end

  def track_current_listener(user_id)
    cache_key = "listeners:#{id}"

    current = Rails.cache.read(cache_key) || []
    current << [user_id, 3.minutes.from_now.to_i]
    Rails.cache.write(cache_key, current)

    broadcast_refresh
  end
end
