import { ApiError, ApiResponse } from "@/utils/ApiHandler";
import { prisma } from "@/lib/prisma";

// Create Product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      mainImage,
      optionalImages,
      name,
      description,
      price,
      discount,
      category,
      brand,
      stockQuantity,
      message,
    } = body;

    const existedProductByName = await prisma.product.findUnique({
      where: { name },
    });
    if (existedProductByName) {
      return ApiError(400, "A product already exists with the same name");
    }

    const createdProduct = await prisma.product.create({
      data: {
        mainImage,
        optionalImages,
        name,
        description,
        price,
        discount,
        discountedPrice: discount > 0 ? price - discount : 0,
        discountPercentage: discount > 0 ? (discount / price) * 100 : 0,
        category,
        brand,
        stockQuantity,
        isAvailable: stockQuantity > 0 ? true : false,
        message,
      },
    });

    return ApiResponse(201, "Product created successfully", createdProduct);
  } catch (error) {
    return ApiError(500, "Something went wrong while creating product", error);
  }
}

// Delete Product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return ApiError(400, "Product id is required");

    await prisma.product.delete({ where: { id } });

    return ApiResponse(200, "Product deleted successfully");
  } catch (error) {
    return ApiError(500, "Something went wrong while deleting product", error);
  }
}

// Get Product
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "desc";
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (id) {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) return ApiError(404, "Product Not Found");

      return ApiResponse(200, "Product fetched successfully", product);
    }

    let sortOptions: any = { createdAt: sort === "asc" ? "asc" : "desc" };
    if (sort === "low-to-high") sortOptions = { price: "asc" };
    else if (sort === "high-to-low") sortOptions = { price: "desc" };

    const products = await prisma.product.findMany({
      where: { name: { contains: search, mode: "insensitive" } },
      orderBy: sortOptions,
      skip: offset,
      take: limit,
    });
    if (!products) return ApiError(404, "Products Not Found");

    return ApiResponse(200, "Products fetched successfully", products);
  } catch (error) {
    return ApiError(500, "Something went wrong while fetching products", error);
  }
}
