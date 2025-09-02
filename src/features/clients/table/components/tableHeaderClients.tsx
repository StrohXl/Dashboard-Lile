import {
  Header,
  HeaderRow,
  HeaderCell,
} from "@table-library/react-table-library/table";
import { HeaderCellSelect } from "@table-library/react-table-library/select";

export default function TableHeaderClients() {
  return (
    <Header>
      <HeaderRow>
        <HeaderCellSelect />
        <HeaderCell>Nombre</HeaderCell>
        <HeaderCell>Apellido</HeaderCell>
        <HeaderCell>C.I</HeaderCell>
        <HeaderCell><div className="text-center" >Acciones</div></HeaderCell>
      </HeaderRow>
    </Header>
  );
}
