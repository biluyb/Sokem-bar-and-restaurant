# Quality Assurance & Testing Strategy

## 1. Automated Verification Standard

All proposed code additions must pass clean build verification:
```bash
npm run lint
npm run build
```

---

## 2. Testing Layers

### 2.1 Unit & Integration Testing
- **Tooling**: Vitest + React Testing Library.
- **Scope**: Zod validator schemas, helper formatters (currency, date formatting), atomic UI components (`Button`, `Badge`, `Modal`).

### 2.2 End-to-End (E2E) Testing
- **Tooling**: Playwright.
- **Scope**: Critical user journeys:
  1. Menu browsing, search filtering, and dietary tag selection.
  2. Submitting a valid table reservation form.
  3. Administrative login and menu item status toggle.

---

## 3. Lighthouse & Accessibility Audits
- Target Lighthouse scores > 90 for Performance, Accessibility, Best Practices, and SEO.
- Zero accessibility violations on automated axe-core audits.
