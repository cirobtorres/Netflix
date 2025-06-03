import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GlobalValidationPipe } from "./globalValidationPipe";

console.log("DATABASE_URL", process.env.DATABASE_URL ? "ok" : undefined, "\n");
console.log(
  "MP_TEST_ACCESS_TOKEN",
  process.env.MP_TEST_ACCESS_TOKEN ? "ok" : undefined,
  "\n",
);

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
  });

  app.useGlobalPipes(new GlobalValidationPipe());

  await app.listen(process.env.PORT ?? 3001);

  console.log(`Local: ${await app.getUrl()}`);
  console.log("Global validation to DTOs with ValidationPipe");
}
bootstrap();
