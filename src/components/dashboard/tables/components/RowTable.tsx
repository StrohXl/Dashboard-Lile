import { ReactNode } from "react";

import { Row, TableNode } from "@table-library/react-table-library/table";

export default function RowTable({
  id,
  item,
  children,
  selects,
}: {
  id: number;
  item: TableNode;
  children: ReactNode;
  selects: number[];
}) {
  return (
    <Row
      item={item}
      className={`${
        selects.includes(id)
          ? "!bg-gray-200 dark:!bg-gray-700 !text-gray-800 dark:!text-white"
          : "!bg-white dark:!bg-gray-800"
      }`}
    >
      {children}
    </Row>
  );
}
