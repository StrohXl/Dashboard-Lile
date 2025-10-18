import { ReactNode } from "react";

import { HeaderCellSelect } from "@table-library/react-table-library/select";
import {
  Header,
  HeaderRow,
  HeaderCell,
} from "@table-library/react-table-library/table";

export default function TableHeader({
  actions = true,
  select = true,
  options,
}: {
  actions?: boolean;
  select?: boolean;
  options: ReactNode[] | string[];
}) {
  return (
    <Header>
      <HeaderRow className="!bg-white dark:!bg-gray-800 dark:!text-white">
        {select == true && <HeaderCellSelect />}
        {options?.map((item, index) => (
          <HeaderCell key={index}>{item}</HeaderCell>
        ))}
        {actions == true && (
          <HeaderCell
            pinRight
            className={`border-l-1 border-[#e0e0e0] right-0`}
          >
            <div className="text-center">Acciones</div>
          </HeaderCell>
        )}
      </HeaderRow>
    </Header>
  );
}
