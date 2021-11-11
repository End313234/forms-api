import { verify as verifyJwt } from "jsonwebtoken";
import { Token } from "types/token";

export const verify = (token: string) => {
    try {
        const payload = verifyJwt(token, process.env.JWT_PRIVATE_KEY);

        return payload as Token;
    } catch (_) {
        return false;
    }
};
