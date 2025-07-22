import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GlobalValidationPipe } from "./globalValidationPipe";
import { Logger } from "@nestjs/common";
import { GlobalExceptionFilter } from "./globalExceptionFilter";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:3000"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(new GlobalValidationPipe());

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3001);

  process.env.DATABASE_URL
    ? Logger.log("DATABASE_URL ok", "env")
    : Logger.error("DATABASE_URL undefined");

  process.env.JWT_SECRET_KEY
    ? Logger.log("JWT_SECRET_KEY ok", "env")
    : Logger.error("JWT_SECRET_KEY undefined");

  process.env.MP_TEST_ACCESS_TOKEN
    ? Logger.log("MP_TEST_ACCESS_TOKEN ok", "env")
    : Logger.error("MP_TEST_ACCESS_TOKEN undefined");

  process.env.MAILER_EMAIL &&
  process.env.MAILER_HOST &&
  process.env.MAILER_PORT &&
  process.env.MAILER_USER &&
  process.env.MAILER_PASS
    ? Logger.log("MAILER ok", "env")
    : Logger.error("MAILER undefined");

  console.log(`Local: ${await app.getUrl()}`);
}
bootstrap();
