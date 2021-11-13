import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@techmmunity/symbiosis-nestjs";
import { Form } from "database/entities/form";
import { Repository } from "@techmmunity/symbiosis-mongodb";
import { CreateOneDto } from "./dto";

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(Form)
        private readonly forms: Repository<Form>,
    ) {} // eslint-disable-line no-empty-function

    async findAll() {
        return (await this.forms.find({})).map((form) => form.id.toString());
    }

    async findOne(formId: string) {
        const form = await this.forms.findOne({
            where: {
                id: formId,
            },
        });

        if (!form) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: `Couldn't find form of ID '${formId}'.`,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        return form;
    }

    async create(body: CreateOneDto, authorId: string) {
        const { title, description, questions } = body;
        const form = await this.forms.save({
            title,
            description,
            questions,
            authorId,
        });
        return form[0];
    }
}
