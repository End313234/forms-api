import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectIdColumn,
    UpdateDateColumn,
} from "typeorm";
import { ObjectId } from "mongodb";
import Form from "./Form";

@Entity("users")
export default class User {
    @ObjectIdColumn({
        name: "_id",
    })
    id: ObjectId;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    nickname: string;

    @Column()
    password: string;

    @Column({
        default: [],
    })
    answeredForms: Form[];

    @Column({
        default: [],
    })
    createdForms: Form[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
