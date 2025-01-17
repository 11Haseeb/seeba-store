import { inngest } from "./client";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// Create User
export const createUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },

  async ({ event, step }) => {
    const { user } = event.data;
    const { id, username, primaryEmailAddress, hasImage, imageUrl } = user;
    const email = primaryEmailAddress.emailAddress;

    const result = await step.run(
      "Create New User and save in DB",
      async () => {
        const existedUser = await prisma.user.findUnique({
          where: {
            clerkId: id,
          },
        });

        if (!existedUser) {
          const createdUser = await prisma.user.create({
            data: {
              clerkId: id,
              username,
              email,
              hasAvatar: hasImage,
              avatarUrl: imageUrl,
            },
          });

          return createdUser;
        }
      }
    );

    return result;
  }
);

// Update User
export const updateUser = inngest.createFunction(
  { id: "update-user" },
  { event: "user.update" },

  async ({ event, step }) => {
    const { user } = event.data;
    const { id, username, primaryEmailAddress, hasImage, imageUrl } = user;
    const email = primaryEmailAddress.emailAddress;

    const result = await step.run(
      "Update existed matched User and save in DB",
      async () => {
        const existedUser = await prisma.user.findUnique({
          where: {
            clerkId: id,
          },
        });

        if (existedUser) {
          const updatedUser = await prisma.user.update({
            where: {
              clerkId: id,
            },
            data: {
              username,
              email,
              hasAvatar: hasImage,
              avatarUrl: imageUrl,
            },
          });

          return updatedUser;
        }
      }
    );

    return result;
  }
);

// Create Order
export const createOrder = inngest.createFunction(
  { id: "create-order" },
  { event: "order.create" },

  async ({ event, step }) => {
    const { body } = event.data;
    const {
      customerName,
      customerEmail,
      phone,
      province,
      city,
      area,
      street,
      house,
      zipCode,
      cartId,
      addedBy,
      orderedProducts,
      totalPrice,
    } = body;

    const result = await step.run("Create Order", async () => {
      const createdOrder = await prisma.order.create({
        data: {
          customerName,
          customerEmail,
          phone,
          address: {
            province,
            city,
            area,
            street,
            house,
            zipCode,
          },
          cartId,
          orderedProducts,
          totalPrice,
        },
      });

      if (createdOrder) {
        const updatedCart = await prisma.cart.update({
          where: { addedBy },
          data: { cartProducts: [], totalPrice: 0 },
        });

        return updatedCart;
      }
    });

    return result;
  }
);
