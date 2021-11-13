import { Module } from "@nestjs/common";
import { SymbiosisModule } from "@techmmunity/symbiosis-nestjs";
import {
    Connection,
    MongodbConnectionOptions,
} from "@techmmunity/symbiosis-mongodb";
import { Form } from "database/entities/form";
import { User } from "database/entities/user";
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
        SymbiosisModule.forRoot<MongodbConnectionOptions>(Connection, {
            entities: [Form, User],
            databaseConfig: {
                databaseName: "FormsAPI",
                url: process.env.DATABASE_URL,
            },
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
