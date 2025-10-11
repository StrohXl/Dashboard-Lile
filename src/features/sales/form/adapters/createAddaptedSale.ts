import { CreateSale } from "@/models/api/sale";

import { FormSale } from "../models";

export const createAddaptedSale = (body: FormSale) => {
  const newBody: CreateSale = {
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
    body.change_manager.forEach((item, index) => {
      if (newBody.change_manager) {
        newBody.change_manager.push({
          id: Number(item.id),
          change_amount: Number(item.change_amount),
          change_method: item.change_method,
        });
        if (item.change_method == "transferencia") {
          newBody.change_manager[index].operation = Number(item.operation);
        }
      }
    });
  }
  body.payments.forEach((item, index) => {
    if (newBody.payments) {
      newBody.payments.push({
        id: Number(item.id),
        payment_amount: Number(item.payment_amount),
        payment_method: item.payment_method,
      });
      if (item.payment_method == "transferencia") {
        newBody.payments[index].operation = Number(item.operation);
      }
    }
  });

  return newBody;
};
