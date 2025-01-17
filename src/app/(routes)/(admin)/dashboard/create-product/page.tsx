"use client";

import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import MainImage from "./_components/main-image";
import OptionalImages from "./_components/optional-images";
import BasicInfo from "./_components/basic-info";
import Pricing from "./_components/pricing";
import CategoryBrand from "./_components/category-brand";
import StockQuantity from "./_components/stock-quantity";
import Message from "./_components/message";
import { Button } from "@/components/ui/button";
import ProductSchema, { ProductSchemaType } from "@/schemas/productSchema";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const CreateProduct = () => {
  const [loading, start] = useTransition();
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
  });
  const { control, handleSubmit } = form;

  const { toast } = useToast();
  const { replace } = useRouter();

  const onValid = (data: ProductSchemaType) => {
    start(async () => {
      try {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

        const formData = new FormData();
        formData.append("file", data.mainImage);
        formData.append("upload_preset", "seeba-store");

        const mainImageResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        if (mainImageResponse.status === 200) {
          const optionalImages = [];

          if (data?.optionalImages && data.optionalImages.length > 0) {
            for (const image of data.optionalImages) {
              const formData = new FormData();
              formData.append("file", image);
              formData.append("upload_preset", "seeba-store");

              const optionalImagesResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
              );

              if (optionalImagesResponse.status === 200) {
                optionalImages.push(optionalImagesResponse.data.secure_url);
              }
            }
          }

          const addedProductResponse = await axios.post("/api/product", {
            ...data,
            mainImage: mainImageResponse.data.secure_url,
            optionalImages,
          });

          if (addedProductResponse.status === 201) {
            toast({
              title: addedProductResponse.statusText,
              description: addedProductResponse.data.message,
            });
            replace("/dashboard/listed-products");
          }
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
      <h2 className="text-2xl font-bold mb-6 underline">Create New Product</h2>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onValid)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
        >
          <div className="space-y-2">
            <MainImage control={control} />
            <OptionalImages control={control} />
          </div>
          <div className="space-y-2">
            <BasicInfo control={control} />
            <Pricing control={control} />
            <CategoryBrand control={control} />
            <StockQuantity control={control} />
            <Message control={control} />
            <Button
              className="w-full"
              aria-label={loading ? "Adding Product" : "Add Product"}
              disabled={loading}
              autoFocus
            >
              {loading ? (
                <>
                  Adding <Loader className="animate-spin" />
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateProduct;
