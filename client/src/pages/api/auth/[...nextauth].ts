import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {label: "email", type: "text"},
            password: {label: "password", type: "password"}
        },
        async authorize(credentials) {
            console.log(credentials)
            if(!credentials?.email || !credentials?.password) {
                throw new Error("Invalid credentials");
            }

            const user = await fetch('http://localhost:3001/api/auth/login')

            if(!user){
                throw new Error("Something went wrong");
            }

            return user;
        }
    })
  ],
  pages: {
    signIn: "/",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)