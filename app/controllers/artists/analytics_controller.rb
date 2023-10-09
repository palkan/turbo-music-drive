module Artists
  class AnalyticsController < ApplicationController
    def show
      @artist = Artist.find(params[:artist_id])

      @analytics = @artist.analytics(period: params[:period])
    end
  end
end
