import { IsEmail, IsString } from "class-validator";

export default class AuthDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
