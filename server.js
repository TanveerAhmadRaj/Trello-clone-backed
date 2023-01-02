const express = require("express");
const cors = require("cors");
// =============== initiating the instance of express ==========
const app = express();
const port = process.env.PORT || 5000;
//================ middlewares ================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//================ All Routers Paths =========================
const router = require("./routes/userRouter.js");
app.use("/users", router);
//================ testing ===================================
app.get("/", (req, res) => {
  res.json({ meaasage: "Hello Server" });
});

//================ listing ====================================
app.listen(port, () => console.log(`Server is running on ${port}`));
