"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProduct } from "../../app/lib/products/delete-product";
import { useRouter } from "next/navigation";
import Spinner from "../spinner/spinnet";
import { toast } from "sonner";

interface DeleteDialogProps {
  id: number;
  trigger: React.ReactNode;
}

export function DeleteDialog({ id, trigger }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleConfirm() {
    try {
      setLoading(true);

      await deleteProduct(id);

      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast.error("Ocorreu um problema ao excluir.");
    } finally {
      setLoading(false);
      setOpen(false);
      toast.success("Produto excluído com sucesso!");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir este produto?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <button
            className="flex items-center gap-2 px-4 py-2 text-gray-800 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 text-red-700 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 transition"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </button>
        </DialogFooter>

        {loading && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
