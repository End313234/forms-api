import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { SymbiosisModule } from "@techmmunity/symbiosis-nestjs";
import { Form } from "database/entities/form";
import { FormsController } from "./forms.controller";
import { FormsService } from "./forms.service";

@Module({
    imports: [
        SymbiosisModule.forFeature([Form]),
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
