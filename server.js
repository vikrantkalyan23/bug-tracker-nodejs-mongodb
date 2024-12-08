const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "views");

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/bugtracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define Routes
const bugRoutes = require("./routes/bugRoutes");
app.use("/api/bugs", bugRoutes);



const cron = require("node-cron");
const Bug = require("./models/Bug");

cron.schedule("0 0 * * *", async () => {
  const bugs = await Bug.find();
  const now = new Date();

  bugs.forEach(async (bug) => {
    const diff = (now - bug.date) / (1000 * 60 * 60 * 24);
    if (diff > 3 && bug.status === "Open") {
      console.log(`Bug "${bug.title}" is overdue.`);
    }
  });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
