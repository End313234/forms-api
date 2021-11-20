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
import { ApiHeader, ApiParam, ApiResponse } from "@nestjs/swagger";
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

    @ApiResponse({
        status: 200,
        description: "The forms",
    })
    @Get()
    async findAll() {
        return this.formsService.findAll();
    }

    @ApiResponse({
        status: 400,
        description: "Form not found",
    })
    @ApiResponse({
        status: 200,
        description: "The form",
    })
    @ApiParam({
        name: "formId",
        description: "The form ID",
        example: "4a13af68-7d56-4d88-912d-4c2a0c60580f",
    })
    @Get(":formId")
    async findOne(@Param() params: { formId: string }) {
        const { formId } = params;
        return await this.formsService.findOne(formId);
    }

    @ApiResponse({
        status: 400,
        description: "Some error ocurred in the answer validation",
    })
    @ApiResponse({
        status: 200,
        description: "The form ID + answers",
    })
    @ApiParam({
        name: "formId",
        description: "The form ID",
        example: "4a13af68-7d56-4d88-912d-4c2a0c60580f",
    })
    @ApiHeader({
        name: "authorization",
        description: "The access token provided in /auth/login",
        allowEmptyValue: false,
    })
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

    @ApiResponse({
        status: 400,
        description: "Some error with the form validation",
    })
    @ApiResponse({
        status: 200,
        description: "The new form",
    })
    @ApiHeader({
        name: "authorization",
        description: "The access token provided in /auth/login",
        allowEmptyValue: false,
    })
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
