import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@techmmunity/symbiosis-nestjs";
import { Form } from "database/entities/form";
import { Repository } from "@techmmunity/symbiosis-mongodb";
import { v4 as uuid } from "uuid";
import { User } from "database/entities/user";
import { Append } from "@techmmunity/symbiosis";
import { throwBadRequestError } from "utils/errors/bad-request";
import { throwUnauthorizedError } from "utils/errors/unauthorized";
import { CreateOneDto, AnswerDto, AnsweredQuestionDto } from "./dto";
import { QuestionWithId } from "./types/question-with-id";

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(Form)
        private readonly forms: Repository<Form>,
        @InjectRepository(User)
        private readonly users: Repository<User>,
    ) {} // eslint-disable-line no-empty-function

    private zipQuestions(
        questions: Array<QuestionWithId>,
        answers: Array<AnsweredQuestionDto>,
    ) {
        return questions.map((question) => {
            const answer = answers.find((obj) => obj.id === question.id);
            return [question, answer];
        });
    }

    async findAll() {
        return (await this.forms.find({})).map((form) => form.id.toString());
    }

    async findOne(formId: string, userId: string) {
        const form = await this.forms.findOne({
            where: {
                id: formId,
            },
        });

        if (!form) {
            return throwBadRequestError(
                `Couldn't find form of ID '${formId}'.`,
            );
        }

        if (!form.isPublic && form.authorId !== userId) {
            return throwUnauthorizedError("This form is not public");
        }

        return form;
    }

    async createForm(body: CreateOneDto, authorId: string) {
        const {
            title, description, questions, canHaveMultipleAnswers, isPublic,
        } = body;
        const questionsWithId = questions.map((question: QuestionWithId) => {
            question.id = uuid(); // eslint-disable-line no-param-reassign
            return question;
        });

        const form = await this.forms.save({
            title,
            description,
            questions: questionsWithId,
            authorId,
            canHaveMultipleAnswers,
            isPublic,
        });
        return form[0];
    }

    async createAnswer(body: AnswerDto, authorId: string) {
        const { formId, answers } = body;

        const form = await this.forms.findOne({
            where: {
                id: formId,
            },
        });
        const { questions, answers: formAnswers } = form;

        const possibleResponse = formAnswers.find(
            (answer) => answer.authorId === authorId,
        );
        if (possibleResponse && !form.canHaveMultipleAnswers) {
            return throwBadRequestError("This form can be answered only once.");
        }

        const zippedQuestions = this.zipQuestions(questions, answers);

        zippedQuestions.forEach(
            ([question, answer]: [QuestionWithId, AnsweredQuestionDto]) => {
                if (question.isObrigatory && !answer) {
                    const index = zippedQuestions.findIndex(
                        (item) => item === [question, answer],
                    );
                    return throwBadRequestError(
                        `Error found at index ${index}: the question is obrigatory but the answer wasn't provided.`,
                    );
                }

                return true;
            },
        );

        await this.forms.save({
            id: formId,
            authorId,
            answers: Append(answers),
        });

        return {
            formId,
            answers,
        };
    }
}
