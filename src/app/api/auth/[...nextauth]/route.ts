// import { NextAuthOptions } from "next-auth";
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import type { Account, Profile, User as NextAuthUser, Session } from "next-auth";
// import type { JWT } from "next-auth/jwt";
// import type { AdapterUser } from "next-auth/adapters";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     async signIn({ 
//       user, 
//       account 
//     }: { 
//       user: NextAuthUser | AdapterUser; 
//       account: Account | null;
//       profile?: Profile;
//       email?: { verificationRequest?: boolean };
//       credentials?: Record<string, unknown>;
//     }) {
//       if (account?.provider === "google") {
//         const { name, email } = user;
//         try {
//           await connectMongoDB();
//           const existingUser = await User.findOne({ email });

//           if (!existingUser) {
//             // New user, create with default role "user"
//             const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ name, email, role: "user" }),
//             });
//             if (!res.ok) return false;
//           }
//         } catch (err) {
//           console.error("❌ Sign-in error:", err);
//           return false;
//         }
//       }
//       return true;
//     },

//     async jwt({ 
//       token, 
//       user 
//     }: { 
//       token: JWT; 
//       user?: NextAuthUser | AdapterUser;
//       account?: Account | null;
//       profile?: Profile;
//       trigger?: "signIn" | "signUp" | "update";
//       isNewUser?: boolean;
//       session?: Session;
//     }) {
//       // Add role to token (if user signed in)
//       if (user?.email) {
//         await connectMongoDB();
//         const dbUser = await User.findOne({ email: user.email });
//         token.role = dbUser?.role || "user"; // default fallback
//       }
//       return token;
//     },

//     async session({ 
//       session, 
//       token 
//     }: { 
//       session: Session; 
//       token: JWT;
//       user?: NextAuthUser | AdapterUser;
//     }) {
//       // Inject role from token to session
//       if (session?.user && token?.role) {
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Import authOptions from your new file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };