import  { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";



export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_URL,
    providers:  [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: {
              label: "Email",
              type: "email",
              placeholder: "example1@example.com",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials.password) return null;
                       
            const user = await prisma.user.findUnique({where: {email: credentials.email} })
            if (!user || !(await compare(credentials?.password, user.password))) {
                return null;
              }
            return user;

            
          },
        }),
      ],
   
  
}
