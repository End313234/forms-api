import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { SymbiosisModule } from "@techmmunity/symbiosis-nestjs";
import { Form } from "database/entities/form";
import { User } from "database/entities/user";
import { FormsController } from "./forms.controller";
import { FormsService } from "./forms.service";

@Module({
    imports: [
        SymbiosisModule.forFeature([Form, User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [FormsController],
    providers: [FormsService],
})
export class FormsModule {}
