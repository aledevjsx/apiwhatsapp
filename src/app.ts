import {
  createBot,
  createFlow,
  createProvider,
  MemoryDB,
} from "@bot-whatsapp/bot";

import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";

const main = async () => {
  const provider = createProvider(BaileysProvider);
  provider.initHttpServer(3002);

  provider.http?.server.post(
    "/send-message",
    handleCtx(async (bot, req, res) => {
      const body = req.body;
      const number = body.number;
      const message = body.message;
      const mediaUrl = body.mediaUrl;
      console.log("Se ha enviado el mensaje con los siguientes datos: ", {
        number,
        message,
        mediaUrl,
      });
      await bot.sendMessage(number, message, {
        media: mediaUrl,
      });
      res.end("mensaje enviado");
    })
  );

  await createBot({
    flow: createFlow([]),
    database: new MemoryDB(),
    provider: provider,
  });
};

main();
