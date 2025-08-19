import {
  Header,
  HeaderRow,
  HeaderCell,
} from "@table-library/react-table-library/table";
import { HeaderCellSelect } from "@table-library/react-table-library/select";

function TableHeaderProducts() {
  return (
    <Header>
      <HeaderRow>
        <HeaderCellSelect />
        <HeaderCell>Producto</HeaderCell>
        <HeaderCell>Precio en $</HeaderCell>
        <HeaderCell>Precio en Bs</HeaderCell>
        <HeaderCell>Existentes</HeaderCell>
        <HeaderCell>Fecha de Creacion</HeaderCell>
        <HeaderCell>Fecha de Actualizacion</HeaderCell>
        <HeaderCell pinRight>Acciones</HeaderCell>
      </HeaderRow>
    </Header>
  );
}

export default TableHeaderProducts;
