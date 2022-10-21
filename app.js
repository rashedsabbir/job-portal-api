const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

// import routes
const userRoute = require("./routes/user.route");
const jobRoute = require("./routes/job.route");
const managerRoute = require("./routes/manager.route");
const adminRoute = require("./routes/admin.route");

// routes
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/jobs", jobRoute);
app.use("/manager", managerRoute);

app.get("/", (req, res) => {
  res.send("Routes started");
});

module.exports = app;