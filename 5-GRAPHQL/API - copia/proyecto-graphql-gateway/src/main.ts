import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para permitir conexiones desde diferentes orígenes
  app.enableCors();
  
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  
  console.log(`🚀 GraphQL Gateway corriendo en: http://localhost:${port}/graphql`);
}
bootstrap();
