import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { verify } from "utils/verify";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    public canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const { authorization } = request.headers;

        if (!authorization) {
            return false;
        }

        if (!authorization.startsWith("Bearer ")) {
            return false;
        }

        const token = authorization.replace("Bearer ", "");

        if (!verify(token)) {
            return false;
        }

        return true;
    }
}
