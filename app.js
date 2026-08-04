/**
 * StarQuest TV — Main Application
 *
 * Features:
 *  - Content browser (free + locked titles)
 *  - Share counter → Star Coin earn (every 10 shares)
 *  - Star Coin wallet with coupon layer + unlock history
 *  - Unlock Rooms (spend coins to enter)
 *  - Collectible Auctions (bid with coins)
 *  - Cosmo AI companion (chat + content suggestions)
 *  - Sponsor ad moment (triggered after earning/spending value)
 */

// ─── Data ────────────────────────────────────────────────────────────────────

const CONTENT = [
  {
    id: 1,
    title: "Galactic Odyssey",
    genre: "Sci-Fi",
    emoji: "🚀",
    locked: false,
    sponsored: "Paramount",
    sponsorEmoji: "🎬",
    desc: "An epic journey across star systems featuring breathtaking visuals.",
    coupon: { label: "Free Paramount+ Trial – 7 days", expiry: "2026-09-01" },
  },
  {
    id: 2,
    title: "Neon Samurai",
    genre: "Action",
    emoji: "⚔️",
    locked: false,
    sponsored: null,
    desc: "A cyberpunk warrior battles corporate overlords in a neon-drenched city.",
    coupon: null,
  },
  {
    id: 3,
    title: "The Deep Blue",
    genre: "Documentary",
    emoji: "🌊",
    locked: false,
    sponsored: "Discovery",
    sponsorEmoji: "🔬",
    desc: "Dive into the mysteries of the ocean in stunning 4K.",
    coupon: { label: "Discovery+ 1 Month Free", expiry: "2026-08-15" },
  },
  {
    id: 4,
    title: "Stardust Chronicles",
    genre: "Drama",
    emoji: "✨",
    locked: true,
    lockCost: 1,
    sponsored: null,
    desc: "A moving drama about family, loss, and second chances.",
    coupon: null,
  },
  {
    id: 5,
    title: "Midnight Heist",
    genre: "Thriller",
    emoji: "🎭",
    locked: true,
    lockCost: 1,
    sponsored: "AMC+",
    sponsorEmoji: "🎟️",
    desc: "The perfect crime. Until it wasn't.",
    coupon: { label: "$5 AMC Movie Ticket Coupon", expiry: "2026-10-01" },
  },
  {
    id: 6,
    title: "Cosmo: Origins",
    genre: "Animation",
    emoji: "🤖",
    locked: true,
    lockCost: 2,
    sponsored: "Paramount",
    sponsorEmoji: "🎬",
    desc: "The animated origin story of your favorite AI companion.",
    coupon: { label: "Free Yogurt Reward – Yoplait", expiry: "2026-08-30" },
  },
];

const ROOMS = [
  {
    id: 1,
    name: "Premiere Night: Galactic Odyssey",
    desc: "Watch the Paramount premiere together. Live director Q&A after.",
    emoji: "🎬",
    cost: 2,
    status: "live",
    capacity: 500,
  },
  {
    id: 2,
    name: "Creator Room: Neon Samurai Director's Cut",
    desc: "Exclusive extended cut with director commentary. Limited seats.",
    emoji: "🎥",
    cost: 3,
    status: "live",
    capacity: 200,
  },
  {
    id: 3,
    name: "Community Watch Party: The Deep Blue",
    desc: "Casual group watch. Chat with other fans in real time.",
    emoji: "🌊",
    cost: 1,
    status: "soon",
    capacity: 1000,
  },
  {
    id: 4,
    name: "Cosmo AI Special Event",
    desc: "Cosmo hosts a live trivia night with collectible drop rewards.",
    emoji: "🤖",
    cost: 2,
    status: "soon",
    capacity: 750,
  },
];

