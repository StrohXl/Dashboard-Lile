import LinkArrowLeft from "@/components/dashboard/LinkArrowLeft";

import FormClient from "@/features/clients/form/formClient";

export default function CreateClient() {
  return (
    <div>
      <div className="flex mb-10 items-center gap-12">
        <h2 className="text-5xl font-semibold  font-open_sans">
          Agregar cliente
        </h2>
        <LinkArrowLeft link="/dashboard/clients" />
      </div>
      <section>
        <FormClient />
      </section>
    </div>
  );
}
