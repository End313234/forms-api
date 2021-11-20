import { Controller, Body, Post } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import AuthDto from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly authService: AuthService) {}

    @ApiResponse({
        status: 401,
        description: "Incorrect credencials",
    })
    @ApiResponse({
        status: 200,
        description: "The access token",
    })
    @Post("login")
    async signIn(@Body() dto: AuthDto) {
        return await this.authService.login(dto);
    }
}
