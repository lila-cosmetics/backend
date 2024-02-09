import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());

//Initialising CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

export default app;
