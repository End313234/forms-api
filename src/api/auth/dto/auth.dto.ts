import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export default class AuthDto {
    @ApiProperty({
        example: "someemailaddress@provider.com",
    })
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}
