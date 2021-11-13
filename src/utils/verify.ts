import { verify as verifyJwt } from "jsonwebtoken";
import { Token } from "types/token";

export const verify = (token: string) => {
    try {
        const payload = verifyJwt(token, process.env.JWT_SECRET);

        return payload as Token;
    } catch (_) {
        return false;
    }
};
