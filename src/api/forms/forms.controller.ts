import {
    Body,
    Headers,
    Param,
    Controller,
    Get,
    Post,
    UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "api/auth/guard/jwt-auth-guard.guard";
import { AuthorizationHeader } from "dto/authorization-header";
import { AnswerDto, CreateOneDto } from "./dto";
import { FormsService } from "./forms.service";

@Controller("/forms")
export class FormsController {
    constructor(
        private readonly formsService: FormsService,
        private readonly jwtService: JwtService,
    ) {} // eslint-disable-line no-empty-function

    @Get()
    async findAll() {
        return this.formsService.findAll();
    }

    @Get(":formId")
    async findOne(@Param() params: { formId: string }) {
        const { formId } = params;
        return await this.formsService.findOne(formId);
    }

    @UseGuards(JwtAuthGuard)
    @Post(":formId/answers")
    async createAnswer(
        @Body() body: AnswerDto,
        @Headers() headers: AuthorizationHeader,
    ) {
        const { authorization } = headers;
        const { sub } = this.jwtService.decode(authorization.substr(7));

        return await this.formsService.createAnswer(body, sub);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createForm(
        @Body() body: CreateOneDto,
        @Headers() headers: AuthorizationHeader,
    ) {
        const { authorization } = headers;
        const { sub } = this.jwtService.decode(authorization.substr(7));

        return await this.formsService.createForm(body, sub);
    }
}
