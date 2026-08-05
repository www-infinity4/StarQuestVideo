# StarQuest TV

StarQuest TV is the flagship entertainment platform in the Infinity ecosystem: a browser-based television, video, rewards, collectibles, watch-room, and AI companion experience.

The current application already demonstrates the core product loop:

1. Browse entertainment.
2. Open the StarQuest player.
3. Share or participate.
4. Earn Star Coins.
5. Unlock rooms, sponsor rewards, and collectibles.
6. Ask Cosmo for entertainment guidance.

## Product vision

StarQuest should become a unified television operating system rather than a single streaming page. It can serve scheduled channels, on-demand programs, independent creators, public-domain libraries, live events, interactive programming, digital collectibles, rewards, and optional AI-assisted discovery through one consistent interface.

The platform is designed around four layers:

- **StarQuest Experience** — television guide, channels, player, rooms, profiles, search, accessibility, and responsive interfaces.
- **StarQuest Services** — catalog, schedules, playback authorization, wallet ledger, rewards, auctions, sponsor offers, and notifications.
- **Cosmo Intelligence** — recommendations, summaries, search assistance, captions, translations, and creator tools through a provider-neutral server gateway.
- **Infinity Platform Connection** — shared identity, navigation, design tokens, application registry, events, and links back to the main Infinity portal.

## What works now

- Responsive entertainment browsing interface
- Simulated video-player workflow
- Local Star Coin wallet
- Share-to-earn interaction
- Unlockable viewing rooms
- Collectible auction interface
- Sponsor coupon moments
- Cosmo entertainment companion interface
- Automated Node test suite with no third-party dependencies

## Run locally

No build system is required for the current prototype.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

Run the existing tests with:

```bash
npm test
```

## Repository contract

The file `infinity.app.json` identifies StarQuest to the Infinity root registry. Other Infinity applications should use the same contract so the root portal can discover their name, category, status, entry point, capabilities, and integration events without copying their source code.

## Safety and security boundaries

The current Star Coin wallet and auctions are demonstrations stored in the browser. They are not real-money systems and must not be represented as secure financial custody.

Before production use:

- move identity, balances, purchases, bids, rewards, and entitlements to an authenticated server;
- keep Gemini, OpenAI, OpenRouter, media-provider, and sponsor credentials off the client;
- validate all catalog and user-generated data server-side;
- use signed playback URLs and explicit content rights records;
- add rate limits, abuse controls, audit logs, parental controls, privacy controls, and account recovery;
- never promise an application is impossible to hack—use layered controls, monitoring, backups, and rapid recovery.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/ROADMAP.md`](docs/ROADMAP.md), and [`docs/CONTENT-RIGHTS.md`](docs/CONTENT-RIGHTS.md).

## Initial release path

The first reliable public release should focus on:

- a polished TV guide and channel browser;
- public-domain, creator-owned, or properly licensed media only;
- local profiles and watchlists;
- installable PWA behavior;
- accessible playback controls and captions;
- a clearly labeled demonstration Star Coin system;
- an optional server-hosted Cosmo assistant;
- automatic registration inside the Infinity root portal.

## Ownership

Created and directed by Kris Watson under the `www-infinity4` GitHub account.
