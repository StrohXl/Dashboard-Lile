import { CreatePaymentOfSale } from "@/app/api/sales/models";

import { FormSale } from "../models";
import { UpdateChangeManager } from "@/models/api/change_manager";
import { CreateListProduct } from "@/models/api/list_products";

export const createAddaptedSale = (body: FormSale) => {
  const newBody: {
    client: {
      id: number;
      ci: number;
      name: string;
      last_name: string;
    };
    list_products: CreateListProduct;
    payments: CreatePaymentOfSale[];
    change_manager: UpdateChangeManager[];
  } = {
    client: {
      id: Number(body.client.id),
      ci: Number(body.client.ci),
      name: body.client.name.toLocaleLowerCase(),
      last_name: body.client.last_name.toLocaleLowerCase(),
    },
    list_products: [],
    payments: [],
    change_manager: [],
  };
  body.list_products.forEach((item) => {
    newBody.list_products.push({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      stock: Number(item.stock),
      unit: item.unit,
    });
  });

  if (body.change_manager) {
    body.change_manager.forEach((item) => {
      newBody.change_manager.push({
        id: Number(item.id),
        change_amount: Number(item.change_amount),
        change_method: item.change_method,
        operation:
          item.change_method == "transferencia" ? Number(item.operation) : 0,
      });
    });
  }
  body.payments.forEach((item) => {
    newBody.payments.push({
      id: Number(item.id),
      payment_amount: Number(item.payment_amount),
      payment_method: item.payment_method,
      operation:
        item.payment_method == "transferencia" ? Number(item.operation) : 0,
    });
  });

  return newBody;
};