const AUCTIONS = [
  {
    id: 1,
    name: "Signed Galactic Odyssey Poster",
    emoji: "🖼️",
    currentBid: 8,
    endsIn: "2h 14m",
  },
  {
    id: 2,
    name: "Neon Samurai Collectible Figure",
    emoji: "🗡️",
    currentBid: 15,
    endsIn: "6h 42m",
  },
  {
    id: 3,
    name: "Cosmo AI Digital Companion NFT",
    emoji: "🤖",
    currentBid: 22,
    endsIn: "1d 3h",
  },
  {
    id: 4,
    name: "Creator Room Lifetime Pass",
    emoji: "🎟️",
    currentBid: 40,
    endsIn: "3d 8h",
  },
];

const COSMO_RESPONSES = {
  default: [
    "Great question! StarQuest connects entertainment with real rewards. Try sharing a title to earn your first Star Coin!",
    "Star Coins unlock premium content, creator rooms, and exclusive auctions. The more you engage, the more you earn!",
    "I can recommend content based on your watch history. What genre interests you most?",
    "Sponsors attach coupons to Star Coins — so your coin might be worth a free Paramount trial or a yogurt coupon!",
    "Watch parties in Unlock Rooms are my favorite. You get a live chat, a director Q&A, and exclusive access all at once.",
  ],
  unlock: [
    "Locked content needs Star Coins to access. You earn coins by sharing titles — 10 shares = 1 coin!",
    "Share your favorite titles to earn coins faster. Each share brings you closer to that next unlock.",
  ],
  auction: [
    "Auctions close when the timer runs out — bid your Star Coins on collectibles before someone else does!",
    "Collectibles from auctions can gain value as StarQuest grows. Think of them as entertainment-backed assets.",
  ],
  coupon: [
    "Each Star Coin can carry one active coupon from a sponsor. When a coupon expires, a new one rotates in automatically!",
    "Coupons are backed by real sponsors — movie tickets, streaming trials, food rewards, and more.",
  ],
};

const SPONSOR_ADS = [
  {
    sponsor: "Paramount",
    emoji: "🎬",
    title: "Paramount+ is Sponsoring Your Reward",
    msg: "You just unlocked a Paramount viewing. As a thank-you, here's your exclusive coupon:",
    coupon: "7-Day Free Paramount+ Trial",
  },
  {
    sponsor: "Discovery",
    emoji: "🔬",
    title: "Discovery+ Rewards Your Activity",
    msg: "Your Star Coin is backed by Discovery+ this month. Claim your free month:",
    coupon: "1 Month Free – Discovery+",
  },
  {
    sponsor: "Yoplait",
    emoji: "🥛",
    title: "Yoplait Supports StarQuest",
    msg: "Yoplait is backing this Star Coin. Enjoy a free reward at participating stores:",
    coupon: "Free Yoplait Yogurt (any variety)",
  },
  {
    sponsor: "AMC Theatres",
    emoji: "🎟️",
    title: "AMC Theatres Coupon Attached",
    msg: "Your Star Coin carries an AMC reward. Use it at any AMC location:",
    coupon: "$5 AMC Movie Ticket",
  },
];

// ─── State ────────────────────────────────────────────────────────────────────

const state = {
  coins: 0,
  shareCount: 0,           // total shares across all titles
  perTitleShares: {},      // { contentId: shareCount }
  coupons: [],             // { label, expiry, sponsor }
  unlockHistory: [],       // { action, timestamp }
  unlockedContent: new Set(),
  unlockedRooms: new Set(),
  currentContent: null,
  pendingRoom: null,
  pendingAuction: null,
};

// ─── Persistence ──────────────────────────────────────────────────────────────

