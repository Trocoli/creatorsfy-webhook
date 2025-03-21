import { Webhook, WebhookSender } from "./httpClient/webhookSender";
import { readJsonFile } from "./scripts/jsonReader";

let creatorsfyHost = `localhost`;
const creatorsfyPort = 8181;

if (creatorsfyPort != null)
  creatorsfyHost = `${creatorsfyHost}:${creatorsfyPort}`;

async function init() {
  const url = new URL(`/webhook/order`, `http://${creatorsfyHost}`);
  const orders = readJsonFile();

  let ordersCount = 0;
  while (ordersCount < orders.length) {
    const webhook = new Webhook(url, orders[ordersCount]);
    const webhookSender = new WebhookSender();

    try {
      const response = await webhookSender.sendWebhook(webhook);
      console.log(`Webhook sent: ${response.status}`);
      ordersCount++;
    } catch (error) {
      console.error(`Error sending webhook: ${error}`);
    }
  }
}

init();
