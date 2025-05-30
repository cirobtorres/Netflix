import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MercadoPagoConfig, Payment } from "mercadopago";

@Injectable()
export class PaymentsService {
  constructor(private readonly mp: ConfigService) {}

  async createPayment(body) {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_TEST_ACCESS_TOKEN ?? "NO-KEY",
      options: { timeout: 5000 },
    });

    const payment = new Payment(client);

    return await payment
      .create({ body })
      .then((res) => {
        console.log("SUCCESS: createPayment", res);
        return { res }; // Qualquer coisa que não seja undefined, pois o front espera receber um JSON
      })
      .catch((err) => {
        console.error("ERROR: createPayment", err);
        throw err;
      });
  }
}
