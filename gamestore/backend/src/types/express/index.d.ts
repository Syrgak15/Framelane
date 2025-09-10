import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface UserPayload {
            id: number;
            email: string;
            username: string;
        }

        interface Request {
            user?: UserPayload | JwtPayload;
        }
    }
}
