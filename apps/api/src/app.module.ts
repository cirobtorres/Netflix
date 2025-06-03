import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PaymentsModule } from "./payments/payments.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    forwardRef(() => PrismaModule),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
