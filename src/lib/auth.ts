// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import User from "@/models/User";
// import type {
//   Account,
//   Profile,
//   User as NextAuthUser,
//   Session,
// } from "next-auth";
// import type { JWT } from "next-auth/jwt";
// import type { AdapterUser } from "next-auth/adapters";
// import { connectMongoDB } from "./mongodb";

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
//       account,
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
//       user,
//     }: {
//       token: JWT;
//       user?: NextAuthUser | AdapterUser;
//       account?: Account | null;
//       profile?: Profile;
//       trigger?: "signIn" | "signUp" | "update";
//       isNewUser?: boolean;
//       session?: Session;
//     }) {
//       if (user?.email) {
//         await connectMongoDB();
//         const dbUser = await User.findOne({ email: user.email });
//         token.role = dbUser?.role || "user";
//       }
//       return token;
//     },

//     async session({
//       session,
//       token,
//     }: {
//       session: Session;
//       token: JWT;
//       user?: NextAuthUser | AdapterUser;
//     }) {
//       if (session?.user && token?.role) {
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//   },
// };

//NEW SIGN IN USER

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { connectMongoDB } from "./mongodb";

import type {
  Account,
  Profile,
  User as NextAuthUser,
  Session,
} from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    // Google login ✅
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Email/Password login ✅
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        try {
          await connectMongoDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            console.log("❌ User not found:", credentials.email);
            return null;
          }

          // Check if user has a password (for credential-based users)
          if (!user.password) {
            console.log(
              "❌ User has no password (Google user trying credential login)"
            );
            return null;
          }

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isMatch) {
            console.log("❌ Password mismatch for:", credentials.email);
            return null;
          }

          console.log("✅ User authenticated:", user.email);
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("❌ Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: NextAuthUser | AdapterUser;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }) {
      if (account?.provider === "google") {
        const { name, email } = user;

        if (!email) {
          console.log("❌ No email from Google");
          return false;
        }

        try {
          await connectMongoDB();
          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            console.log("🟡 Creating new Google user:", email);
            // Create new user for Google sign-in (no password required)
            await User.create({
              name,
              email,
              role: "user",
              // No password field for Google users
            });
            console.log("✅ New Google user created");
          } else {
            console.log("✅ Existing Google user found");
          }
        } catch (err) {
          console.error("❌ Google sign-in error:", err);
          return false;
        }
      }
      return true;
    },

    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: NextAuthUser | AdapterUser;
      account?: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: Session;
    }) {
      if (user?.email) {
        try {
          await connectMongoDB();
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            token.role = dbUser.role || "user";
            token.id = dbUser._id.toString();
          }
        } catch (error) {
          console.error("❌ JWT callback error:", error);
        }
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
      user?: NextAuthUser | AdapterUser;
    }) {
      if (session?.user && token) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin", // your login page route
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
