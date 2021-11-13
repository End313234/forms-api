import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@techmmunity/symbiosis-nestjs";
import { User } from "database/entities/user";
import { Repository } from "@techmmunity/symbiosis-mongodb";
import { hash } from "bcryptjs";
import { isEmail } from "class-validator";
import { Form } from "database/entities/form";
import { EditUserDto, GetUserDto } from "./dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        @InjectRepository(Form)
        private readonly forms: Repository<Form>,
    ) {} // eslint-disable-line no-empty-function

    private filterUser(user: User) {
        const { password, ...data } = user;

        return data;
    }

    async create(username: string, email: string, password: string) {
        const possibleUser = await this.users.findOne({
            where: {
                email,
            },
        });

        if (!isEmail(email)) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: "Insert a valid email address!",
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        if (possibleUser) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: "An user with this username/email address already exist!",
                },
                HttpStatus.FORBIDDEN,
            );
        }

        await this.users.save({
            name: username,
            nickname: username,
            email,
            password: await hash(password, 8),
        });

        return {
            name: username,
            nickname: username,
            email,
            password,
        };
    }

    async findOne(data: GetUserDto, filter = true) {
        const { email, id } = data;
        const element = email || id;

        const user = await this.users.findOne({
            where: {
                [email ? "email" : "id"]: element,
            },
        });

        if (!user) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: "Invalid credencials were provided",
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        return filter ? this.filterUser(user) : user;
    }

    async findAll() {
        return (await this.users.find({})).map((user) => this.filterUser(user));
    }

    async editUser(userId: string, body: EditUserDto) {
        const { toChange, newValue, oldValue } = body;
        const user = await this.findOne({ id: userId });

        if (user[toChange] !== oldValue) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: "Old value is not correct",
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        if (oldValue === newValue) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: "Old value and the new value are the same",
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        user[toChange] = newValue;
        await this.users.upsert(
            {
                id: userId,
            },
            user,
        );

        return {
            message: `${toChange} was updated successfully.`,
        };
    }

    async getUserForms(userId: string) {
        return await this.forms.find({
            where: {
                authorId: userId,
            },
        });
    }

    /*
     * Async deleteOne(userId: string) {
     *     Const user = await this.findOne({ id: userId });
     *     If (!user) {
     *         Throw new HttpException(
     *             {
     *                 Status: HttpStatus.UNAUTHORIZED,
     *                 Error: "Invalid credencials were provided",
     *             },
     *             HttpStatus.UNAUTHORIZED,
     *         );
     *     }
     *     Await this.users.delete(userId); NOT IMPLEMENTED
     * }
     */
}