function saveState() {
  try {
    const serializable = {
      ...state,
      unlockedContent: [...state.unlockedContent],
      unlockedRooms: [...state.unlockedRooms],
    };
    localStorage.setItem("starquest_state", JSON.stringify(serializable));
  } catch (_) {
    // Storage unavailable — silently continue
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem("starquest_state");
    if (!raw) return;
    const saved = JSON.parse(raw);
    state.coins = saved.coins ?? 0;
    state.shareCount = saved.shareCount ?? 0;
    state.perTitleShares = saved.perTitleShares ?? {};
    state.coupons = saved.coupons ?? [];
    state.unlockHistory = saved.unlockHistory ?? [];
    state.unlockedContent = new Set(saved.unlockedContent ?? []);
    state.unlockedRooms = new Set(saved.unlockedRooms ?? []);
  } catch (_) {
    // Corrupted storage — start fresh
  }
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function awardCoin(reason) {
  state.coins += 1;
  addHistory(`Earned 1 Star Coin — ${reason}`);
  updateCoinCount();
  saveState();
  showCoinAnimation(reason);
}

function spendCoins(amount, reason) {
  if (state.coins < amount) return false;
  state.coins -= amount;
  addHistory(`Spent ${amount} Star Coin${amount > 1 ? "s" : ""} — ${reason}`);
  updateCoinCount();
  saveState();
  return true;
}

function addHistory(action) {
  state.unlockHistory.unshift({ action, timestamp: new Date().toLocaleString() });
  if (state.unlockHistory.length > 30) state.unlockHistory.pop();
}

function attachCoupon(coupon, sponsor) {
  // Remove expired coupons before adding
  const now = new Date();
  state.coupons = state.coupons.filter(c => new Date(c.expiry) > now);
  state.coupons.push({ label: coupon, sponsor, expiry: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split("T")[0] });
  saveState();
}

function updateCoinCount() {
  document.getElementById("coinCount").textContent = state.coins;
  document.getElementById("walletBalance").textContent = state.coins;
}

function toast(msg) {
  let el = document.getElementById("toastEl");
  if (!el) {
    el = document.createElement("div");
    el.id = "toastEl";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove("show"), 3000);
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`page-${pageId}`).classList.add("active");
  document.querySelectorAll(".nav-link").forEach(l => {
    l.classList.toggle("active", l.dataset.page === pageId);
  });
}

// ─── Content Grid ─────────────────────────────────────────────────────────────

function renderContentGrid() {
  const grid = document.getElementById("contentGrid");
  grid.innerHTML = "";
  CONTENT.forEach(item => {
    const isLocked = item.locked && !state.unlockedContent.has(item.id);
    const card = document.createElement("div");
    card.className = `content-card${isLocked ? " locked" : ""}`;
    card.innerHTML = `
      <div class="card-thumb">
        ${item.emoji}
        ${isLocked ? `<div class="lock-overlay"><span class="lock-icon">🔒</span><span>🌟 ${item.lockCost} Coin${item.lockCost > 1 ? "s" : ""}</span></div>` : ""}
      </div>
      <div class="card-info">
        <div class="card-title">${item.title}</div>
        <div class="card-meta">
          <span>${item.genre}</span>
          ${item.sponsored ? `<span class="sponsor-tag">${item.sponsored}</span>` : ""}
        </div>
      </div>
    `;
    card.addEventListener("click", () => openPlayer(item));
    grid.appendChild(card);
  });
}

// ─── Player ───────────────────────────────────────────────────────────────────

function openPlayer(item) {
  const isLocked = item.locked && !state.unlockedContent.has(item.id);
  if (isLocked) {
    // Prompt to unlock
    promptUnlockContent(item);
    return;
  }
  state.currentContent = item;
  document.getElementById("playerTitle").textContent = item.title;
  document.getElementById("playerName").textContent = item.title;
  document.getElementById("playerDesc").textContent = item.desc;
  document.getElementById("playerSponsor").textContent = item.sponsored ? `Sponsored by ${item.sponsored}` : "";
  // Reset share badge for this title
  const shares = state.perTitleShares[item.id] || 0;
  document.getElementById("shareCountBadge").textContent = shares % 10;
  openModal("playerModal");
}

function promptUnlockContent(item) {
  state.pendingRoom = null;
  // Reuse room modal for content unlock
  document.getElementById("roomTitle").textContent = `Unlock: ${item.title}`;
  document.getElementById("roomDesc").textContent = item.desc;
  document.getElementById("roomCost").textContent = item.lockCost;
  document.getElementById("roomConfirm").onclick = () => {
    const ok = spendCoins(item.lockCost, `Unlocked "${item.title}"`);
    if (!ok) { toast("Not enough Star Coins!"); return; }
    state.unlockedContent.add(item.id);
    saveState();
    closeModal("roomModal");
    renderContentGrid();
    toast(`"${item.title}" unlocked!`);
    openPlayer(item);
    // Trigger sponsor ad if item has coupon
    if (item.coupon && item.sponsored) {
      setTimeout(() => showSponsorAd(item.coupon.label, item.sponsored, item.sponsorEmoji || "🎬"), 1200);
    }
  };
  document.getElementById("roomCancel").onclick = () => closeModal("roomModal");
  openModal("roomModal");
}

