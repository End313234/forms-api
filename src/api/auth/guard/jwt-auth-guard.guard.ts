import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { verify } from "utils/verify";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private throwError() {
        throw new HttpException(
            {
                status: HttpStatus.UNAUTHORIZED,
                error: "Not authenticated",
            },
            HttpStatus.UNAUTHORIZED,
        );
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
