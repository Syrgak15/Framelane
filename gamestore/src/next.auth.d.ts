import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        id: string;
        username: string;
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }

    interface Session extends DefaultSession {
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
        error?: string;
    }
}
