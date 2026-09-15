import type { Request, Response } from "express";
import { logger } from "../../lib/logger.js";
import { prisma } from "../../lib/prisma.js";
import { createPaymentProvider } from "../../payments/index.js";

export async function thawaniWebhookHandler(req: Request, res: Response) {
  const provider = createPaymentProvider();
  const rawBody = req.body as Buffer;
  const headers = req.headers as Record<string, string>;

  if (!provider.verifyWebhookSignature(rawBody, headers)) {
    return res.status(400).json({ error: { code: "INVALID_SIGNATURE", message: "Invalid webhook signature" } });
  }

  const event = await provider.parseWebhookEvent(rawBody, headers);

  const payment = await prisma.payment.findFirst({ where: { providerReference: event.providerReference } });
  if (!payment) {
    logger.warn({ event }, "Webhook received for unknown payment reference");
    return res.status(200).json({ received: true });
  }

  const paymentStatus = event.status === "succeeded" ? "paid" : event.status === "failed" ? "failed" : "pending";

  await prisma.$transaction([
    prisma.payment.update({
      where: { id: payment.id },
      data: { status: paymentStatus, rawWebhookPayload: event.raw as never }
    }),
    prisma.order.update({ where: { id: event.orderId }, data: { paymentStatus } })
  ]);

  res.status(200).json({ received: true });
}
