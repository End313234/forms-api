import { IsEmail, IsNotEmpty } from "class-validator";

export default class AuthDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
