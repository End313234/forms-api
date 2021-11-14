import { QuestionDto } from "../dto";

export interface QuestionWithId extends QuestionDto {
    id: string;
}
