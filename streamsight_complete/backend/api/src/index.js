const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const eventsRouter = require("./routes/events");
const metricsRouter = require("./routes/metrics");
const anomaliesRouter = require("./routes/anomalies");
const simulateRouter = require("./routes/simulate");
const { router: authRouter } = require("./routes/auth");
const { startChangeStreamEmitter } = require("./socket/emitter");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);
app.use("/api/metrics", metricsRouter);
app.use("/api/anomalies", anomaliesRouter);
app.use("/api/simulate-event", simulateRouter);
app.get("/health", (req, res) =>
  res.json({ status: "ok", time: new Date().toISOString() }),
);
const userActivityRoute = require("./routes/userActivity");
app.use("/api/user-activity", userActivityRoute);

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/streamsight";
const PORT = process.env.API_PORT || 4000;

async function connectWithRetry(retries = 5, delay = 3000) {
  const isAtlas = MONGO_URI.includes("mongodb.net");
  for (let i = 1; i <= retries; i++) {
    try {
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 15000,
        ...(isAtlas && { tls: true }),
      });
      console.log(
        `[MongoDB] Connected to ${isAtlas ? "Atlas ☁️" : "Local 🏠"}`,
      );
      return;
    } catch (err) {
      console.warn(`[MongoDB] Attempt ${i}/${retries} failed: ${err.message}`);
      if (i < retries) await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("MongoDB connection failed after all retries.");
}

io.on("connection", (socket) => {
  console.log(`[Socket.IO] Client connected: ${socket.id}`);
  socket.on("disconnect", () =>
    console.log(`[Socket.IO] Client disconnected: ${socket.id}`),
  );
});

connectWithRetry()
  .then(() => {
    startChangeStreamEmitter(io);
    server.listen(PORT, () => {
      console.log(`[API] StreamSight API running on http://localhost:${PORT}`);
      console.log(
        `[API] Auth endpoint: POST http://localhost:${PORT}/api/auth/login`,
      );
    });
  })
  .catch((err) => {
    console.error("[API] Fatal:", err.message);
    process.exit(1);
  });
