# Chronics.ai Setup Flow E2E Tests

Playwright + TypeScript end-to-end test suite for:
- Setup guide page load checks
- Settings form field presence checks
- Save settings and persistence verification

## Run locally

```bash
npm install
npx playwright install chromium
npm test
```

## Test cases covered

1. **Page loads**
   - Navigates to `/setup`
   - Verifies setup guide is visible
   - Opens the app and verifies required settings fields and **Save Settings** button

2. **Save settings**
   - Enters valid settings values
   - Saves settings
   - Verifies success indicators (`Configured`, `Settings saved`)
   - Reloads and verifies values persist
