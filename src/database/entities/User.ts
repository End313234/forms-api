import {
    Column,
    SaveDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "@techmmunity/symbiosis";
import { Form } from "./Form";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn({
        name: "_id",
    })
    id: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    nickname: string;

    @Column()
    password: string;

    @Column({
        type: Form,
        defaultValue: [],
    })
    answeredForms: Form[];

    @SaveDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
