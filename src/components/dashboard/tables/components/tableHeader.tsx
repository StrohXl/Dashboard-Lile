import {
  Header,
  HeaderRow,
  HeaderCell,
} from "@table-library/react-table-library/table";
import { HeaderCellSelect } from "@table-library/react-table-library/select";
import { ReactNode } from "react";

export default function TableHeader({
  actions = true,
  select = true,
  options,
}: {
  actions?: true;
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
