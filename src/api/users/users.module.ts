import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { SymbiosisModule } from "@techmmunity/symbiosis-nestjs";
import { Form } from "database/entities/form";
import { User } from "database/entities/user";
import UsersController from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [
        SymbiosisModule.forFeature([User, Form]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
