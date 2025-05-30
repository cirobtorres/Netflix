import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

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

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
