// /**
//  * seed.js — Seeds MongoDB with demo users + analytics data
//  * Works with BOTH local MongoDB and MongoDB Atlas
//  * Usage: node seed.js
//  */
// const { MongoClient } = require("mongodb");
// const bcrypt = require("bcryptjs");
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/streamsight";
// const DB_NAME = "streamsight";
// const isAtlas = MONGO_URI.includes("mongodb.net");

// function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
// function randFloat(min, max) { return parseFloat((Math.random() * (max - min) + min).toFixed(2)); }
// function timeAgo(min) { return new Date(Date.now() - min * 60 * 1000); }

// const EVENT_TYPES = ["page_view", "add_to_cart", "checkout", "purchase", "search", "product_click"];
// const DEVICES = ["mobile", "desktop", "tablet"];
// const COUNTRIES = ["IN", "US", "UK", "SG", "DE"];
// const CATEGORIES = ["Electronics", "Fashion", "Books", "Home", "Sports"];
// const PAGES = ["/home", "/product/101", "/cart", "/checkout", "/confirmation"];
// const SEVERITIES = ["low", "medium", "high"];

// async function seed() {
//   const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 15000 });
//   await client.connect();
//   console.log(`✅ Connected to MongoDB ${isAtlas ? "(Atlas ☁️)" : "(Local 🏠)"}`);
//   const db = client.db(DB_NAME);

//   // USERS
//   await db.collection("users").deleteMany({});
//   const users = [
//     { name: "Admin User", email: "admin@streamsight.ai", password: await bcrypt.hash("admin123", 12), role: "admin", createdAt: new Date() },
//     { name: "Data Analyst", email: "analyst@streamsight.ai", password: await bcrypt.hash("analyst123", 12), role: "analyst", createdAt: new Date() },
//     { name: "Viewer User", email: "viewer@streamsight.ai", password: await bcrypt.hash("viewer123", 12), role: "viewer", createdAt: new Date() },
//     { name: "Ramji",   email: "ramji@shop.com",          password: "ramji123",    role: "customer",createdAt: new Date() },
//     { name: "Bharani",  email: "bharani@shop.com",          password: "bharani123",    role: "customer",createdAt: new Date() },
//     { name: "Mani",   email: "mani@shop.com",          password: "mani123",    role: "customer",createdAt: new Date() },
//     { name: "SriMani",   email: "srimani@shop.com",          password: "srimani123",    role: "customer",createdAt: new Date() },
//     { name: "Arjun Kumar",   email: "arjun@shop.com",   password: "arjun123",   role: "customer" },
//   { name: "Priya Sharma",  email: "priya@shop.com",   password: "priya123",   role: "customer" },
//   { name: "Rahul Mehta",   email: "rahul@shop.com",   password: "rahul123",   role: "customer" },
//   { name: "Sneha Patel",   email: "sneha@shop.com",   password: "sneha123",   role: "customer" },
//   { name: "Vikram Singh",  email: "vikram@shop.com",  password: "vikram123",  role: "customer" },
//   ];
//   await db.collection("users").insertMany(users);
//   try { await db.collection("users").createIndex({ email: 1 }, { unique: true }); } catch(e) {}
//   console.log("✅ Users seeded");

//   // RAW EVENTS
//   await db.collection("raw_events").deleteMany({});
//   const rawEvents = Array.from({ length: 200 }, () => ({
//     event_id: uuidv4(), user_id: `user_${Math.floor(Math.random()*900)+100}`,
//     session_id: `sess_${Math.random().toString(36).substr(2,8)}`,
//     event_type: rand(EVENT_TYPES), page: rand(PAGES),
//     product_id: `prod_${Math.floor(Math.random()*900)+100}`,
//     category: rand(CATEGORIES), price: randFloat(10, 999),
//     timestamp: timeAgo(Math.floor(Math.random()*60)),
//     device: rand(DEVICES), country: rand(COUNTRIES), is_anomalous: Math.random()<0.05,
//   }));
//   await db.collection("raw_events").insertMany(rawEvents);
//   try { await db.collection("raw_events").createIndex({ timestamp: 1 }, { expireAfterSeconds: 3600 }); } catch(e) {}
//   console.log("✅ 200 raw events seeded");

