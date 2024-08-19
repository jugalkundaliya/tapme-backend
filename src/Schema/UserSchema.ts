import { createSchema } from "graphql-yoga";
import { supabase } from "../supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface User {
  telegram_id: string;
  coin_balance: number;
  id?: number;
}

interface GetUserArgs {
  telegram_id: string;
}

interface IncrementCoinsArgs {
  telegram_id: string;
  amount: number;
}

const typeDefs = `
  type User {
    id: ID!
    telegram_id: String!
    coin_balance: Int!
  }

  type Query {
    getUser(telegram_id: String!): User
  }

  type Mutation {
    addUser(telegram_id: String!, username: String!): User
    incrementCoins(telegram_id: String!, amount: Int!): User
  }
`;

const resolvers = {
  Query: {
    getUser: async (
      _: unknown,
      { telegram_id }: GetUserArgs
    ): Promise<User | null> => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("telegram_id", telegram_id)
        .single();

      if (error?.details === "The result contains 0 rows") {
        const added: PostgrestSingleResponse<User> = await supabase
          .from("users")
          .insert([{ telegram_id, coin_balance: 0 }])
          .single();
        return added.data || null;
      }

      if (error) {
        throw new Error(error.message);
      }

      return data || null;
    },
  },
  Mutation: {
    incrementCoins: async (
      _: unknown,
      { telegram_id, amount }: IncrementCoinsArgs
    ): Promise<User | null> => {
      const { error } = await supabase
        .from("users")
        .select("*")
        .eq("telegram_id", telegram_id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      const { data: updatedData, error: updateError } = await supabase
        .from("users")
        .update({ coin_balance: amount })
        .eq("telegram_id", telegram_id)
        .single();

      if (updateError) {
        throw new Error(updateError.message);
      }

      return updatedData || null;
    },
  },
};
export const userSchema = createSchema({
  typeDefs,
  resolvers,
});
