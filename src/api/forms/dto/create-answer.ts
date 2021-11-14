import { Type } from "class-transformer";
import {
    ArrayNotEmpty,
    IsArray,
    IsEnum,
    IsString,
    IsUUID,
    ValidateNested,
} from "class-validator";
import { QuestionTypes } from "enums/question-types";

export class AnsweredQuestionDto {
    @IsUUID()
    questionId: string;

    @IsEnum(QuestionTypes, {
        message: "$property must be one of 'TEXT' or 'MULTIPLE'",
    })
    type: QuestionTypes;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({
        each: true,
    })
    answer: Array<string>;
}

export class AnswerDto {
    @IsUUID("4")
    formId: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({
        message: "error found in $property",
        each: true,
    })
    @Type(() => AnsweredQuestionDto)
    answers: Array<AnsweredQuestionDto>;
}
