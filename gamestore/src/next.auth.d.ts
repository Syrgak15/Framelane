import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        username: string;
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }

    interface Session {
        user: {
            id: string;
            username: string;
            accessToken: string;
            refreshToken: string;
        } & DefaultSession["user"];
    }

    interface JWT {
        id: string;
        username: string;
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
    }
}
