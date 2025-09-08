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
        <HeaderCell>Fecha de Compra</HeaderCell>
        <HeaderCell>Productos</HeaderCell>
        <HeaderCell><div className="text-center" >Precio</div></HeaderCell>
        <HeaderCell pinRight><div className="text-center" >Acciones</div></HeaderCell>
      </HeaderRow>
    </Header>
  );
}
