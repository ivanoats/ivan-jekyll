# frozen_string_literal: true

# task :default => :deploy

desc 'production build'
task :build_prod do
  sh 'JEKYLL_ENV=production bundle exec jekyll build'
end

desc 'clean site building artifacts'
task :clean do
  sh 'bundle exec jekyll clean'
end

desc 'localhost serve'
task :serve do
  sh 'bundle exec jekyll serve'
end
task s: :serve