//   // METRICS
//   await db.collection("aggregated_metrics").deleteMany({});
//   const metrics = Array.from({ length: 50 }, (_, i) => {
//     const pv=Math.floor(Math.random()*80)+20, ac=Math.floor(pv*randFloat(0.3,0.6));
//     const co=Math.floor(ac*randFloat(0.4,0.7)), pu=Math.floor(co*randFloat(0.3,0.6));
//     const s=Math.floor(Math.random()*30)+10;
//     return { window_start: timeAgo(60-i*1.2), batch_id: i,
//       funnel:{page_view:pv,add_to_cart:ac,checkout:co,purchase:pu},
//       cvr:parseFloat(((pu/pv)*100).toFixed(2)), bounce_rate:parseFloat(randFloat(20,50).toFixed(2)),
//       session_count:s, active_users:Math.floor(s*randFloat(0.6,0.9)),
//       event_breakdown:{page_view:pv,add_to_cart:ac,checkout:co,purchase:pu,search:Math.floor(Math.random()*20),product_click:Math.floor(Math.random()*30)},
//       written_at:timeAgo(60-i*1.2)
//     };
//   });
//   await db.collection("aggregated_metrics").insertMany(metrics);
//   try { await db.collection("aggregated_metrics").createIndex({ window_start: 1 }); } catch(e) {}
//   console.log("✅ 50 metric batches seeded");

//   // ANOMALIES
//   await db.collection("anomalies").deleteMany({});
//   const reasons = ["Flash purchase burst — 7 purchases in 45 seconds","Price outlier — Rs.7999 far exceeds normal range","Bot-like behavior — 52 page views in 90 seconds","Checkout loop — /checkout visited 4 times","Simulated attack — anomaly score below threshold"];
//   const anomalies = Array.from({ length: 15 }, () => ({
//     user_id:`user_${Math.floor(Math.random()*900)+100}`,
//     session_id:`sess_${Math.random().toString(36).substr(2,8)}`,
//     event_type:rand(["purchase","checkout","page_view"]),
//     reason:rand(reasons), severity:rand(SEVERITIES),
//     timestamp:timeAgo(Math.floor(Math.random()*60)),
//     features:{price:randFloat(10,9999),event_type_code:Math.floor(Math.random()*6),anomaly_score:parseFloat((-Math.random()*0.3).toFixed(4))},
//   }));
//   await db.collection("anomalies").insertMany(anomalies);
//   try { await db.collection("anomalies").createIndex({ timestamp: -1, severity: 1 }); } catch(e) {}
//   console.log("✅ 15 anomalies seeded");

//   await client.close();
//   console.log(`
// ╔══════════════════════════════════════════╗
// ║   SEED COMPLETE ✅                        ║
// ║                                          ║
// ║  Login Credentials:                      ║
// ║  admin@streamsight.ai    / admin123      ║
// ║  analyst@streamsight.ai  / analyst123    ║
// ║  viewer@streamsight.ai   / viewer123 
//     bharani@shop.com      /bharani123
// ║
// ╚══════════════════════════════════════════╝`);
// }

// seed().catch(err => { console.error("❌ Seed failed:", err.message); process.exit(1); });
/**
//  * seed.js — Seeds MongoDB with demo users + analytics data
//  * Works with BOTH local MongoDB and MongoDB Atlas
//  * Usage: node seed.js
//  */
// const { MongoClient } = require("mongodb");
// const bcrypt = require("bcryptjs");
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/streamsight";
// const DB_NAME   = "streamsight";
// const isAtlas   = MONGO_URI.includes("mongodb.net");

