import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    InsertDateColumn,
} from "@techmmunity/symbiosis";

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
        type: String,
        defaultValue: [],
    })
    answeredForms: Array<string>;

    @InsertDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
