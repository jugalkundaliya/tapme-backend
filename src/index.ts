import { createServer } from "node:http";
import "./bot";

import { createYoga } from "graphql-yoga";
import { userSchema } from "./Schema/UserSchema";

const yoga = createYoga({
  schema: userSchema,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