// function rand(arr)         { return arr[Math.floor(Math.random() * arr.length)]; }
// function randFloat(min,max){ return parseFloat((Math.random()*(max-min)+min).toFixed(2)); }
// function timeAgo(min)      { return new Date(Date.now() - min * 60 * 1000); }

// const EVENT_TYPES = ["page_view","add_to_cart","checkout","purchase","search","product_click"];
// const DEVICES     = ["mobile","desktop","tablet"];
// const COUNTRIES   = ["IN","US","UK","SG","DE"];
// const CATEGORIES  = ["Electronics","Fashion","Books","Home","Sports"];
// const PAGES       = ["/home","/product/101","/cart","/checkout","/confirmation"];
// const SEVERITIES  = ["low","medium","high"];

// async function seed() {
//   const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 15000 });
//   await client.connect();
//   console.log(`✅ Connected to MongoDB ${isAtlas ? "(Atlas ☁️)" : "(Local 🏠)"}`);
//   const db = client.db(DB_NAME);

//   // ── USERS ─────────────────────────────────────────────────────
//   await db.collection("users").deleteMany({});

//   // ✅ ALL passwords must go through bcrypt.hash — plain strings break login
//   const SALT = 12;
//   const users = [
//     // Staff
//     { name:"Admin User",    email:"admin@streamsight.ai",   password: await bcrypt.hash("admin123",    SALT), role:"admin",    createdAt:new Date() },
//     { name:"Data Analyst",  email:"analyst@streamsight.ai", password: await bcrypt.hash("analyst123",  SALT), role:"analyst",  createdAt:new Date() },
//     { name:"Viewer User",   email:"viewer@streamsight.ai",  password: await bcrypt.hash("viewer123",   SALT), role:"viewer",   createdAt:new Date() },

//     // ✅ Customers — hashed exactly the same way
//     { name:"Ramji",         email:"ramji@shop.com",         password: await bcrypt.hash("ramji123",    SALT), role:"customer", createdAt:new Date() },
//     { name:"Bharani",       email:"bharani@shop.com",       password: await bcrypt.hash("bharani123",  SALT), role:"customer", createdAt:new Date() },
//     { name:"Mani",          email:"mani@shop.com",          password: await bcrypt.hash("mani123",     SALT), role:"customer", createdAt:new Date() },
//     { name:"SriMani",       email:"srimani@shop.com",       password: await bcrypt.hash("srimani123",  SALT), role:"customer", createdAt:new Date() },
//     { name:"Arjun Kumar",   email:"arjun@shop.com",         password: await bcrypt.hash("arjun123",    SALT), role:"customer", createdAt:new Date() },
//     { name:"Priya Sharma",  email:"priya@shop.com",         password: await bcrypt.hash("priya123",    SALT), role:"customer", createdAt:new Date() },
//     { name:"Rahul Mehta",   email:"rahul@shop.com",         password: await bcrypt.hash("rahul123",    SALT), role:"customer", createdAt:new Date() },
//     { name:"Sneha Patel",   email:"sneha@shop.com",         password: await bcrypt.hash("sneha123",    SALT), role:"customer", createdAt:new Date() },
//     { name:"Vikram Singh",  email:"vikram@shop.com",        password: await bcrypt.hash("vikram123",   SALT), role:"customer", createdAt:new Date() },
//   ];

//   await db.collection("users").insertMany(users);
//   try { await db.collection("users").createIndex({ email:1 }, { unique:true }); } catch(e) {}
//   console.log(`✅ ${users.length} users seeded (all passwords bcrypt hashed)`);

