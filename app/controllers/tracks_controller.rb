class TracksController < ApplicationController
  def play
    @track = Track.find(params[:id])
  end
end
