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
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                try {
                    const res = await fetch(`http://localhost:5000/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (!res.ok) return null;

                    const data = await res.json();

                    const user = {
                        id: data.user.id,
                        email: data.user.email,
                        username: data.user.username,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        expiresIn: data.expiresIn,
                    }

                    console.log(user)
                    if(user) {
                        return user;
                    } else {
                        return null;
                    }

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
                token.id = (user as any).id;
                token.username = (user as any).username;
                token.accessToken = (user as any).accessToken;
                token.refreshToken = (user as any).refreshToken;
                token.expiresAt = Date.now() + (user as any).expiresIn * 1000;
            }

            if (Date.now() < (token.expiresAt as number)) {
                return token;
            }

            try {
                const res = await fetch(`https://framelane-2.onrender.com/refresh`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ refreshToken: token.refreshToken }),
                });

                if (!res.ok) throw new Error("Refresh request failed");

                const data = await res.json();

                token.accessToken = data.accessToken;
                token.expiresAt = Date.now() + data.expiresIn * 1000;
                token.refreshToken = data.refreshToken ?? token.refreshToken;

                return token;
            } catch (err) {
                console.error("Refresh token error:", err);
                return { ...token, error: "RefreshAccessTokenError" };
            }
        },

        async session({ session, token }) {
            if (token) {
                (session.user as any).id = token.id;
                (session.user as any).username = token.username;
                (session.user as any).accessToken = token.accessToken;
                (session.user as any).refreshToken = token.refreshToken;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin"
    },

}
