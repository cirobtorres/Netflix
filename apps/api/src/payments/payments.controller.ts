import { Body, Controller, Post } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("create")
  createPayment(
    @Body()
    body: {
      token: string;
      issuer_id: string; // Exp: '24'
      payment_method_id: string; // Exp: 'master'
      transaction_amount: number; // Valor da compra
      installments: number; // Parcelas
      payer: {
        email: string;
        identification: {
          type: string; // Exp: 'CPF'
          number: string; // Exp: '12345678909'
        };
      };
    },
  ) {
    return this.paymentsService.createCreditCardPayment(body);
  }

  @Post("pix")
  createPaymentPix(
    @Body()
    body: {
      transaction_amount: number;
      description: string;
      email: string;
      first_name: string;
      last_name: string;
      identification: {
        type: string; // "CPF"
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
    },
  ) {
    return this.paymentsService.createPixPayment(body);
  }
}
