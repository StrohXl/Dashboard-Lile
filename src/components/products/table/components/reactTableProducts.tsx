"use client";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import TypeProducts from "../types/typeProducts";
import {
  HeaderCellSelect,
  CellSelect,
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { Action, State } from "@table-library/react-table-library/types/common";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/material-ui";
import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import { useDataContext } from "@/components/dashboard/hooks/useContextData";
import { TypeData } from "@/types/data";

export default function ReactTable({
  pyDollar,
  data,
}: {
  data: TypeData;
  pyDollar: number | undefined;
}) {
  const { setSelects, ids, setIds } = useDataContext();

  
  const handleExpand = (idItem: number) => {
    if (ids.includes(idItem)) {
      setIds(ids.filter((id) => id !== idItem));
    } else {
      setIds(ids.concat(idItem));
    }
  };

  const select = useRowSelect(
    { nodes: data.data },
    {
      onChange: onSelectChange,
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  function onSelectChange(action: Action, state: State) {
    setSelects(state.ids);
  }
  const materialTheme = getTheme();
  const theme = useTheme([
    materialTheme,
    {
      Table: `grid-template-columns: auto 1fr 150px 150px 150px 200px 200px 100px !important;`,
      BaseCell: `
      &:nth-of-type(8){
      border-left: 1px solid #f0f0f0;
      right:0px;
      }`,
      BaseRow: ``,
    },
  ]);
  const nodes = { nodes: data ? data.data : [] };

  return (
    <Table
      layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
      data={nodes}
      select={select}
      theme={theme}
    >
      {(tableList: TypeProducts[]) => (
        <>
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
          <Body>
            {tableList.map((item: TypeProducts) => (
              <Row
                key={item.id}
                item={item}
                onClick={() => handleExpand(item.id)}
              >
                <CellSelect item={item} />
                <Cell>{item.name}</Cell>
                <Cell>{item.price}</Cell>
                <Cell>{pyDollar && item.price * pyDollar} Bs</Cell>
                <Cell>{item.stock}</Cell>
                <Cell>
                  {new Date(item.createdAT).toLocaleDateString("es-ES")}
                </Cell>
                <Cell>
                  {new Date(item.updatedAT).toLocaleDateString("es-ES")}
                </Cell>
                <Cell pinRight>
                  <ContainerActions
                    data={data}
                    apiUrl="/products"
                    id={item.id}
                  />
                </Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
}
