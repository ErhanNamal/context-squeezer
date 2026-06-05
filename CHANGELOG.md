# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-06-05

### Added

- **🎨 Enhanced Terminal UI**: Beautiful colored console output with improved readability
- **📈 Detailed File Statistics**: 
  - File count breakdown by extension
  - Top 5 largest files report
  - File size display in human-readable format
- **📋 JSON Output Mode**: Export statistics in JSON format using `--json` flag for programmatic access and automation
- **⏰ Timestamp Tracking**: Added ISO 8601 timestamps to all output for better tracking
- **🎯 Version Display**: CLI now displays current version (v1.1.0) in the banner

### Improved

- Better visual hierarchy in terminal output with color coding
- More informative analytics report with extension breakdown
- Cleaner separation between output sections
- Enhanced CLI help message with all available options
- Improved file scanning performance tracking

### Changed

- Default output now uses colored terminal formatting (colors module)
- Stats interface extended with file extension breakdown and largest files tracking
- `packProject()` function now returns more detailed statistics

### Technical

- Added new `colors.ts` utility module for terminal formatting
- Updated `ProjectStats` interface to include extension breakdown and file details
- Improved file analysis to track file extensions and size distribution

---

## [1.0.4] - Previous Release

### Features

- Core CLI functionality
- Repository scanning and context file generation
- LLM token estimation
- Sensitive data masking
- Binary file detection
- Custom `.aiignore` support
- Basic analytics reporting

---

## Migration Guide

### From v1.0.x to v1.1.0

No breaking changes! All v1.0.x commands work exactly as before:

```bash
# These commands still work unchanged
npx context-squeezer-cli
npx context-squeezer-cli -o output.txt
```

**New features you can use:**

```bash
# Get JSON output
npx context-squeezer-cli --json

# Combine with custom output
npx context-squeezer-cli -o my_context.txt --json
```
