import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    SaveDateColumn,
    UpdateDateColumn,
} from "@techmmunity/symbiosis";
import { QuestionTypes } from "enums/question-types";

@Entity({
    isSubEntity: true,
})
export class AnsweredAlternative {
    @Column()
    alternative: string;

    @Column()
    answer: string;
}

@Entity({
    isSubEntity: true,
})
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

@Entity({
    isSubEntity: true,
})
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

    @Column(Question)
    questions: Array<Question>;

    @Column({
        type: Answer,
        defaultvalue: [],
    })
    answers: Array<Answer>;

    @SaveDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
