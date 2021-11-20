import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: "The username",
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: "The email address",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "The password",
    })
    @IsString()
    password: string;
}
