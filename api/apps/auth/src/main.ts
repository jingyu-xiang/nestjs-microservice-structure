import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AuthModule } from "./auth.module";
import { RmqService } from "@app/shared/rmq/rmq.service";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AuthModule,
    new FastifyAdapter(),
  );

  const rmqService = app.get(RmqService);

  app.connectMicroservice(rmqService.getRmqServiceConfig("AUTH_SERVICE"));

  await app.startAllMicroservices();
}

bootstrap();
