# Mechanical Test Log

| Date | Environment | Test | Expected | Actual | Status | Evidence |
|---|---|---|---|---|---|---|
| 2026-09-20 | Deployment 1 / static inspection | JavaScript syntax | `app.js` parses successfully | Parsed successfully | PASS | `node --check dist/app.js` |
| 2026-09-20 | Deployment 1 / static inspection | Required assets | HTML, CSS, and mockup asset exist | All required assets found | PASS | File checks |
| 2026-09-20 | Deployment 1 / static inspection | No persistent or network data flow | No storage, fetch, secret, or raw HTML injection pattern | No prohibited pattern found | PASS | Source scan |
| 2026-09-20 | Deployment 1 / source regression | Focus moves to rehearsal after launch | Rehearsal shell accepts programmatic focus | `focus()` targets a section without `tabindex`, so keyboard focus does not move | FAIL | Selector test for `#rehearsal-shell[tabindex="-1"]` |
| 2026-09-20 | Corrected build / source regression | Focus moves to rehearsal after launch | Rehearsal shell accepts programmatic focus | Rehearsal shell now has `tabindex="-1"` and accepts focus | PASS | Selector regression test |
