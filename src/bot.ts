import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { supabase } from "./supabase";
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "", {
  polling: true,
});

const webAppUrl = process.env.WEB_APP_URL;

bot.on("message", async (msg) => {
  console.log({ msg });
  if (msg.text === "/start") {
    const { from } = msg;
    if (from) {
      const { id: telegram_id, username } = from;
      await supabase
        .from("auth.users")
        .upsert({ telegram_id, username, coin_balance: 0 })
        .single();
    }
  }
});

bot.onText(/\/start/, (msg) => {
  console.log({ msg });
  const chatId = msg.chat.id;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Launch TapMe",
            web_app: { url: webAppUrl || "" },
          },
        ],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    "Welcome to TapMe! Click below to start playing.",
    options
  );
});
