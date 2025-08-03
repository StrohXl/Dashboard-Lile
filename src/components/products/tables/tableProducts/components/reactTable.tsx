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
import { useProductsContext } from "../hooks/hooksTable";
import TypeProducts from "../types/typeProducts";
import {
  HeaderCellSelect,
  CellSelect,
  useRowSelect,
} from "@table-library/react-table-library/select";
import { Action, State } from "@table-library/react-table-library/types/common";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/material-ui";
import ContainerActions from "./containerActions";
import React, { useState } from "react";

export default function ReactTable() {
  const { data, pyDolar, setSelects } = useProductsContext();
  const [ids, setIds] = useState<number[]>([]);

  const handleExpand = (idItem: number) => {
    if (ids.includes(idItem)) {
      setIds(ids.filter((id) => id !== idItem));
    } else {
      setIds(ids.concat(idItem));
    }
  };

  const select = useRowSelect(
    { nodes: data.products },
    {
      onChange: onSelectChange,
    }
  );

  function onSelectChange(action: Action, state: State) {
    setSelects(state.ids);
  }
  const materialTheme = getTheme();
  const theme = useTheme([
    materialTheme,
    {
      Table: `grid-template-columns: auto 1fr 150px 150px 150px 250px 250px 100px !important;`,
    },
  ]);
  const nodes = { nodes: data ? data.products : [] };

  return (
    <Table data={nodes} select={select} theme={theme}>
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
              <HeaderCell>Acciones</HeaderCell>
            </HeaderRow>
          </Header>
          <Body>
            {tableList.map((item: TypeProducts) => (
              <Row item={item} onClick={() => handleExpand(item.id)}>
                <CellSelect item={item} />
                <Cell>
                  {item.name}
                </Cell>
                <Cell>{item.price}</Cell>
                <Cell>{pyDolar && item.price * pyDolar} Bs</Cell>
                <Cell>{item.stock}</Cell>
                <Cell>
                  {new Date(item.createdAT).toLocaleDateString("es-ES")}
                </Cell>
                <Cell>
                  {new Date(item.updatedAT).toLocaleDateString("es-ES")}
                </Cell>
                <Cell>
                  <ContainerActions id={item.id} />
                </Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
}
