import {
    Controller,
    Body,
    Headers,
    Post,
    Get,
    UseGuards,
    Delete,
    Param,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "api/auth/guard/jwt-auth-guard.guard";
import { AuthorizationHeader } from "dto/authorization-header";
import { UsersService } from "./users.service";
import { CreateUserDto, EditUserDto, GetUserDto } from "./dto";

@Controller("/users")
export default class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {} // eslint-disable-line no-empty-function

    @Post()
    async createUser(@Body() body: CreateUserDto) {
        const { username, email, password } = body;
        const user = await this.usersService.create(username, email, password);

        return user;
    }

    @Get("all")
    async getAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    async getUser(@Param() params: GetUserDto) {
        const { id } = params;

        return this.usersService.findOne({ id });
    }

    @Get(":id/forms")
    async getUserForms(@Param() params: GetUserDto) {
        const { id } = params;

        return this.usersService.getUserForms(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("edit")
    async editUser(
        @Body() body: EditUserDto,
        @Headers() headers: AuthorizationHeader,
    ) {
        const { authorization } = headers;
        const userId = this.jwtService.decode(authorization.substr(7));
        console.log(userId);

        return this.usersService.editUser(userId as string, body);
    }

    /*
     * @UseGuards(JwtAuthGuard)
     * @Delete()
     * Async deleteUser(@Headers() headers: AuthorizationHeader) {
     *     Console.log(
     *         This.jwtService.decode(headers.Authorization, {
     *             Json: true,
     *         }),
     *     ); // check this
     * } DELETE IS NOT IMPLEMENTED ON SYMBIOSIS YET
     */
}
