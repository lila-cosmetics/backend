import dotenv from "dotenv";
dotenv.config();

//Internal imports
import connectToMongoDB from "./config/database.js";
import app from "./app.js";
import userRouter from "./routes/userRoutes.js";

//Define the port variable
const PORT = process.env.PORT || 3000;

//Registering Routes
app.use("/api/users", userRouter);

//Server is listening on the specified port
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
