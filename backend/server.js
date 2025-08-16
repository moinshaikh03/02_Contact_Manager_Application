const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://moinsk0306:smMGYDcOikpbfE16@cluster0.q7emc0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("❌ MongoDB connection error:",err));

app.get("/", (req, res) => {
  res.send("Hello from Contact Manager Backend!");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contacts", contactRoutes);
