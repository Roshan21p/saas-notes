import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/dbConfig";
import { PORT } from "./config/serverConfig";

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (error) {
    console.error(
      "Failed to start server due to DB error: ",
      (error as Error).message
    ); // Type assertion
    process.exit(1);
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime()
  });
});

app.get("/connect-db", async (req, res) => {
  try {
    await connectDB();
    return res
      .status(200)
      .json({ message: "Connected to MongoDB successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Failed to connect to MongDB",
        error: (error as Error).message,
      });
  }
});
