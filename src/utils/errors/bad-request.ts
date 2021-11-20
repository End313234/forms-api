import { HttpException, HttpStatus } from "@nestjs/common";

export const throwBadRequestError = (message: string) => {
    throw new HttpException(
        {
            status: HttpStatus.BAD_REQUEST,
            error: message,
        },
        HttpStatus.BAD_REQUEST,
    );
};
