class TracksController < ApplicationController
  after_action :track_listener

  def play
    @track = Track.find(params[:id])
  end

  private

  def track_listener = @track.artist.track_current_listener(Current.turbo_session_id)
end
