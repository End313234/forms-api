import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@techmmunity/symbiosis-nestjs";
import { Form } from "database/entities/form";
import { Repository } from "@techmmunity/symbiosis-mongodb";
import { v4 as uuid } from "uuid";
import { User } from "database/entities/user";
import { CreateOneDto, QuestionDto, AnswerDto } from "./dto";
import { QuestionWithId } from "./types/question-with-id";

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(Form)
        private readonly forms: Repository<Form>,
        @InjectRepository(User)
        private readonly users: Repository<User>,
    ) {} // eslint-disable-line no-empty-function

    private static zip(firstArray: Array<any>, secondArray: Array<any>) {
        return [...Array(firstArray.length).keys()].map((n) => {
            return [firstArray[n], secondArray[n]];
        });
    }

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

    async createForm(body: CreateOneDto, authorId: string) {
        const { title, description, questions } = body;
        const questionsWithId = questions.map((question: QuestionWithId) => {
            question.id = uuid(); // eslint-disable-line no-param-reassign
            return question;
        });

        const form = await this.forms.save({
            title,
            description,
            questions: questionsWithId,
            authorId,
        });
        return form[0];
    }

    async createAnswer(body: AnswerDto, authorId: string) {
        const { formId, answers } = body;
        // await this.forms.upsert({ id: formId }, {
        //     answers: addAnswer(answers),
        // }); SYMBIOSIS DOES NOT SUPPORT SAVE OPERATORS YET
    }
}
