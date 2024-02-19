import dotenv from "dotenv";
dotenv.config();

//Internal imports
import connectToMongoDB from "./config/database.js";
import app from "./app.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

//Define the port variable
const PORT = process.env.PORT || 3001;

//Registering Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

//Server is listening on the specified port
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
