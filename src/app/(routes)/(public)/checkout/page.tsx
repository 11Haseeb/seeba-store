"use client";

import React, { useState, useTransition } from "react";
import CustomerDetails from "./_components/customer-details";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema, OrderSchemaType } from "@/schemas/orderSchema";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Address from "./_components/address";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/cart-hooks/use-cart";
import PaymentInfo from "./_components/payment-info";
import { useCartRefetch } from "@/store/refetchStates";
import ConfirmationMessage from "./_components/confirmation-message";
import EmptyCart from "./_components/empty-cart";

const Checkout = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [pending, start] = useTransition();
  const { loading, cart, cartProducts } = useCart();
  const form = useForm<OrderSchemaType>({ resolver: zodResolver(OrderSchema) });
  const { control, handleSubmit } = form;
  const { toast } = useToast();
  const { onRefetch } = useCartRefetch();

  const onValid = (data: OrderSchemaType) => {
    start(async () => {
      try {
        const response = await axios.post(`/api/order`, {
          ...data,
          cartId: cart?.id,
          orderedProducts: cartProducts,
          totalPrice: cart?.totalPrice,
          addedBy: cart?.addedBy,
        });

        if (response.status === 201) {
          toast({
            title: response.statusText,
            description: response.data.message,
          });
          onRefetch();
          setIsOrdered(true);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            variant: "destructive",
            title: error.response?.statusText,
            description: error.response?.data.message,
          });
        }
      }
    });
  };

  return (
    <section>
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-12">
        <h1 className="text-3xl text-center font-bold mb-12">Checkout</h1>

        {!loading && cartProducts.length === 0 ? (
          <EmptyCart />
        ) : !isOrdered && !loading ? (
          <div className="flex max-md:flex-wrap gap-4">
            <div className="w-[68%] max-md:w-full max-md:order-2">
              <Form {...form}>
                <form
                  onSubmit={handleSubmit(onValid, (errors) =>
                    console.error(errors)
                  )}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Customer Details</h3>
                    <CustomerDetails control={control as Control} />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Address</h3>
                    <Address control={control as Control} />
                  </div>
                  <Button
                    aria-label={pending ? "Confirming Order" : "Confirm Order"}
                    disabled={pending}
                  >
                    {pending ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Confirm Order"
                    )}
                  </Button>
                </form>
              </Form>
              <h6 className="text-2xl text-center font-semibold mt-6">
                Please send us payment screenshot on our whatsapp number:
                <span className="text-green-600"> +92 306-3799841</span>
              </h6>
            </div>
            <div className="py-8 px-4 w-[32%] max-md:w-full h-max border rounded-md">
              <h5 className="text-2xl text-center font-bold mb-6">
                Total Price: {cart?.totalPrice}
              </h5>
              <PaymentInfo />
            </div>
          </div>
        ) : (
          !pending && <ConfirmationMessage />
        )}
      </div>
    </section>
  );
};

export default Checkout;
