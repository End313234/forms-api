import { IsIn, IsString } from "class-validator";

export class EditUserDto {
    @IsIn(["password", "email", "nickname", "name"])
    toChange: string;

    @IsString()
    oldValue: string;

    @IsString()
    newValue: string;
}
