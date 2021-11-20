import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { UsersService } from "api/users/users.service";
import { User } from "database/entities/user";
import { throwUnauthorizedError } from "utils/errors/unauthorized";
import AuthDto from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly users: UsersService,
        private readonly jwtService: JwtService,
    ) {} // eslint-disable-line no-empty-function

    private async validateUser(dto: AuthDto) {
        const { email, password } = dto;
        const user = (await this.users.findOne({ email }, false)) as User;
        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            return throwUnauthorizedError("Credencials are incorrect");
        }

        return user;
    }

    private async signUser(id: string) {
        const jwt = await this.jwtService.signAsync({
            sub: id,
            claim: "user",
        });

        return jwt;
    }

    async login(dto: AuthDto) {
        const { id } = await this.validateUser(dto);

        return {
            accessToken: await this.signUser(id),
        };
    }
}
