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
        <HeaderCell>Fecha de Venta</HeaderCell>
        <HeaderCell>Cliente</HeaderCell>
        <HeaderCell>Estado</HeaderCell>
        <HeaderCell>Deuda</HeaderCell>
        <HeaderCell>Productos</HeaderCell>
        <HeaderCell>Pagos</HeaderCell>
        <HeaderCell>Precio Total en $</HeaderCell>
        <HeaderCell>Precio Total en Bs</HeaderCell>
        <HeaderCell pinRight><div className="text-center" >Acciones</div></HeaderCell>
      </HeaderRow>
    </Header>
  );
}
