import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from "crypto";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { StatusMessage } from "utils/enums/StatusMessage";
import { returnMessage } from "utils/helpers/returnMessage";

@Injectable()
export class PaymentsService {
  constructor(private readonly mpConfig: ConfigService) {}

  async createCreditCardPayment(body) {
    const accessToken = this.mpConfig.get<string>("MP_TEST_ACCESS_TOKEN");
    if (!accessToken) throw new Error("MP_TEST_ACCESS_TOKEN is undefined");

    const client = new MercadoPagoConfig({
      accessToken,
      options: { timeout: 15000 },
    });

    const payment = new Payment(client);
    const orderId = body.orderId; // Para evitar duplicação de pagamento

    try {
      const res = await payment.create({
        body,
        requestOptions: {
          idempotencyKey: `order-${orderId}`,
        },
      });
      console.log("SUCCESS: createPayment", res);
      return { res };
    } catch (err) {
      console.error("ERROR: createPayment", err);
      throw err;
    }
  }

  async createPixPayment(body: {
    transaction_amount: number;
    description: string;
    email: string;
    first_name: string;
    last_name: string;
    identification: {
      type: string;
      number: string;
    };
    address: {
      zip_code: string;
      street_name: string;
      street_number: string;
      neighborhood: string;
      city: string;
      federal_unit: string;
    };
  }) {
    const accessToken = this.mpConfig.get<string>("MP_TEST_ACCESS_TOKEN");
    if (!accessToken) throw new Error("MP_TEST_ACCESS_TOKEN is undefined");

    const client = new MercadoPagoConfig({
      accessToken,
      options: { timeout: 5000 },
    });

    const payment = new Payment(client);

    try {
      const res = await payment.create({ body });

      return returnMessage({
        statusCode: 201,
        statusMessage: StatusMessage.CREATED,
        data: {
          id: res.id,
          status: res.status,
          qr_code_base64:
            res.point_of_interaction?.transaction_data?.qr_code_base64,
          qr_code: res.point_of_interaction?.transaction_data?.qr_code,
        },
      });
    } catch (err) {
      console.error("PIX PAYMENT ERROR", JSON.stringify(err, null, 2));
      throw err;
    }
  }
}
