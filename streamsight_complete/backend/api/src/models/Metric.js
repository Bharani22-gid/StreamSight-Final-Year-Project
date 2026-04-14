// const mongoose = require("mongoose");
// const MetricSchema = new mongoose.Schema({
//   window_start: { type: Date, index: true },
//   batch_id: Number,
//   funnel: {
//     page_view: Number,
//     add_to_cart: Number,
//     checkout: Number,
//     purchase: Number
//   },
//   cvr: Number,
//   bounce_rate: Number,
//   session_count: Number,
//   active_users: Number,
//   event_breakdown: Object,
//   written_at: Date
// });
// module.exports = mongoose.model("Metric", MetricSchema, "aggregated_metrics");

const mongoose = require("mongoose");

const MetricSchema = new mongoose.Schema({
  window_start: { type: Date, index: true },   // ✅ Date — NOT String
  written_at:   { type: Date },                // ✅ Date — NOT String
  batch_id:     { type: Number },
  funnel: {
    page_view:    Number,
    add_to_cart:  Number,
    checkout:     Number,
    purchase:     Number,
  },
  cvr:           Number,
  bounce_rate:   Number,
  session_count: Number,
  active_users:  Number,
  event_breakdown: {
    page_view:     Number,
    add_to_cart:   Number,
    checkout:      Number,
    purchase:      Number,
    search:        Number,
    product_click: Number,
  },
}, { timestamps: false });

module.exports = mongoose.models.Metric ||
  mongoose.model("Metric", MetricSchema, "aggregated_metrics");
