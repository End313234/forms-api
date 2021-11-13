import {
    Body,
    Headers,
    Controller,
    Get,
    Post,
    UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "api/auth/guard/jwt-auth-guard.guard";
import { AuthorizationHeader } from "dto/authorization-header";
import { CreateOneDto } from "./dto";
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

    // TODO: make findOne route
    @Get(":formId")
    async findOne() {
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: CreateOneDto,
        @Headers() headers: AuthorizationHeader,
    ) {
        const { authorization } = headers;
        const { sub } = this.jwtService.decode(authorization.substr(7));
        return this.formsService.create(body, sub);
    }
}
