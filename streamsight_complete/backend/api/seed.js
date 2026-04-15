const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/streamsight";
const DB_NAME = "streamsight";

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}
function timeAgo(min) {
  return new Date(Date.now() - min * 60 * 1000);
}

const EVENT_TYPES = [
  "page_view",
  "add_to_cart",
  "checkout",
  "purchase",
  "search",
  "product_click",
];
const DEVICES = ["mobile", "desktop", "tablet"];
const COUNTRIES = ["IN", "US", "UK", "SG", "DE"];
const CATEGORIES = ["Electronics", "Fashion", "Books", "Home", "Sports"];
const PAGES = ["/home", "/product/101", "/cart", "/checkout", "/confirmation"];
const SEVERITIES = ["low", "medium", "high"];

async function seed() {
  const client = new MongoClient(MONGO_URI, {
    serverSelectionTimeoutMS: 15000,
  });

  try {
    await client.connect();
    console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
    const db = client.db(DB_NAME);

    // 1. CLEANUP
    await db.collection("users").deleteMany({});
    await db.collection("raw_events").deleteMany({});
    await db.collection("aggregated_metrics").deleteMany({});
    await db.collection("anomalies").deleteMany({});

    // 2. SEED USERS (Hashing every password)
    const SALT_ROUNDS = 12;
    const rawUsers = [
      {
        name: "Admin User",
        email: "admin@streamsight.ai",
        pass: "admin123",
        role: "admin",
      },
      {
        name: "Data Analyst",
        email: "analyst@streamsight.ai",
        pass: "analyst123",
        role: "analyst",
      },
      {
        name: "Viewer User",
        email: "viewer@streamsight.ai",
        pass: "viewer123",
        role: "viewer",
      },
      {
        name: "Ramji",
        email: "ramji@shop.com",
        pass: "ramji123",
        role: "customer",
      },
      {
        name: "Bharani",
        email: "bharani@shop.com",
        pass: "bharani123",
        role: "customer",
      },
      {
        name: "Mani",
        email: "mani@shop.com",
        pass: "mani123",
        role: "customer",
      },
      {
        name: "SriMani",
        email: "srimani@shop.com",
        pass: "srimani123",
        role: "customer",
      },
      {
        name: "Arjun Kumar",
        email: "arjun@shop.com",
        pass: "arjun123",
        role: "customer",
      },
      {
        name: "Priya Sharma",
        email: "priya@shop.com",
        pass: "priya123",
        role: "customer",
      },
    ];

    console.log("⏳ Hashing passwords...");
    const hashedUsers = await Promise.all(
      rawUsers.map(async (u) => ({
        name: u.name,
        email: u.email.toLowerCase(), // Store lowercase for easier login
        password: await bcrypt.hash(u.pass, SALT_ROUNDS),
        role: u.role,
        createdAt: new Date(),
      })),
    );

    await db.collection("users").insertMany(hashedUsers);
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    console.log(`✅ ${hashedUsers.length} users created with secure hashes.`);

    // 3. SEED RAW EVENTS (200 records)
    const rawEvents = Array.from({ length: 200 }, () => ({
      event_id: uuidv4(),
      user_id: `user_${Math.floor(Math.random() * 900) + 100}`,
      session_id: `sess_${Math.random().toString(36).substr(2, 8)}`,
      event_type: rand(EVENT_TYPES),
      page: rand(PAGES),
      price: randFloat(10, 999),
      timestamp: timeAgo(Math.floor(Math.random() * 60)),
      device: rand(DEVICES),
      country: rand(COUNTRIES),
    }));
    await db.collection("raw_events").insertMany(rawEvents);
    console.log("✅ 200 raw events seeded.");

    // 4. SEED ANOMALIES (15 records)
    const anomalies = Array.from({ length: 15 }, () => ({
      user_id: `user_${Math.floor(Math.random() * 900) + 100}`,
      reason: "Unusual behavior detected",
      severity: rand(SEVERITIES),
      timestamp: new Date(),
    }));
    await db.collection("anomalies").insertMany(anomalies);
    console.log("✅ 15 anomalies seeded.");

    console.log(`
╔══════════════════════════════════════════════════╗
║             SEEDING COMPLETE ✅                  ║
╟──────────────────────────────────────────────────╢
║  All passwords have been hashed with Bcrypt.     ║
║  Try logging in with:                            ║
║  User: ramji@shop.com                            ║
║  Pass: ramji123                                  ║
╚══════════════════════════════════════════════════╝`);
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    await client.close();
  }
}

seed();
