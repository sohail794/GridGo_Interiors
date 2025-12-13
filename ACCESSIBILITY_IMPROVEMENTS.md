# Accessibility Improvements (Design Migration)

This migration preserves existing functionality and content while improving consistency and accessibility.

## Focus + Keyboard
- Gold focus indicators remain consistent across buttons, links, tabs, and icon controls.
- All focus styles respect `prefers-reduced-motion` (motion reduced to near-zero).

## ARIA + Semantics
- Icon-only controls keep `aria-label` (e.g., modal close buttons).
- Tab UI uses `role="tablist"` / `role="tab"` and `aria-selected` where applicable.
- Decorative layers keep `aria-hidden="true"`.

## Images
- Content images keep meaningful `alt` text; decorative images use empty `alt`.
- Lazy-loading remains in place for non-critical images.

## Motion Preferences
- Scroll reveals and hover motion respect `prefers-reduced-motion: reduce`.
- Smooth scrolling is disabled under reduced-motion.
