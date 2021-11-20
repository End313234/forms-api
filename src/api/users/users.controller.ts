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
import {
 ApiHeader, ApiParam, ApiProperty, ApiResponse,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto, EditUserDto, GetUserDto } from "./dto";

@Controller("/users")
export default class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {} // eslint-disable-line no-empty-function

    @Post()
    @ApiResponse({
        status: 201,
        description: "User created",
    })
    @ApiResponse({
        status: 400,
        description: "An invalid email address were provided",
    })
    @ApiResponse({
        status: 403,
        description:
            "An user with this email address or username already exist",
    })
    async createUser(@Body() body: CreateUserDto) {
        const { username, email, password } = body;
        const user = await this.usersService.create(username, email, password);

        return user;
    }

    @ApiResponse({
        status: 200,
        description: "The overall data set of users",
    })
    @Get("all")
    async getAll() {
        return this.usersService.findAll();
    }

    @ApiResponse({
        status: 401,
        description: "Invalid credencials",
    })
    @ApiResponse({
        status: 200,
        description: "The user",
    })
    @ApiParam({
        name: "id",
        description: "The user ID",
        allowEmptyValue: false,
        example: "a5b3623b-d9b7-4d1c-a87f-5355a5131e0c",
    })
    @Get(":id")
    async getUser(@Param("id") id: string) {
        return this.usersService.findOne({ id });
    }

    @ApiResponse({
        status: 401,
        description: "Invalid credencials",
    })
    @ApiResponse({
        status: 200,
        description: "The user forms",
    })
    @ApiParam({
        name: "id",
        description: "The user ID",
        allowEmptyValue: false,
        example: "17ef341c-ab68-43a4-a38d-644ff6aafbf1",
    })
    @Get(":id/forms")
    async getUserForms(@Param("id") id: string) {
        return await this.usersService.getUserForms(id);
    }

    @ApiResponse({
        status: 400,
        description: "Some error ocurred while validating the oldValue",
    })
    @ApiResponse({
        status: 200,
        description: "User edited successfully",
    })
    @ApiHeader({
        name: "authorization",
        description: "The access token provided in /auth/login",
        allowEmptyValue: false,
    })
    @UseGuards(JwtAuthGuard)
    @Post("edit")
    async editUser(
        @Body() body: EditUserDto,
        @Headers() headers: AuthorizationHeader,
    ) {
        const { authorization } = headers;
        const userId = this.jwtService.decode(authorization.substr(7));

        return this.usersService.editUser(userId as string, body);
    }

    @ApiResponse({
        status: 400,
        description: "Invalid credencials",
    })
    @ApiResponse({
        status: 200,
        description: "An empty object",
    })
    @ApiHeader({
        name: "authorization",
        description: "The authorization header",
        allowEmptyValue: false,
    })
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteUser(@Headers() headers: AuthorizationHeader) {
        const { authorization } = headers;
        const userId = this.jwtService.decode(authorization.substr(7));

        return this.usersService.deleteOne(userId as string);
    }
}
