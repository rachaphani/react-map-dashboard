const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const users = [{ username: "admin", password: bcrypt.hashSync("password", 8) }];

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.id;
    next();
  });
};

// Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Dashboard API
app.get("/api/dashboard", verifyToken, (req, res) => {
  res.json([{ id: 1, title: "Card 1" }, { id: 2, title: "Card 2" }]);
});

// Map API
app.get("/api/map", verifyToken, (req, res) => {
  res.json({ center: [20.5937, 78.9629], zoom: 5 });
});

// Start Server
app.listen(5000, "0.0.0.0", () => console.log("Server running on port 5000"));
