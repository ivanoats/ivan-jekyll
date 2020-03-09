# frozen_string_literal: true

module Jekyll
  # Displays a notification before and after the build process.
  class GrowlGenerator < Generator
    def initialize(_config = {})
      require 'growl'
    rescue LoadError
      warn 'You are missing a library required for growl. Please run:'
      warn '  $ [sudo] gem install growl'
      raise FatalException, 'Missing dependency: growl'
    end

    def generate(site); end
  end

  # :nodoc:
  class Site
    alias process_without_growl process

    def process
      Growl.notify 'Building...', title: 'Jekyll'
      process_without_growl
      Growl.notify 'Build complete', title: 'Jekyll'
    end
  end
end
