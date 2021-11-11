import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Form from "database/entities/Form";
import { FormsController } from "./forms.controller";
import { FormsService } from "./forms.service";

@Module({
    imports: [TypeOrmModule.forFeature([Form])],
    controllers: [FormsController],
    providers: [FormsService],
})
export class FormsModule {}
