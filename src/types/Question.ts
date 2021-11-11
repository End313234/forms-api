import { QuestionTypes } from "enums/question-types";

export default interface Question {
    type: QuestionTypes;

    description: string;

    alterntives: string[];
} // eslint-disable-line
