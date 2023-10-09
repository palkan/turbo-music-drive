class Artist
  class Analytics
    PERIODS = %w[week month year].freeze

    attr_reader :artist, :period

    def initialize(artist, period)
      @artist = artist
      period ||= "week"

      raise ArgumentError, "Unknown period: #{period}" unless period.in?(PERIODS)
      @period = period
    end

    # Dummy (but stable) data generation
    # We use a string representaion of the artist as a source
    # for our hash function
    def total
      # Base value is for weekly listenings and it's must be in range 100..999
      base_value = 100 + (artist.name.hash % 900)

      # Now, we adjust it for the period
      case period
      when "week"
        base_value
      when "month"
        base_value * 4
      when "year"
        base_value * 52
      end
    end
  end
end
