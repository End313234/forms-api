import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Forms API")
        .setDescription("A simple API to make forms")
        .setVersion("0.0.1")
        .addTag("forms")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document, {
        customSiteTitle: "Forms API",
    });

    await app.listen(3000);
}
bootstrap();