//   // ── RAW EVENTS ────────────────────────────────────────────────
//   await db.collection("raw_events").deleteMany({});
//   const rawEvents = Array.from({ length: 200 }, () => ({
//     event_id:   uuidv4(),
//     user_id:    `user_${Math.floor(Math.random()*900)+100}`,
//     session_id: `sess_${Math.random().toString(36).substr(2,8)}`,
//     event_type: rand(EVENT_TYPES),
//     page:       rand(PAGES),
//     product_id: `prod_${Math.floor(Math.random()*900)+100}`,
//     category:   rand(CATEGORIES),
//     price:      randFloat(10, 999),
//     timestamp:  timeAgo(Math.floor(Math.random()*60)),
//     device:     rand(DEVICES),
//     country:    rand(COUNTRIES),
//     is_anomalous: Math.random() < 0.05,
//   }));
//   await db.collection("raw_events").insertMany(rawEvents);
//   try { await db.collection("raw_events").createIndex({ timestamp:1 }, { expireAfterSeconds:3600 }); } catch(e) {}
//   console.log("✅ 200 raw events seeded");

//   // ── METRICS ───────────────────────────────────────────────────
//   await db.collection("aggregated_metrics").deleteMany({});
//   const metrics = Array.from({ length: 50 }, (_, i) => {
//     const pv=Math.floor(Math.random()*80)+20, ac=Math.floor(pv*randFloat(0.3,0.6));
//     const co=Math.floor(ac*randFloat(0.4,0.7)), pu=Math.floor(co*randFloat(0.3,0.6));
//     const s=Math.floor(Math.random()*30)+10;
//     return {
//       window_start: timeAgo(60-i*1.2),
//       batch_id:     i,
//       funnel:       { page_view:pv, add_to_cart:ac, checkout:co, purchase:pu },
//       cvr:          parseFloat(((pu/pv)*100).toFixed(2)),
//       bounce_rate:  parseFloat(randFloat(20,50).toFixed(2)),
//       session_count: s,
//       active_users: Math.floor(s*randFloat(0.6,0.9)),
//       event_breakdown: { page_view:pv, add_to_cart:ac, checkout:co, purchase:pu, search:Math.floor(Math.random()*20), product_click:Math.floor(Math.random()*30) },
//       written_at: timeAgo(60-i*1.2),
//     };
//   });
//   await db.collection("aggregated_metrics").insertMany(metrics);
//   try { await db.collection("aggregated_metrics").createIndex({ window_start:1 }); } catch(e) {}
//   console.log("✅ 50 metric batches seeded");

//   // ── ANOMALIES ─────────────────────────────────────────────────
//   await db.collection("anomalies").deleteMany({});
//   const reasons = [
//     "Flash purchase burst — 7 purchases in 45 seconds",
//     "Price outlier — Rs.7999 far exceeds normal range",
//     "Bot-like behavior — 52 page views in 90 seconds",
//     "Checkout loop — /checkout visited 4 times",
//     "Simulated attack — anomaly score below threshold",
//   ];
//   const anomalies = Array.from({ length: 15 }, () => ({
//     user_id:    `user_${Math.floor(Math.random()*900)+100}`,
//     session_id: `sess_${Math.random().toString(36).substr(2,8)}`,
//     event_type: rand(["purchase","checkout","page_view"]),
//     reason:     rand(reasons),
//     severity:   rand(SEVERITIES),
//     timestamp:  timeAgo(Math.floor(Math.random()*60)),
//     features:   { price:randFloat(10,9999), event_type_code:Math.floor(Math.random()*6), anomaly_score:parseFloat((-Math.random()*0.3).toFixed(4)) },
//   }));
//   await db.collection("anomalies").insertMany(anomalies);
//   try { await db.collection("anomalies").createIndex({ timestamp:-1, severity:1 }); } catch(e) {}
//   console.log("✅ 15 anomalies seeded");

//   await client.close();

//   console.log(`
// ╔══════════════════════════════════════════════════╗
// ║   SEED COMPLETE ✅                                ║
// ║                                                  ║
// ║  STAFF LOGINS:                                   ║
// ║  admin@streamsight.ai    / admin123              ║
// ║  analyst@streamsight.ai  / analyst123            ║
// ║  viewer@streamsight.ai   / viewer123             ║
// ║                                                  ║
// ║  CUSTOMER LOGINS:                                ║
// ║  ramji@shop.com          / ramji123              ║
// ║  bharani@shop.com        / bharani123            ║
// ║  mani@shop.com           / mani123               ║
// ║  srimani@shop.com        / srimani123            ║
// ║  arjun@shop.com          / arjun123              ║
// ║  priya@shop.com          / priya123              ║
// ║  rahul@shop.com          / rahul123              ║
// ╚══════════════════════════════════════════════════╝`);
// }

