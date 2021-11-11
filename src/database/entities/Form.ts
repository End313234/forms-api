import {
    Entity,
    ObjectIdColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { ObjectId } from "mongodb";
import Answer from "dto/Answer";
import Question from "dto/Question";

@Entity("forms")
export default class Form {
    @ObjectIdColumn({
        name: "_id",
    })
    id: ObjectId;

    @Column()
    authorId: ObjectId;

    @Column({
        default: "No title",
    })
    title: string;

    @Column({
        default: "No description",
    })
    description: string;

    @Column()
    questions: Question[];

    @Column({
        default: [],
    })
    answers: Answer[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
