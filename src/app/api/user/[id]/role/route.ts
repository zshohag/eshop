// /app/api/user/[id]/role/route.ts - Update user role


// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/User";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();
//     const { role } = await req.json();
    
//     if (!role || !['admin', 'user'].includes(role)) {
//       return new Response("Invalid role", { status: 400 });
//     }
    
//     const updatedUser = await User.findByIdAndUpdate(
//       params.id,
//       { role },
//       { new: true }
//     ).select('-password');
    
//     if (!updatedUser) {
//       return new Response("User not found", { status: 404 });
//     }
    
//     console.log("🟢 User role updated:", updatedUser.email, "->", role);
//     return Response.json(updatedUser);
//   } catch (error) {
//     console.error("🔴 Error updating user role:", error);
//     return new Response("Error updating user role", { status: 500 });
//   }
// }


/////////

// /app/api/user/[id]/role/route.ts - Update user role
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();
    
    // Await the params Promise in Next.js 15
    const { id } = await params;
    const { role } = await req.json();
    
    if (!role || !['admin', 'user'].includes(role)) {
      return new Response("Invalid role", { status: 400 });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      id, // Use the awaited id
      { role },
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return new Response("User not found", { status: 404 });
    }
    
    console.log("🟢 User role updated:", updatedUser.email, "->", role);
    return Response.json(updatedUser);
  } catch (error) {
    console.error("🔴 Error updating user role:", error);
    return new Response("Error updating user role", { status: 500 });
  }
}