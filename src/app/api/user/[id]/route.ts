// /app/api/user/[id]/route.ts - Delete user
// import User from "@/models/User";
// import { connectMongoDB } from "@/lib/mongodb";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();

//     const deletedUser = await User.findByIdAndDelete(params.id);

//     if (!deletedUser) {
//       return new Response("User not found", { status: 404 });
//     }

//     console.log("🟢 User deleted:", deletedUser.email);
//     return Response.json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("🔴 Error deleting user:", error);
//     return new Response("Error deleting user", { status: 500 });
//   }
// }

///////////
// import User from "@/models/User";
// import { connectMongoDB } from "@/lib/mongodb";
// import { NextRequest } from "next/server";

// // DELETE /api/user/[id]
// export async function DELETE(
//   req: NextRequest,
//   context: Promise<{ params: { id: string } }>
// ) {
//   const { params } = await context; // ✅ Await context properly!
//   const id = params.id;

//   try {
//     await connectMongoDB();

//     const deletedUser = await User.findByIdAndDelete(id);

//     if (!deletedUser) {
//       return new Response("User not found", { status: 404 });
//     }

//     console.log("🟢 User deleted:", deletedUser.email);
//     return Response.json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("🔴 Error deleting user:", error);
//     return new Response("Error deleting user", { status: 500 });
//   }
// }

////////
import User from "@/models/User";
import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest } from "next/server";

// DELETE /api/user/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params; // ✅ Await params directly
  const id = params.id;

  try {
    await connectMongoDB();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return new Response("User not found", { status: 404 });
    }

    console.log("🟢 User deleted:", deletedUser.email);
    return Response.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("🔴 Error deleting user:", error);
    return new Response("Error deleting user", { status: 500 });
  }
}