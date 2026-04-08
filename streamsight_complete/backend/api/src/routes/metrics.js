// const express = require("express");
// const router = express.Router();
// const Metric = require("../models/Metric");

// router.get("/", async (req, res) => {
//   try {
//     const latest = await Metric.findOne().sort({ window_start: -1 }).lean();
//     res.json(latest || {});
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get("/history", async (req, res) => {
//   try {
//     const range = req.query.range || "1h";
//     const hours = range === "24h" ? 24 : range === "6h" ? 6 : 1;
//     const since = new Date(Date.now() - hours * 60 * 60 * 1000);
//     const history = await Metric.find({ window_start: { $gte: since } })
//       .sort({ window_start: 1 })
//       .limit(200)
//       .lean();
//     res.json(history);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


// backend/api/src/routes/metrics.js — FIXED
const express = require("express");
const router  = express.Router();
const Metric  = require("../models/Metric");

// GET /api/metrics — latest single metric doc
router.get("/", async (req, res) => {
  try {
    const metric = await Metric.findOne().sort({ window_start: -1 }).lean();
    if (!metric) return res.json({});
    res.json(metric);
  } catch (err) {
    console.error("[metrics]", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/metrics/history?range=1h|6h|24h
router.get("/history", async (req, res) => {
  try {
    const range = req.query.range || "1h";

    // Range → milliseconds
    const MS = { "1h": 60*60*1000, "6h": 6*60*60*1000, "24h": 24*60*60*1000 };
    const windowMs = MS[range] || MS["1h"];
    const since = new Date(Date.now() - windowMs);

    // ── Attempt 1: filter by window_start (Datetime — what Spark writes) ──
    let docs = await Metric.find({ window_start: { $gte: since } })
      .sort({ window_start: 1 })
      .limit(500)
      .lean();

    // ── Attempt 2: filter by written_at fallback ──
    if (docs.length === 0) {
      docs = await Metric.find({ written_at: { $gte: since } })
        .sort({ written_at: 1 })
        .limit(500)
        .lean();
    }

    // ── Attempt 3: no date match at all — just return latest 50 so charts are never blank ──
    if (docs.length === 0) {
      console.warn(`[metrics/history] No docs in ${range} window — returning latest 50`);
      docs = await Metric.find({})
        .sort({ _id: -1 })
        .limit(50)
        .lean();
      docs.reverse(); // oldest → newest for charts
    }

    // Normalise window_start to ISO string so frontend always gets a parseable date
    docs = docs.map(d => ({
      ...d,
      window_start: d.window_start
        ? new Date(d.window_start).toISOString()
        : d.written_at
          ? new Date(d.written_at).toISOString()
          : new Date().toISOString(),
    }));

    // Disable 304 caching so browser always gets fresh data
    res.set("Cache-Control", "no-store");
    res.json(docs);
  } catch (err) {
    console.error("[metrics/history]", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
