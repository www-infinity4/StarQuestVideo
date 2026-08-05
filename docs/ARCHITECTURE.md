# StarQuest TV Architecture

## Principle

StarQuest remains its own application and connects to Infinity through contracts. The root portal should discover and launch StarQuest; it should not absorb every StarQuest source file.

## Target components

### Web application

The browser application owns presentation, playback controls, local accessibility preferences, optimistic UI, and offline shell behavior. It must not contain private provider keys or authoritative wallet balances.

### Catalog service

Stores channels, programs, episodes, creators, genres, artwork, availability windows, ratings, captions, territories, and content-rights records.

### Schedule service

Creates linear channel schedules and electronic program guide data. On-demand media and scheduled television should share the same catalog identifiers.

### Playback service

Checks entitlement and returns short-lived signed playback information. Production media should use supported streaming formats and a legitimate storage/CDN provider.

### Identity and profiles

Provides accounts, household profiles, parental controls, watch history, watchlists, accessibility settings, blocked content, and account recovery.

### Star Coin ledger

The existing browser wallet is a prototype. A production reward ledger must be server-authoritative, append-only, idempotent, auditable, and separate from real-money claims unless legal and financial requirements are deliberately implemented.

### Rooms and live events

Provides invitations, presence, synchronization, moderation, chat controls, reporting, and event capacity management.

### Auctions and collectibles

The current auction screen is demonstrative. Production bidding requires authoritative timestamps, anti-fraud controls, clear terms, ownership records, and jurisdiction review.

### Cosmo AI gateway

Cosmo calls a server endpoint such as `/api/ai/chat`. The server selects an enabled provider and keeps all credentials secret. A provider adapter should normalize Gemini, OpenAI, or another approved service behind one internal response format.

## Infinity integration

`infinity.app.json` is the machine-readable application contract. The Infinity root registry can read it to show StarQuest as a secondary media application, route users to it, and understand which cross-application events it supports.

## Event format

Events should be versioned JSON messages with an event ID, timestamp, application ID, event name, schema version, and non-sensitive payload. Never place tokens, passwords, private viewing history, or payment data in browser broadcast events.
