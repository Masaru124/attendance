const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = 1516;

app.use(cors());

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
