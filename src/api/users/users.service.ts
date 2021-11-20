import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@techmmunity/symbiosis-nestjs";
import { User } from "database/entities/user";
import { Repository } from "@techmmunity/symbiosis-mongodb";
import { hash } from "bcryptjs";
import { isEmail } from "class-validator";
import { Form } from "database/entities/form";
import { throwUnauthorizedError } from "utils/errors/unauthorized";
import { throwBadRequestError } from "utils/errors/bad-request";
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
            return throwBadRequestError("Insert a valid email address!");
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

        await this.users.insert({
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
            return throwUnauthorizedError("Invalid credencials were provided");
        }

        // @ts-ignore
        return filter ? this.filterUser(user) : user;
    }

    async findAll() {
        return (await this.users.find({})).map((user) => this.filterUser(user));
    }

    async editUser(userId: string, body: EditUserDto) {
        const { toChange, newValue, oldValue } = body;
        const user = await this.findOne({ id: userId });

        if (user[toChange] !== oldValue) {
            return throwBadRequestError("Old value is not correct");
        }

        if (oldValue === newValue) {
            return throwBadRequestError(
                "Old value and the new value are the same",
            );
        }

        user[toChange] = newValue;
        await this.users.save(user);

        return {
            message: `${toChange} was updated successfully.`,
        };
    }

    async getUserForms(userId: string) {
        await this.findOne({ id: userId });

        return await this.forms.find({
            where: {
                authorId: userId,
            },
        });
    }

    async deleteOne(userId: string) {
        const user = await this.findOne({ id: userId });
        if (!user) {
            return throwUnauthorizedError("Invalid credencials were provided");
        }

        await this.users.delete({
            id: userId,
        });
        return {};
    }
}
