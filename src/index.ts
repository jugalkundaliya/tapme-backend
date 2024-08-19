import cors from "cors";
import "./bot";

import express from "express";
import { createYoga } from "graphql-yoga";
import { userSchema } from "./Schema/UserSchema";

const app = express();

// Apply CORS middleware
app.use(
  cors({
    origin: "*",
  })
);

// Create Yoga server
const yoga = createYoga({
  schema: userSchema,
});

// Use Yoga as a middleware
app.use("/graphql", yoga);

// Start the server
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