// ─── Share Counter ────────────────────────────────────────────────────────────

document.getElementById("shareBtn").addEventListener("click", () => {
  if (!state.currentContent) return;
  const id = state.currentContent.id;
  state.perTitleShares[id] = (state.perTitleShares[id] || 0) + 1;
  state.shareCount += 1;
  saveState();

  const titleShares = state.perTitleShares[id];
  document.getElementById("shareCountBadge").textContent = titleShares % 10;
  toast(`Shared! ${10 - (titleShares % 10)} more shares until a Star Coin.`);

  // Award coin every 10 shares per title
  if (titleShares % 10 === 0) {
    const coupon = state.currentContent.coupon;
    const reason = `10 shares of "${state.currentContent.title}"`;
    awardCoin(reason);
    if (coupon) {
      attachCoupon(coupon.label, state.currentContent.sponsored || "StarQuest");
    }
    // Show sponsor ad after earning
    if (state.currentContent.sponsored && coupon) {
      setTimeout(() => showSponsorAd(coupon.label, state.currentContent.sponsored, state.currentContent.sponsorEmoji || "🎬"), 2200);
    }
  }
});

// ─── Coin Animation ───────────────────────────────────────────────────────────

function showCoinAnimation(reason) {
  document.getElementById("coinAnimMsg").textContent = `+1 Star Coin — ${reason}`;
  const el = document.getElementById("coinAnimation");
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 2500);
}

// ─── Wallet ───────────────────────────────────────────────────────────────────

document.getElementById("walletBtn").addEventListener("click", openWallet);

function openWallet() {
  updateCoinCount();
  renderCouponList();
  renderHistory();
  openModal("walletModal");
}

function renderCouponList() {
  const list = document.getElementById("couponList");
  const now = new Date();
  const active = state.coupons.filter(c => new Date(c.expiry) > now);
  if (!active.length) {
    list.innerHTML = `<p class="no-coupons">No active coupons. Share titles to earn Star Coins with attached coupons!</p>`;
    return;
  }
  list.innerHTML = active.map(c => `
    <div class="coupon-item">
      <span>${c.label}</span>
      <span class="coupon-expiry">Exp. ${c.expiry}</span>
    </div>
  `).join("");
}

function renderHistory() {
  const ul = document.getElementById("unlockHistory");
  if (!state.unlockHistory.length) {
    ul.innerHTML = `<li class="history-item">No activity yet.</li>`;
    return;
  }
  ul.innerHTML = state.unlockHistory.map(h => `
    <li class="history-item">
      <span class="history-action">${h.action}</span><br>
      <span style="font-size:0.75rem;color:var(--text-muted)">${h.timestamp}</span>
    </li>
  `).join("");
}

// ─── Rooms ────────────────────────────────────────────────────────────────────

function renderRoomsGrid() {
  const grid = document.getElementById("roomsGrid");
  grid.innerHTML = "";
  ROOMS.forEach(room => {
    const entered = state.unlockedRooms.has(room.id);
    const card = document.createElement("div");
    card.className = "room-card";
    card.innerHTML = `
      <div class="room-card-icon">${room.emoji}</div>
      <div class="room-card-name">${room.name}</div>
      <div class="room-card-desc">${room.desc}</div>
      <div class="room-card-cost">🌟 ${entered ? "Entered" : `${room.cost} Coin${room.cost > 1 ? "s" : ""}`}</div>
      <span class="room-card-status status-${room.status}">${room.status === "live" ? "● LIVE" : "⏱ Soon"}</span>
    `;
    if (!entered) card.addEventListener("click", () => openRoomConfirm(room));
    else card.style.opacity = "0.6";
    grid.appendChild(card);
  });
}

