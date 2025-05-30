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
    return this.paymentsService.createPayment(body);
  }
}
