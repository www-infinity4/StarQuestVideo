# StarQuest Roadmap

StarQuest is a secondary Infinity media application. The television-history database project is tracked separately as the primary TV platform.

## Phase 1 — Preserve and stabilize

- Preserve the existing browser prototype and tests.
- Document every current screen and state transition.
- Fix broken mobile interactions and keyboard navigation.
- Add a content data schema instead of hard-coding catalog entries throughout the UI.
- Add a clear demonstration label to Star Coins, auctions, coupons, and rewards.

## Phase 2 — Infinity connection

- Register through `infinity.app.json`.
- Add consistent Infinity navigation and design tokens.
- Publish non-sensitive application events.
- Connect to shared identity only after an authenticated identity service exists.

## Phase 3 — Real media foundation

- Add public-domain, creator-owned, or licensed sample media.
- Implement a catalog and program-guide schema.
- Add captions, transcripts, audio descriptions, and accessible controls.
- Add PWA installation and offline shell support.
- Add rights and provenance records for every media item.

## Phase 4 — Services

- Server-side profiles, watchlists, history, and parental controls.
- Signed playback authorization.
- Server-authoritative demonstration rewards ledger.
- Moderated watch rooms and live events.
- Provider-neutral Cosmo AI gateway.

## Phase 5 — Creator and distribution tools

- Creator upload and review pipeline.
- Channel scheduling tools.
- Metadata assistance and caption workflows.
- Sponsor campaign tools with explicit disclosure.
- Exportable catalog and schedule APIs.

## Release gates

A phase is complete only when its behavior is documented, tested, accessible on mobile, free of exposed secrets, and recoverable from a failed deployment.
