import {
    Column,
    SaveData,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    SaveDateColumn,
} from "@techmmunity/symbiosis";
import { Form } from "./form";

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
    answeredForms: Array<Form>;

    @SaveDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
