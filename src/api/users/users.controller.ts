import {
    Controller,
    Body,
    Headers,
    Post,
    Get,
    UseGuards,
    Delete,
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

    @Get()
    async getUser(@Body() body: GetUserDto) {
        return await this.usersService.findOne(body);
    }

    @Get("all")
    async getAll() {
        return await this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("edit")
    async editUser(
        @Body() body: EditUserDto,
        @Headers() headers: AuthorizationHeader,
    ) {
        const userId = this.jwtService.decode(headers.Authorization);
        return await this.usersService.editUser(userId as string, body);
    }

    // @UseGuards(JwtAuthGuard)
    // @Delete()
    // async deleteUser(@Headers() headers: AuthorizationHeader) {
    //     console.log(
    //         this.jwtService.decode(headers.Authorization, {
    //             json: true,
    //         }),
    //     ); // check this
    // } DELETE IS NOT IMPLEMENTED ON SYMBIOSIS YET
}
