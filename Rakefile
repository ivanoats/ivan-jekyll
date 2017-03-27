# task :default => :deploy

task :build_prod do
  sh "JEKYLL_ENV=production jekyll build"
end

task :deploy => :build_prod do
  sh "aero deploy"
end

task :serve do
  sh "jekyll serve"
end