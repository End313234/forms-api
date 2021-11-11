import { Controller, Body, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import AuthDto from "./dto/auth.dto";

@Controller("auth")
export default class AuthController {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly authService: AuthService) {}

    @Post("signin")
    async signIn(@Body() dto: AuthDto) {
        return await this.authService.signIn(dto);
    }
}
