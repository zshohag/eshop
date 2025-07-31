// // app/api/user/route.ts
// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     await connectMongoDB();
//     const { name, email, role = "user" } = await req.json();

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.log("🟡 User already exists:", email);
//       return new Response("User already exists", { status: 200 });
//     }

//     const newUser = await User.create({ name, email, role });
//     console.log("🟢 New user saved:", newUser);

//     return new Response("User created", { status: 201 });
//   } catch (err) {
//     console.error("🔴 Error saving user:", err);
//     return new Response("Error creating user", { status: 500 });
//   }
// }

//////////

// app/api/user/route.ts

import { authOptions } from "@/lib/auth";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { name, email, password, role = "user" } = await req.json();

    if (!name || !email || !password) {
      return new Response("Missing fields", { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("🟡 User already exists:", email);
      return new Response("User already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log("🟢 New user created:", newUser);
    return new Response("User created", { status: 201 });
  } catch (err) {
    console.error("🔴 Error saving user:", err);
    return new Response("Error creating user", { status: 500 });
  }
}

//

export async function GET() {
  try {
    // ✅ Use authOptions to make getServerSession work
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectMongoDB();

    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    return Response.json(users);
  } catch (error) {
    console.error("🔴 Error fetching users:", error);
    return new Response("Error fetching users", { status: 500 });
  }
}
