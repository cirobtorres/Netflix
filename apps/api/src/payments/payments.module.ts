import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";

@Module({
  imports: [],
  exports: [PaymentsService],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
