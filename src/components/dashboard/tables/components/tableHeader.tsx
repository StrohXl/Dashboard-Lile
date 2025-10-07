
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
      <HeaderRow>
        {select == true && <HeaderCellSelect />}
        {options?.map((item, index) => (
          <HeaderCell key={index}>{item}</HeaderCell>
        ))}
        {actions == true && (
          <HeaderCell pinRight>
            <div className="text-center">Acciones</div>
          </HeaderCell>
        )}
      </HeaderRow>
    </Header>
  );
}
