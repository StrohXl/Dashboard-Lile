"use client";

import { Client } from "@/app/api/clients/models/client.model";
import { use } from "react";

export default function TableClients({ data }: { data: Promise<Client[]> }) {
  const clients = use(data);
  return (
    <ul>
      {clients.map((item) => (
        <li key={item.id} >{item.name}</li>
      ))}
    </ul>
  );
}
