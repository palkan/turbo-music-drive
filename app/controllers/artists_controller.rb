class ArtistsController < ApplicationController
  def show
    @artist = Artist.find(params[:id])
  end
end
