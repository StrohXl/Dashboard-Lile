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
        <HeaderCell><div className="text-center" >Precio</div></HeaderCell>
        <HeaderCell>Deuda</HeaderCell>
        <HeaderCell pinRight>
          <div className="text-center">Acciones</div>
        </HeaderCell>
      </HeaderRow>
    </Header>
  );
}
