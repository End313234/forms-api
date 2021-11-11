import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Form from "database/entities/Form";
import { Repository } from "typeorm";
import { ObjectId } from "mongodb";

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(Form)
        private readonly forms: Repository<Form>,
    ) {} // eslint-disable-line no-empty-function

    async findAll() {
        return (await this.forms.find()).map((form) => form.id.toString());
    }

    async findOne(formId: string) {
        const parsedId = new ObjectId(formId);
        const form = await this.forms.findOne({
            id: parsedId,
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

        const { id, ...newForm } = form;
        const formWithId = {
            id: formId,
            ...newForm,
        };

        return formWithId;
    }
}
