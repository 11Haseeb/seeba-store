import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/prisma";
import { ApiError, ApiResponse } from "@/utils/ApiHandler";

// Create User
export async function POST(request: Request) {
  try {
    const { user } = await request.json();

    const inngestResult = await inngest.send({
      name: "user.create",
      data: { user },
    });

    return ApiResponse(201, "User created successfully", inngestResult);
  } catch (error) {
    return ApiError(500, "Something went wrong while creating user", error);
  }
}

// Update User
export async function PUT(request: Request) {
  try {
    const { user } = await request.json();

    const inngestResult = await inngest.send({
      name: "user.update",
      data: { user },
    });

    return ApiResponse(200, "User updated successfully", inngestResult);
  } catch (error) {
    return ApiError(500, "Something went wrong while updating user", error);
  }
}

// Gat Users
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get("clerkId");
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "desc";
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (clerkId) {
      const currentlyActiveUser = await prisma.user.findUnique({
        where: { clerkId },
      });

      if (currentlyActiveUser) {
        return ApiResponse(
          200,
          "User fetched successfully",
          currentlyActiveUser
        );
      }
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
      take: limit,
      skip: offset,
      orderBy: { createdAt: sort === "asc" ? "asc" : "desc" },
    });
    if (!users) return ApiError(404, "Users Not Found");

    return ApiResponse(200, "Users fetched successfully", users);
  } catch (error) {
    if (error instanceof Error) {
      return ApiError(
        500,
        "Something went wrong while fetching users",
        error.message
      );
    }
  }
}
