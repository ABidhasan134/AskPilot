import connectionDB from "@/lib/connectionDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { },
        password: { },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Please provide both email and password.");
        }

        const db = await connectionDB();
        const userCollection = db.collection("users");
        const currentUser = await userCollection.findOne({ email });

        if (!currentUser) {
          throw new Error("You don't have an account. Please sign up.");
        }

        if (currentUser.password !== password) {
          throw new Error("Invalid password. Please try again.");
        }

        return {
          id: currentUser._id.toString(),
          name: currentUser.fullName,
          email: currentUser.email,
          image: currentUser.image,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
