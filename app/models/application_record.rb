class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  class << self
    def random
      order(Arel.sql("RANDOM()"))
    end
  end
end
