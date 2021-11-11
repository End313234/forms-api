import { IsString } from "class-validator";

export class EditUserDto {
    @IsString()
    toChange: string;

    @IsString()
    oldValue: string;

    @IsString()
    newValue: string;
}