// seed().catch(err => { console.error("❌ Seed failed:", err.message); process.exit(1); });



/**
 * seed.js — Seeds MongoDB with demo users + analytics data
 * Usage: node seed.js
 */
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/streamsight";
const DB_NAME   = "streamsight";

function rand(arr)          { return arr[Math.floor(Math.random() * arr.length)]; }
function randFloat(min,max) { return parseFloat((Math.random()*(max-min)+min).toFixed(2)); }
function timeAgo(min)       { return new Date(Date.now() - min * 60 * 1000); }

const EVENT_TYPES = ["page_view","add_to_cart","checkout","purchase","search","product_click"];
const DEVICES     = ["mobile","desktop","tablet"];
const COUNTRIES   = ["IN","US","UK","SG","DE"];
const CATEGORIES  = ["Electronics","Fashion","Books","Home","Sports"];
const PAGES       = ["/home","/product/101","/cart","/checkout","/confirmation"];
const SEVERITIES  = ["low","medium","high"];

async function seed() {
  const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 15000 });
  
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
      { name: "Admin User",    email: "admin@streamsight.ai",   pass: "admin123",    role: "admin" },
      { name: "Data Analyst",  email: "analyst@streamsight.ai", pass: "analyst123",  role: "analyst" },
      { name: "Viewer User",   email: "viewer@streamsight.ai",  pass: "viewer123",   role: "viewer" },
      { name: "Ramji",         email: "ramji@shop.com",         pass: "ramji123",    role: "customer" },
      { name: "Bharani",       email: "bharani@shop.com",       pass: "bharani123",  role: "customer" },
      { name: "Mani",          email: "mani@shop.com",          pass: "mani123",     role: "customer" },
      { name: "SriMani",       email: "srimani@shop.com",       pass: "srimani123",  role: "customer" },
      { name: "Arjun Kumar",   email: "arjun@shop.com",         pass: "arjun123",    role: "customer" },
      { name: "Priya Sharma",  email: "priya@shop.com",         pass: "priya123",    role: "customer" }
    ];

    console.log("⏳ Hashing passwords...");
    const hashedUsers = await Promise.all(rawUsers.map(async (u) => ({
      name: u.name,
      email: u.email.toLowerCase(), // Store lowercase for easier login
      password: await bcrypt.hash(u.pass, SALT_ROUNDS),
      role: u.role,
      createdAt: new Date()
    })));

    await db.collection("users").insertMany(hashedUsers);
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    console.log(`✅ ${hashedUsers.length} users created with secure hashes.`);

    // 3. SEED RAW EVENTS (200 records)
    const rawEvents = Array.from({ length: 200 }, () => ({
      event_id: uuidv4(),
      user_id: `user_${Math.floor(Math.random()*900)+100}`,
      session_id: `sess_${Math.random().toString(36).substr(2,8)}`,
      event_type: rand(EVENT_TYPES),
      page: rand(PAGES),
      price: randFloat(10, 999),
      timestamp: timeAgo(Math.floor(Math.random()*60)),
      device: rand(DEVICES),
      country: rand(COUNTRIES)
    }));
    await db.collection("raw_events").insertMany(rawEvents);
    console.log("✅ 200 raw events seeded.");

    // 4. SEED ANOMALIES (15 records)
    const anomalies = Array.from({ length: 15 }, () => ({
      user_id: `user_${Math.floor(Math.random()*900)+100}`,
      reason: "Unusual behavior detected",
      severity: rand(SEVERITIES),
      timestamp: new Date()
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