function openRoomConfirm(room) {
  state.pendingRoom = room;
  document.getElementById("roomTitle").textContent = room.name;
  document.getElementById("roomDesc").textContent = room.desc;
  document.getElementById("roomCost").textContent = room.cost;
  document.getElementById("roomConfirm").onclick = confirmRoomEntry;
  document.getElementById("roomCancel").onclick = () => closeModal("roomModal");
  openModal("roomModal");
}

function confirmRoomEntry() {
  const room = state.pendingRoom;
  if (!room) return;
  const ok = spendCoins(room.cost, `Entered room: ${room.name}`);
  if (!ok) { toast("Not enough Star Coins!"); return; }
  state.unlockedRooms.add(room.id);
  saveState();
  closeModal("roomModal");
  renderRoomsGrid();
  toast(`You entered "${room.name}"!`);
  state.pendingRoom = null;
}

// ─── Auctions ─────────────────────────────────────────────────────────────────

function renderAuctionsGrid() {
  const grid = document.getElementById("auctionsGrid");
  grid.innerHTML = "";
  AUCTIONS.forEach(auction => {
    const card = document.createElement("div");
    card.className = "auction-card";
    card.innerHTML = `
      <div class="auction-card-icon">${auction.emoji}</div>
      <div class="auction-card-name">${auction.name}</div>
      <div class="auction-bid-row">
        <div>
          <div class="auction-current">Current Bid</div>
          <div class="auction-amount">🌟 ${auction.currentBid}</div>
        </div>
        <div class="auction-timer">⏱ ${auction.endsIn}</div>
      </div>
      <button class="auction-bid-btn">Place Bid</button>
    `;
    card.querySelector(".auction-bid-btn").addEventListener("click", () => openBidModal(auction));
    grid.appendChild(card);
  });
}

// Dynamic bid modal
let bidModalEl = null;

function openBidModal(auction) {
  state.pendingAuction = auction;
  if (!bidModalEl) {
    bidModalEl = document.createElement("div");
    bidModalEl.className = "modal";
    bidModalEl.id = "bidModal";
    bidModalEl.innerHTML = `
      <div class="modal-overlay" id="bidOverlay"></div>
      <div class="modal-content bid-modal">
        <button class="modal-close" id="bidClose">✕</button>
        <h2 id="bidTitle"></h2>
        <p id="bidCurrent"></p>
        <div class="bid-input-row">
          <input type="number" id="bidInput" class="bid-input" min="1" placeholder="Coins" />
        </div>
        <button class="btn btn-primary" id="bidConfirm" style="width:100%">Place Bid</button>
      </div>
    `;
    document.body.appendChild(bidModalEl);
    document.getElementById("bidClose").addEventListener("click", () => bidModalEl.classList.add("hidden"));
    document.getElementById("bidOverlay").addEventListener("click", () => bidModalEl.classList.add("hidden"));
    document.getElementById("bidConfirm").addEventListener("click", confirmBid);
  }
  document.getElementById("bidTitle").textContent = auction.name;
  document.getElementById("bidCurrent").textContent = `Current bid: 🌟 ${auction.currentBid} Star Coins`;
  document.getElementById("bidInput").value = auction.currentBid + 1;
  bidModalEl.classList.remove("hidden");
}

function confirmBid() {
  const auction = state.pendingAuction;
  if (!auction) return;
  const amount = parseInt(document.getElementById("bidInput").value, 10);
  if (!amount || amount <= auction.currentBid) {
    toast("Bid must be higher than the current bid.");
    return;
  }
  const ok = spendCoins(amount, `Bid on "${auction.name}"`);
  if (!ok) { toast("Not enough Star Coins!"); return; }
  auction.currentBid = amount;
  bidModalEl.classList.add("hidden");
  renderAuctionsGrid();
  toast(`Bid placed: 🌟 ${amount} coins on "${auction.name}"`);
  state.pendingAuction = null;
}

