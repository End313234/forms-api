import { Type } from "class-transformer";
import {
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsEnum,
    IsNumber,
    IsString,
    ValidateIf,
    ValidateNested,
} from "class-validator";
import { QuestionTypes } from "enums/question-types";

export class QuestionDto {
    @IsEnum(QuestionTypes, {
        message: "$property must be one of 'TEXT' or 'MULTIPLE'",
    })
    type: QuestionTypes;

    @IsString()
    description: string;

    @IsBoolean()
    areMultipleChoices: boolean;

    @ValidateIf((o) => o.areMultipleChoices)
    @IsNumber()
    maximumChoices: number;

    @ValidateIf((o) => o.type === "MULTIPLE")
    @IsArray()
    @IsString({
        message: "$property must be an arry of strings",
        each: true,
    })
    @ArrayNotEmpty()
    @ArrayMinSize(2, {
        message: "$property must have at least 2 items",
    })
    alternatives: Array<string>;

    @IsBoolean()
    isObrigatory: boolean;
}

export class CreateOneDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsBoolean()
    canHaveMultipleAnswers: boolean;

    @IsArray({
        message: "$property must be an array",
    })
    @ArrayNotEmpty({
        message: "$property must not be empty",
    })
    @ValidateNested({
        message: "error found in $property",
        each: true,
    })
    @ArrayMinSize(1, {
        message: "$property must have at least one question",
    })
    @Type(() => QuestionDto)
    questions: Array<QuestionDto>;
}
