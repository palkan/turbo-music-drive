class ApplicationController < ActionController::Base
  around_action :set_turbo_session_id

  private

  def set_turbo_session_id(&block)
    Current.set(turbo_session_id: request.headers["X-Turbo-Session-ID"], &block)
  end
end
