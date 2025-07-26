import { FieldError } from "react-hook-form";
export default function MessageError({
  error,
}: {
  error: FieldError | undefined;
}) {
  if (error) {
    return <p className="text-sm mt-1 text-red-600 !font-roboto">{error.message}</p>;
  }
}
