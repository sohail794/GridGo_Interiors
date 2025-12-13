# Design Migration Checklist (Before/After)

## Palette
- [ ] Primary background is deep charcoal (`#1a1a1a`).
- [ ] Section/card backgrounds use `#252525` and `#2a2a2a` appropriately.
- [ ] Primary text is white (`#ffffff`); secondary text is muted gray (`#b0b0b0` / `#999999`).
- [ ] Gold accent is consistent (`#d4af37`) with lighter hover (`#e5c158`).
- [ ] Borders/glows use subtle gold alpha (`rgba(212,175,55,0.2)`-ish).

## Typography
- [ ] Global font is Inter.
- [ ] Headings are 600–700 weight; body is 400.
- [ ] Body line-height ~1.6–1.8; headings ~1.2–1.4.

## Spacing & Layout
- [ ] Major sections have ~80–120px vertical spacing on desktop.
- [ ] Cards use ~24–32px gaps and ~24–40px internal padding.
- [ ] Border radius sits in the 8–16px range.

## Motion & Scroll
- [ ] Scroll reveals are fade + slide-up (40–60px) using 0.6–0.8s ease-out.
- [ ] Stagger animations are 0.1–0.15s between children.
- [ ] Buttons hover scale ~1.05 with ~0.3s transitions.
- [ ] Cards hover lift ~-8px with stronger shadow and subtle gold glow.
- [ ] Reduced-motion disables smooth scrolling and reveal/hover motion.

## Accessibility
- [ ] All interactive icon buttons have `aria-label`.
- [ ] Decorative elements use `aria-hidden="true"`.
- [ ] Focus rings are clearly visible and gold-accented.

## Non-negotiables
- [ ] No changes to routing/navigation behavior.
- [ ] No content removed.
- [ ] Forms/backend integrations unchanged.
- [ ] SEO tags remain intact.
