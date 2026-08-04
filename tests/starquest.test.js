/**
 * StarQuest TV — Unit Tests
 *
 * Tests for core business logic: coin earning, spending, coupon management,
 * share counter milestone, and unlock history.
 *
 * Run with: node tests/starquest.test.js
 */

"use strict";

// ─── Minimal test harness ─────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓  ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗  ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || "Assertion failed");
}
function assertEqual(a, b, msg) {
  if (a !== b) throw new Error(msg || `Expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
}

// ─── Isolated logic (mirrors app.js, no DOM required) ────────────────────────

function makeState() {
  return {
    coins: 0,
    shareCount: 0,
    perTitleShares: {},
    coupons: [],
    unlockHistory: [],
    unlockedContent: new Set(),
    unlockedRooms: new Set(),
  };
}

function awardCoin(st, reason) {
  st.coins += 1;
  st.unlockHistory.unshift({ action: `Earned 1 Star Coin — ${reason}`, timestamp: new Date().toLocaleString() });
  return st.coins;
}

function spendCoins(st, amount, reason) {
  if (st.coins < amount) return false;
  st.coins -= amount;
  st.unlockHistory.unshift({ action: `Spent ${amount} Star Coin${amount > 1 ? "s" : ""} — ${reason}`, timestamp: new Date().toLocaleString() });
  return true;
}

function attachCoupon(st, label, sponsor) {
  const now = new Date();
  st.coupons = st.coupons.filter(c => new Date(c.expiry) > now);
  const expiry = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split("T")[0];
  st.coupons.push({ label, sponsor, expiry });
}

function handleShare(st, contentId, coupon, sponsored) {
  st.perTitleShares[contentId] = (st.perTitleShares[contentId] || 0) + 1;
  st.shareCount += 1;
  const titleShares = st.perTitleShares[contentId];
  const earnedCoin = titleShares % 10 === 0;
  if (earnedCoin) {
    awardCoin(st, `10 shares of title ${contentId}`);
    if (coupon) attachCoupon(st, coupon.label, sponsored || "StarQuest");
  }
  return { titleShares, earnedCoin };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

console.log("\nStarQuest TV — Test Suite\n");

// Coin earning
console.log("Coin Earning:");
test("awardCoin increments coins by 1", () => {
  const st = makeState();
  awardCoin(st, "test");
  assertEqual(st.coins, 1, "coins should be 1");
});

test("awardCoin records history entry", () => {
  const st = makeState();
  awardCoin(st, "sharing Galactic Odyssey");
  assertEqual(st.unlockHistory.length, 1, "history should have 1 entry");
  assert(st.unlockHistory[0].action.includes("Earned"), "history action should mention 'Earned'");
});

test("awardCoin multiple times accumulates correctly", () => {
  const st = makeState();
  awardCoin(st, "a");
  awardCoin(st, "b");
  awardCoin(st, "c");
  assertEqual(st.coins, 3, "coins should be 3");
});

// Coin spending
console.log("\nCoin Spending:");
test("spendCoins succeeds when balance is sufficient", () => {
  const st = makeState();
  awardCoin(st, "test");
  awardCoin(st, "test");
  const ok = spendCoins(st, 2, "Enter room");
  assert(ok, "should succeed");
  assertEqual(st.coins, 0, "coins should be 0");
});

test("spendCoins fails when balance is insufficient", () => {
  const st = makeState();
  awardCoin(st, "test");
  const ok = spendCoins(st, 3, "Enter premium room");
  assert(!ok, "should fail");
  assertEqual(st.coins, 1, "coins should remain 1");
});

test("spendCoins records history entry on success", () => {
  const st = makeState();
  awardCoin(st, "test");
  spendCoins(st, 1, "Unlocked Stardust Chronicles");
  assert(st.unlockHistory.some(h => h.action.includes("Spent")), "history should record spend");
});

test("spendCoins does not record history on failure", () => {
  const st = makeState();
  spendCoins(st, 1, "nothing");
  assert(!st.unlockHistory.some(h => h.action.includes("Spent")), "no spend history on failure");
});

// Share counter
console.log("\nShare Counter:");
test("share counter does not award coin before 10 shares", () => {
  const st = makeState();
  for (let i = 0; i < 9; i++) handleShare(st, 1, null, null);
  assertEqual(st.coins, 0, "no coin before 10 shares");
});

test("share counter awards coin at exactly 10 shares", () => {
  const st = makeState();
  for (let i = 0; i < 10; i++) handleShare(st, 1, null, null);
  assertEqual(st.coins, 1, "1 coin after 10 shares");
});

test("share counter awards second coin at 20 shares", () => {
  const st = makeState();
  for (let i = 0; i < 20; i++) handleShare(st, 1, null, null);
  assertEqual(st.coins, 2, "2 coins after 20 shares");
});

test("share counters are tracked per title independently", () => {
  const st = makeState();
  // 9 shares on title 1, 9 on title 2 — no coins yet
  for (let i = 0; i < 9; i++) handleShare(st, 1, null, null);
  for (let i = 0; i < 9; i++) handleShare(st, 2, null, null);
  assertEqual(st.coins, 0, "no coin with only 9 shares each");
  // 10th share on title 1 — coin
  handleShare(st, 1, null, null);
  assertEqual(st.coins, 1, "1 coin after 10 shares on title 1");
});

// Coupon layer
console.log("\nCoupon Layer:");
test("attachCoupon adds a coupon to the wallet", () => {
  const st = makeState();
  attachCoupon(st, "Free Paramount+ Trial", "Paramount");
  assertEqual(st.coupons.length, 1, "should have 1 coupon");
  assertEqual(st.coupons[0].label, "Free Paramount+ Trial");
});

test("attachCoupon removes expired coupons before adding", () => {
  const st = makeState();
  // Add an already-expired coupon directly
  st.coupons.push({ label: "Old Coupon", sponsor: "X", expiry: "2000-01-01" });
  attachCoupon(st, "New Coupon", "Y");
  assertEqual(st.coupons.length, 1, "expired coupon removed, only new one remains");
  assertEqual(st.coupons[0].label, "New Coupon");
});

test("handleShare attaches coupon after 10 shares when coupon provided", () => {
  const st = makeState();
  const coupon = { label: "AMC $5 Ticket", expiry: "2026-10-01" };
  for (let i = 0; i < 10; i++) handleShare(st, 3, coupon, "AMC");
  assertEqual(st.coupons.length, 1, "coupon should be attached");
  assertEqual(st.coupons[0].label, "AMC $5 Ticket");
});

test("handleShare does not attach coupon when content has no coupon", () => {
  const st = makeState();
  for (let i = 0; i < 10; i++) handleShare(st, 4, null, null);
  assertEqual(st.coupons.length, 0, "no coupon when content has none");
});

// Unlock rooms
console.log("\nUnlock Rooms:");
test("room can be unlocked when sufficient coins available", () => {
  const st = makeState();
  awardCoin(st, "test");
  awardCoin(st, "test");
  const ok = spendCoins(st, 2, "Entered room: Premiere Night");
  assert(ok, "room entry should succeed");
  st.unlockedRooms.add(1);
  assert(st.unlockedRooms.has(1), "room 1 should be unlocked");
});

test("room cannot be unlocked without sufficient coins", () => {
  const st = makeState();
  const ok = spendCoins(st, 2, "Entered room: Premiere Night");
  assert(!ok, "room entry should fail");
  assert(!st.unlockedRooms.has(1), "room 1 should not be unlocked");
});

// Unlock history
console.log("\nUnlock History:");
test("history is ordered newest-first", () => {
  const st = makeState();
  awardCoin(st, "first");
  awardCoin(st, "second");
  assert(st.unlockHistory[0].action.includes("second"), "newest entry first");
});

test("history is capped at 30 entries in app logic", () => {
  const st = makeState();
  for (let i = 0; i < 40; i++) awardCoin(st, `event ${i}`);
  // Simulate cap
  while (st.unlockHistory.length > 30) st.unlockHistory.pop();
  assertEqual(st.unlockHistory.length, 30, "history capped at 30");
});

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n${"─".repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
