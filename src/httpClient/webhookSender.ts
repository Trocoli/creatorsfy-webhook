export class Webhook<T> {
  constructor(readonly url: URL, readonly body: T) {}
}

export class WebhookSender<T> {
  async sendWebhook(webhook: Webhook<T>): Promise<Response> {
    const result = await fetch(webhook.url.toString(), {
      method: "POST",
      body: JSON.stringify(webhook.body),
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("result", result)

    return result
  }
}

