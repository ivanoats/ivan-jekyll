# -*- encoding: utf-8 -*-
# stub: s3_website 3.4.0 ruby lib

Gem::Specification.new do |s|
  s.name = "s3_website".freeze
  s.version = "3.4.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Lauri Lehmijoki".freeze]
  s.date = "2017-10-11"
  s.description = "\n    Sync website files, set redirects, use HTTP performance optimisations, deliver via\n    CloudFront.\n  ".freeze
  s.email = ["lauri.lehmijoki@iki.fi".freeze]
  s.executables = ["s3_website".freeze]
  s.files = ["bin/s3_website".freeze]
  s.homepage = "https://github.com/laurilehmijoki/s3_website".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.4.20".freeze
  s.summary = "Manage your S3 website".freeze

  s.installed_by_version = "3.4.20" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<thor>.freeze, ["~> 0.18"])
  s.add_runtime_dependency(%q<configure-s3-website>.freeze, ["= 2.3.0"])
  s.add_runtime_dependency(%q<colored>.freeze, ["= 1.2"])
  s.add_runtime_dependency(%q<dotenv>.freeze, ["~> 1.0"])
  s.add_development_dependency(%q<rake>.freeze, ["= 10.1.1"])
  s.add_development_dependency(%q<octokit>.freeze, ["= 3.1.0"])
  s.add_development_dependency(%q<mime-types>.freeze, [">= 0"])
end
