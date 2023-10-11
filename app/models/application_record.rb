class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  class << self
    def random
      order(Arel.sql("RANDOM()"))
    end

    def broadcasts_refreshes
      after_commit do
        Turbo::StreamsChannel.broadcast_stream_to(
          self,
          content: Turbo::StreamsChannel.turbo_stream_action_tag(
            :refresh,
            :"session-id" => Current.turbo_session_id
          )
        )
      end
    end
  end
end
