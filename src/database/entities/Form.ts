import {
    Entity,
    SubEntity,
    PrimaryGeneratedColumn,
    Column,
    InsertDateColumn,
    UpdateDateColumn,
} from "@techmmunity/symbiosis";
import { QuestionWithId } from "api/forms/types/question-with-id";
import { QuestionTypes } from "enums/question-types";

@SubEntity()
export class AnsweredAlternative {
    @Column()
    alternative: string;

    @Column()
    answer: string;
}

@SubEntity()
export class Question {
    @Column({
        enum: QuestionTypes,
    })
    type: QuestionTypes;

    @Column()
    description: string;

    @Column({
        type: String,
        defaultValue: [],
    })
    alternatives: Array<string>;
}

@SubEntity()
export class Answer {
    @Column()
    authorId: string;

    @Column()
    textAnswer: string;

    @Column({
        type: AnsweredAlternative,
        defaultValue: [],
    })
    alternatives: Array<AnsweredAlternative>;
}

@Entity("forms")
export class Form {
    @PrimaryGeneratedColumn({
        name: "_id",
    })
    id: string;

    @Column()
    authorId: string;

    @Column({
        defaultValue: "No title",
    })
    title: string;

    @Column({
        defaultValue: "No description",
    })
    description: string;

    @Column({
        defaultValue: false,
    })
    canHaveMultipleAnswers: boolean;

    @Column(Question)
    questions: Array<QuestionWithId>;

    @Column({
        type: Answer,
        defaultvalue: [],
    })
    answers: Array<Answer>;

    @InsertDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
