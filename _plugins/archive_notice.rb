# frozen_string_literal: true

# Adds a short "this post is from YEAR" notice to the top of posts older than
# five years, so readers arriving from search know they're reading a snapshot.
# Set `archive_notice: false` in a post's front matter to skip it.
module ArchiveNotice
  YEARS = 5

  def self.cutoff
    today = Time.now
    Time.new(today.year - YEARS, today.month, today.day)
  end
end

Jekyll::Hooks.register :posts, :pre_render do |post|
  next if post.data['archive_notice'] == false
  next unless post.date < ArchiveNotice.cutoff

  notice = '<p class="notice--info">I wrote this in ' \
           "#{post.date.year}. Some of it has aged; read it as a snapshot.</p>\n\n"
  post.content = notice + post.content
end
