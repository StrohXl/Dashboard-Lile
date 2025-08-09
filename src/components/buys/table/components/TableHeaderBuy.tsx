import {
  Header,
  HeaderRow,
  HeaderCell,
} from "@table-library/react-table-library/table";
import { HeaderCellSelect } from "@table-library/react-table-library/select";
export default function TableHeaderBuy() {
  return (
    <Header>
      <HeaderRow>
        <HeaderCellSelect />
        <HeaderCell></HeaderCell>
        <HeaderCell>Fecha de Compra</HeaderCell>
        <HeaderCell>Productos</HeaderCell>
        <HeaderCell>Precio Total en $</HeaderCell>
        <HeaderCell>Precio Total en Bs</HeaderCell>
        <HeaderCell pinRight>Acciones</HeaderCell>
      </HeaderRow>
    </Header>
  );
}
