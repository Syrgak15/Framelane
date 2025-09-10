import type {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                    try {
                        const res = await fetch("http://localhost:5000/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        });

                        if (!res.ok) return null;

                        const data = await res.json();

                        return {
                            id: data.user.id,
                            email: data.user.email,
                            username: data.user.username,
                            token: data.token,
                        };
                    } catch (err) {
                        console.error("Authorize error:", err);
                        return null;
                    }
                },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).token;
                token.id = (user as any).id;
                token.username = (user as any).username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session.user as any).token = token.accessToken;
                (session.user as any).id = token.id;
                (session.user as any).username = token.username;
            }
            return session;
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin"
    },

}
