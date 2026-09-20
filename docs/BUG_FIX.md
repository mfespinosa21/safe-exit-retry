# Bug Fix Record

## Bug 001 - Focus does not move into the rehearsal

**Found:** 2026-09-20 during the Deployment 1 mechanical pass.  
**Environment:** Published static build and source regression test.

### Reproduction steps

1. Assign all three fictional owners.
2. Activate **Start fictional rehearsal** using the keyboard.
3. Observe keyboard focus after the setup screen closes.

### Expected

Focus moves to the rehearsal container so a keyboard or screen-reader user immediately reaches the new context.

### Actual

The script calls `focus()` on `#rehearsal-shell`, but the section is not programmatically focusable because it has no `tabindex`.

### Root cause

The HTML omitted `tabindex="-1"` from the rehearsal container while the launch handler assumed the element could receive focus.

### Planned fix

Add `tabindex="-1"` to the rehearsal section and keep the existing focus call. Add a regression check that requires the attribute.

### Fix applied

Added `tabindex="-1"` to `#rehearsal-shell`, allowing the existing launch handler to move focus into the newly displayed context.

### Regression result

The selector test now finds `#rehearsal-shell[tabindex="-1"]`. JavaScript syntax and required-asset checks continue to pass.
