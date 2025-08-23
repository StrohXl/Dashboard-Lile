import { deletePaymentById } from "../services";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return await deletePaymentById(Number(id));
}
