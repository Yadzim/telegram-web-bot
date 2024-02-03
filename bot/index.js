const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const PORT = process.env.PORT || 8000;

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

app.post("/web-data", async (req, res) => {
  const { queryId, products, totalPrice } = req.body;
  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Successful purchase",
      input_message_content: {
        message_text: `You purchased goods worth $ ${totalPrice}`,
      },
    });
    return res.status(200).json({});
  } catch (e) {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Failed to complete the purchase",
      input_message_content: {
        message_text: "Failed to complete the purchase",
      },
    });
    return res.status(500).json({});
  }
});

const start = () => {
  bot.setMyCommands([
    { command: "start", description: "Start bot" },
    { command: "form", description: "Create contact" },
    { command: "shop", description: "View shop" },
    { command: "my_order", description: "View my orders" },
    { command: "help", description: "Help for using bot" },
  ]);
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    console.log(
      msg?.from?.first_name,
      " / " + msg?.from?.id + " / " + msg?.from?.username + ":   " + msg?.text
    );
    const text = msg.text;
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "A button will appear below, please fill out the form",
        {
          reply_markup: {
            // keyboard: [
            //   [
            //     {
            //       text: "Fill the form",
            //       web_app: { url: webAppUrl + "/form" },
            //     },
            //   ],
            // ],
            inline_keyboard: [
              [{ text: "Make an order", web_app: { url: webAppUrl } }],
            ],
          },
        }
      );
    }
    if (text === "/shop") {
      await bot.sendMessage(chatId, "Click on the button to place an order", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Make an order", web_app: { url: webAppUrl } }],
          ],
        },
      });
    }

    if (msg?.web_app_data?.data) {
      try {
        const data = JSON.parse(msg?.web_app_data?.data);

        await bot.sendMessage(chatId, "Thank you for choosing us!");
        await bot.sendMessage(chatId, `Your name: ${data?.name}`);
        await bot.sendMessage(chatId, `Your phone: ${data?.phone}`);
        await bot.sendMessage(chatId, `Your address: ${data?.address}`);

        setTimeout(async () => {
          await bot.sendMessage(
            chatId,
            "You can get all the information in this chat"
          );
        }, 2000);
      } catch (e) {
        console.log(e.message);
      }
    }
  });

  app.listen(PORT, () => console.log("server was started"));

  console.log("bot was started");
};

start();