// ─── Cosmo AI ─────────────────────────────────────────────────────────────────

document.getElementById("cosmoBtn").addEventListener("click", openCosmo);

function openCosmo() {
  const chat = document.getElementById("cosmoChat");
  if (!chat.children.length) {
    addCosmoMessage("Hi! I'm Cosmo 🤖 — your StarQuest AI companion. Ask me about content, Star Coins, coupons, or what to watch next!");
  }
  openModal("cosmoModal");
}

function addCosmoMessage(text) {
  const chat = document.getElementById("cosmoChat");
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble cosmo";
  bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

function addUserMessage(text) {
  const chat = document.getElementById("cosmoChat");
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble user";
  bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

function getCosmoResponse(userText) {
  const lower = userText.toLowerCase();
  if (lower.includes("unlock") || lower.includes("locked") || lower.includes("coin")) {
    return pick(COSMO_RESPONSES.unlock);
  }
  if (lower.includes("auction") || lower.includes("bid") || lower.includes("collect")) {
    return pick(COSMO_RESPONSES.auction);
  }
  if (lower.includes("coupon") || lower.includes("sponsor") || lower.includes("reward")) {
    return pick(COSMO_RESPONSES.coupon);
  }
  // Content-aware suggestions
  if (state.currentContent) {
    return `For "${state.currentContent.title}", I'd suggest sharing it to earn Star Coins. After 10 shares you earn a coin${state.currentContent.coupon ? ` with a "${state.currentContent.coupon.label}" coupon attached` : ""}!`;
  }
  return pick(COSMO_RESPONSES.default);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

document.getElementById("cosmoSend").addEventListener("click", sendCosmoMessage);
document.getElementById("cosmoInput").addEventListener("keydown", e => {
  if (e.key === "Enter") sendCosmoMessage();
});

function sendCosmoMessage() {
  const input = document.getElementById("cosmoInput");
  const text = input.value.trim();
  if (!text) return;
  addUserMessage(text);
  input.value = "";
  setTimeout(() => addCosmoMessage(getCosmoResponse(text)), 600);
}

// ─── Sponsor Ad ───────────────────────────────────────────────────────────────

let pendingSponsorClaim = null;

function showSponsorAd(couponLabel, sponsor, emoji) {
  const ad = SPONSOR_ADS.find(a => a.sponsor === sponsor) || SPONSOR_ADS[0];
  document.getElementById("sponsorLogo").textContent = emoji || ad.emoji;
  document.getElementById("sponsorTitle").textContent = ad.title;
  document.getElementById("sponsorMsg").textContent = ad.msg;
  document.getElementById("sponsorCoupon").textContent = couponLabel || ad.coupon;
  pendingSponsorClaim = { label: couponLabel || ad.coupon, sponsor };
  openModal("sponsorAd");
}

document.getElementById("sponsorClaim").addEventListener("click", () => {
  if (pendingSponsorClaim) {
    attachCoupon(pendingSponsorClaim.label, pendingSponsorClaim.sponsor);
    toast("Coupon claimed and added to your wallet!");
    pendingSponsorClaim = null;
  }
  closeModal("sponsorAd");
});

// ─── Modal Helpers ────────────────────────────────────────────────────────────

function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// Wire up close buttons and overlays
[
  ["playerClose", "playerOverlay", "playerModal"],
  ["walletClose", "walletOverlay", "walletModal"],
  ["cosmoClose", "cosmoOverlay", "cosmoModal"],
  ["sponsorClose", null, "sponsorAd"],
  ["roomClose", "roomOverlay", "roomModal"],
].forEach(([closeId, overlayId, modalId]) => {
  document.getElementById(closeId)?.addEventListener("click", () => closeModal(modalId));
  if (overlayId) {
    document.getElementById(overlayId)?.addEventListener("click", () => closeModal(modalId));
  }
});

// ─── Nav ─────────────────────────────────────────────────────────────────────

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

// ─── Init ─────────────────────────────────────────────────────────────────────

loadState();
updateCoinCount();
renderContentGrid();
renderRoomsGrid();
renderAuctionsGrid();
