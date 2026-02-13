# Ruby 3 Upgrade and Other Recommendations

## Completed Upgrades

### Ruby Upgrade ✅
- **Previous Version**: Ruby 2.7.2
- **New Version**: Ruby 3.4.2
- **Status**: Successfully upgraded and tested
- **Files Updated**:
  - `.tool-versions`: Updated Ruby version specification to 3.4.2
  - `Gemfile.lock`: Already compatible with Ruby 3.4.2 (specifies ruby 3.4.2p28)
  - `netlify.toml`: Already specifies Ruby 3.4.2
  - `_plugins/growl_generator.rb`: Fixed to call `super` in initializer (Ruby 3 best practice)
- **Note**: The Gemfile uses `ruby RUBY_VERSION` which allows flexibility. All gems are verified compatible with Ruby 3.x.

### Node.js Upgrade ✅
- **Previous Version**: Node.js 20.10.0
- **New Version**: Node.js 24.13.1 (LTS "Krypton")
- **Status**: Updated in `.tool-versions`
- **Reason**: Moving to latest LTS version for better security and performance

### Code Quality Improvements ✅
- Fixed Rubocop warning in `_plugins/growl_generator.rb` by adding `super` call in initialize method
- All Rubocop checks now pass with no offenses

### Build Configuration ✅
- Added `vendor/bundle` and `.bundle` to `.gitignore` to prevent committing dependency files
- Verified Jekyll build works successfully with Ruby 3.4.2

## Recommended Future Upgrades

### 1. AWS SDK v2 → v3 (High Priority) ⚠️

**Current Status**: Using deprecated AWS SDK v2 (via `s3_website` gem)

**Issue**: When installing dependencies, you'll see these warnings:
```
Post-install message from aws-sdk-core:
AWS SDK For Ruby V2 has been marked as deprecated. Please upgrade to AWS SDK For Ruby V3.
```

**Recommendation**: 
- The `s3_website` gem depends on AWS SDK v2, which is deprecated
- Consider alternatives:
  - Use AWS CLI directly for S3 deployments
  - Use GitHub Actions or Netlify for deployment (already using Netlify based on README badge)
  - Migrate to a maintained deployment tool

**Note**: Since Netlify is already being used (per README), the `s3_website` gem may not be needed at all. Consider removing it if S3 deployment is no longer used.

### 2. Jekyll Minimal Mistakes Theme (Low Priority) ℹ️

**Current Version**: 4.26.2 (specified with `>= 4.26.2`)
**Latest Available**: Should check periodically for updates

**Recommendation**: 
- The theme is already using a flexible version constraint
- Monitor for updates to get new features and bug fixes
- Review the [theme changelog](https://github.com/mmistakes/minimal-mistakes/releases) periodically

### 3. npm Packages (Current Status) ✅

**Packages are up to date**:
- `purgecss`: ^6.0.0 (latest)
- `scottyjs`: ^1.10.2

No immediate action needed for npm packages.

### 4. Ruby Gems (Low Priority) ℹ️

Most gems are already using flexible version constraints and are up to date. A few to monitor:

- **jekyll**: Currently `>= 4.3.3`, latest is 4.4.1 ✅ (already installed)
- **minimal-mistakes-jekyll**: Currently `>= 4.26.2`, latest is 4.26.2 ✅
- **rubocop**: Currently `~> 1.66, >= 1.66.0`, latest is 1.72.2 ✅ (already installed)

All gems are up to date!

### 5. Consider Removing Unused Dependencies (Optional) 🔍

**Potential candidates for removal** (if not actively used):

1. **growl**: Used for macOS desktop notifications during builds
   - May not be needed in CI/CD environments
   - Could be moved to a development-only group

2. **s3_website**: For AWS S3 deployment
   - If using Netlify exclusively, this may not be needed
   - Uses deprecated AWS SDK v2

**Recommendation**: Audit which deployment method is actually being used and remove unused gems.

## Testing Checklist

All tests passed ✅:
- [x] Bundle install completes successfully
- [x] Jekyll build completes without errors
- [x] Rubocop linting passes with no offenses
- [x] No Ruby 2.x deprecated syntax detected
- [x] Build artifacts are correctly ignored in git

## Migration Notes

The upgrade from Ruby 2.7.2 to Ruby 3.4.2 is significant (spanning Ruby 3.0, 3.1, 3.2, 3.3, and 3.4). Key improvements include:

- **Performance**: Ruby 3.x is significantly faster than Ruby 2.7
- **YJIT**: Ruby 3.1+ includes YJIT (Just-In-Time compiler) for even better performance
- **Pattern Matching**: Enhanced pattern matching capabilities
- **Type Checking**: Better support for type checking with RBS
- **Security**: Multiple security patches and improvements

No breaking changes were found in the codebase that required modification beyond the initializer fix.

## Deployment Considerations

When deploying with the upgraded Ruby version:

1. **Netlify**: Already configured to use Ruby 3.4.2 in `netlify.toml` ✅
2. **Local Development**: Use `asdf` or similar tool to install Ruby 3.4.2 as specified in `.tool-versions`
3. **CI/CD**: Update any CI/CD pipelines to use Ruby 3.4.2 and Node.js 24.13.1

## Next Steps

1. ✅ Upgrade complete and tested
2. Consider removing `s3_website` gem if not actively deploying to S3
3. Monitor for security updates to Ruby 3.4.x and Node.js 24.x
4. Review AWS SDK v2 deprecation when convenient
