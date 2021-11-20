import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString } from "class-validator";

export class EditUserDto {
    @ApiProperty({
        description:
            "The item to change. Must be one of 'password', 'email', 'nickname' or 'name'",
        example: "password",
        enum: ["password", "email", "nickname", "name"],
    })
    @IsIn(["password", "email", "nickname", "name"])
    toChange: string;

    @ApiProperty({
        description: "The current value",
    })
    @IsString()
    oldValue: string;

    @ApiProperty({
        description: "The new value",
    })
    @IsString()
    newValue: string;
}
