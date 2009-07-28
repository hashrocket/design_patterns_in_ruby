module Site
  # Thanks to Chris Wanstrath http://ozmm.org/posts/singin_singletons.html
  extend self
  attr_accessor :url

  def ping
    puts "pinging #{url}"
  end
end

Site.url = "http://google.com"
Site.ping
Object.send :remove_const, :Site



module Site
  class << self
    attr_accessor :url

    def ping
      puts "pinging #{url}"
    end
  end
end

Site.url = "http://google.com"
Site.ping
Object.send :remove_const, :Site



module Site
  class << self; attr_accessor :url end
  module_function

  def ping
    puts "pinging #{url}"
  end
end

Site.url = "http://google.com"
Site.ping
Object.send :remove_const, :Site
