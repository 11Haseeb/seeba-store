import { ApiError, ApiResponse } from "@/utils/ApiHandler";
import { inngest } from "@/inngest/client";

// Create Order
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const inngestResult = await inngest.send({
      name: "order.create",
      data: { body },
    });

    return ApiResponse(201, "Order Created Successfully", inngestResult);
  } catch (error) {
    if (error instanceof Error) {
      return ApiError(
        500,
        "Something went wrong while creating order",
        error.message
      );
    }
  }
}
