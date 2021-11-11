import { ObjectId } from "mongodb";
import Question from "./Question";

export interface Form {
    id: ObjectId;
    authorId: ObjectId;
    title: string;
    description: string;
    questions: Question[];
} // eslint-disable-line

export interface AnsweredOrCreatedForm extends Form {
    url: string;
}
