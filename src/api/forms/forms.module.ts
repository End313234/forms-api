import { Module } from "@nestjs/common";
import { SymbiosisModule } from "@techmmunity/symbiosis-nestjs";
import { Form } from "database/entities/Form";
import { FormsController } from "./forms.controller";
import { FormsService } from "./forms.service";

@Module({
    imports: [SymbiosisModule.forFeature([Form])],
    controllers: [FormsController],
    providers: [FormsService],
})
export class FormsModule {}
