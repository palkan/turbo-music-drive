class LibraryController < ApplicationController
  def index
    @albums = Album.all.random.limit(20)
  end
end
