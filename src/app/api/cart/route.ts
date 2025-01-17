import { prisma } from "@/lib/prisma";
import { ApiError, ApiResponse } from "@/utils/ApiHandler";
import { currentUser } from "@clerk/nextjs/server";
import { CartProduct } from "@prisma/client";

// Add To Cart
export async function POST(request: Request) {
  try {
    const { productId, quantity = 1, price } = await request.json();
    const user = await currentUser();

    const existedCart = await prisma.cart.findUnique({
      where: { addedBy: user?.emailAddresses[0].emailAddress },
    });
    if (!existedCart) {
      const createdCart = await prisma.cart.create({
        data: {
          addedBy: user?.emailAddresses[0].emailAddress || "",
          cartProducts: [{ productId, quantity, price }],
          totalPrice: price * quantity,
        },
      });

      return ApiResponse(201, "Product added to cart", createdCart);
    }

    const existedCartProduct = existedCart.cartProducts.findIndex(
      (product: CartProduct) => product.productId === productId
    );

    if (existedCartProduct > -1) {
      existedCart.cartProducts[existedCartProduct].quantity = quantity;
      existedCart.cartProducts[existedCartProduct].price = price;
      existedCart.totalPrice = existedCart.cartProducts.reduce(
        (total, currentProduct) =>
          total + currentProduct.quantity * currentProduct.price,
        0
      );

      const updatedCart = await prisma.cart.update({
        where: { id: existedCart.id },
        data: {
          cartProducts: existedCart.cartProducts,
          totalPrice: existedCart.totalPrice,
        },
      });

      return ApiResponse(200, "Product updated in cart", updatedCart);
    } else {
      existedCart.cartProducts.push({ productId, quantity, price });
      existedCart.totalPrice = existedCart.cartProducts.reduce(
        (total, currentProduct) =>
          total + currentProduct.quantity * currentProduct.price,
        0
      );

      const updatedCart = await prisma.cart.update({
        where: { id: existedCart.id },
        data: {
          cartProducts: existedCart.cartProducts,
          totalPrice: existedCart.totalPrice,
        },
      });

      return ApiResponse(200, "Product added to cart", updatedCart);
    }
  } catch (error: any) {
    return ApiError(
      500,
      "Something went wrong while adding product to cart",
      error.message
    );
  }
}

// Get Cart
export async function GET(request: Request) {
  try {
    const user = await currentUser();

    const cart = await prisma.cart.findUnique({
      where: { addedBy: user?.emailAddresses[0].emailAddress },
    });

    return ApiResponse(200, "Cart fetched successfully", cart);
  } catch (error: any) {
    return ApiError(
      500,
      "Something went wrong while fetching cart",
      error.message
    );
  }
}

// Remove From Cart
export async function PATCH(request: Request) {
  try {
    const { productId } = await request.json();
    const user = await currentUser();

    const cart = await prisma.cart.findUnique({
      where: { addedBy: user?.emailAddresses[0].emailAddress },
    });
    if (!cart) return ApiError(404, "Cart Not Found");

    const productIndex = cart.cartProducts.findIndex(
      (product) => product.productId === productId
    );

    if (productIndex === -1) {
      return ApiError(404, "Product Not Found in Cart");
    }

    const updatedCart = await prisma.cart.update({
      where: { addedBy: cart.addedBy },
      data: {
        cartProducts: cart.cartProducts.filter(
          (product) => product.productId !== productId
        ),
        totalPrice:
          cart.totalPrice -
          cart.cartProducts[productIndex].quantity *
            cart.cartProducts[productIndex].price,
      },
    });

    return ApiResponse(200, "Product removed from cart", updatedCart);
  } catch (error: any) {
    return ApiError(
      500,
      "Something went wrong while removing product from cart",
      error.message
    );
  }
}
