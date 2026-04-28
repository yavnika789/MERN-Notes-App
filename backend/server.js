import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import "./config/db.js"; // connect to MongoDB

import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoute.js";
//import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(cors({origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); // this middleware will parse JSON bodies: req.body
//app.use(rateLimiter);
export const rateLimiter = (req, res, next) => {
  next();
};
//our simple custom middleware
//app.use((req, res, next) => {
// console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });
//
app.use("/api/notes", authRoutes);
app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.listen(PORT, () => {
  console.log("Server started on PORT:", PORT);
});
