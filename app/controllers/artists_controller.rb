class ArtistsController < ApplicationController
  def show
    @artist = Artist.find(params[:id])
    @analytics = @artist.analytics
  end
end
