"use client";

import React, { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useProductsRefetch } from "@/store/refetchStates";

const DeleteProduct = ({ id }: { id: string }) => {
  const [loading, start] = useTransition();

  const { toast } = useToast();
  const { onRefetch } = useProductsRefetch();

  const handleDelete = () => {
    start(async () => {
      try {
        const response = await axios.delete(`/api/product?id=${id}`);

        if (response.status === 200) {
          toast({
            title: response.statusText,
            description: response.data.message,
          });
          onRefetch();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            variant: "destructive",
            title: error.response?.statusText,
            description: error.response?.data.message,
          });
          console.error(error);
        }
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-600" size="icon">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete your selected product from your database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="bg-red-500 hover:bg-red-600"
            aria-label={loading ? "Deleting..." : "Delete"}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                Deleting <Loader2 className="animate-spin" />
              </>
            ) : (
              <>
                Delete <Trash2 />
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
