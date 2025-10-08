import createData from "@/services/post/createData";
import { updateData } from "@/services/put/updateData";
import { ParamValue } from "next/dist/server/request/params";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

import { CreateProduct } from "@/models/api/product";
import { ResponseData } from "@/models/response/responseData.model";

import { createBodyProduct, editBodyProductAdapter } from "../adapters";
import { FormProduct } from "../models/form-product.model";
import { Product } from "../models/product.model";


export const onSubmit = async ({
  body,
  setDisabled,
  router,
  id,
  iva,
}: {
  id: ParamValue;
  body: FormProduct;
  setDisabled: (value: boolean) => void;
  router: AppRouterInstance;
  iva: number;
}) => {
  setDisabled(true);

  const messagePending = id ? "Editando..." : "Creando...";
  const editProduct = editBodyProductAdapter({ body, iva });
  const createProduct = createBodyProduct({ body, iva });

  try {
    await toast.promise(
      id
        ? updateData<CreateProduct, Product>({
            apiUrl: "/products",
            body: editProduct,
            id: Number(id),
          })
        : createData<CreateProduct, Product>({
            apiUrl: "/products",
            body: createProduct,
          }),
      {
        pending: `${messagePending}`,
        success: {
          render({ data }: { data: ResponseData<Product> }) {
            return data.message;
          },
        },
        error: {
          render({ data }: { data: ResponseData<Product> }) {
            return data.message;
          },
        },
      }
    );
    if (!id) {
      router.push("/dashboard/products");
    }
  } catch {}
  setDisabled(false);
};
