import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Form from "database/entities/Form";
import { User } from "database/entities/User";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import ValidationPipe from "validation/validation.pipe";
import API from "api";

@Module({
    imports: [
        ...API,
        ConfigModule.forRoot({
            envFilePath: ".env.local",
        }),
        TypeOrmModule.forRoot({
            type: "mongodb",
            url: process.env.DATABASE_URL,
            database: "FormAPI",
            useUnifiedTopology: true,
            entities: [Form, User],
        }),
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}
