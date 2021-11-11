import {
    ArgumentMetadata,
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export default class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        const filteredErrors = errors.map((error) => {
            const { constraints } = error;
            return constraints[Object.keys(constraints)[0]];
        });

        if (errors.length > 0) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    [errors.length > 1 ? "errors" : "error"]: filteredErrors,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
