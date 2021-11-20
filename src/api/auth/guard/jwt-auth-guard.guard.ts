import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { throwUnauthorizedError } from "utils/errors/unauthorized";
import { verify } from "utils/verify";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private throwError() {
        return throwUnauthorizedError("Not authenticated");
    }

    public canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const { authorization } = request.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            this.throwError();

            return false;
        }

        const token = authorization.replace("Bearer ", "");

        if (!verify(token)) {
            this.throwError();

            return false;
        }

        return true;
    }
}
