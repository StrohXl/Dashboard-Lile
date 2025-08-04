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
import {
  HeaderCellSelect,
  CellSelect,
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { Action, State } from "@table-library/react-table-library/types/common";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/material-ui";
import { FaChevronDown } from "react-icons/fa";
import React, { useState } from "react";
import { useDataContext } from "@/components/dashboard/hooks/useContextData";
import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import { TableBuysType } from "../typeTableBuys";

export default function ReactTableBuys() {
  const { data, pyDolar, setSelects } = useDataContext();
  const [ids, setIds] = useState<number[]>([]);

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
      Table: `grid-template-columns: auto  auto 250px 1fr 200px 200px 100px !important;`,
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
      {(tableList: TableBuysType[]) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCellSelect />
              <HeaderCell></HeaderCell>
              <HeaderCell>Fecha de Compra</HeaderCell>
              <HeaderCell>Productos</HeaderCell>
              <HeaderCell>Precio Total en $</HeaderCell>
              <HeaderCell>Precio Total en Bs</HeaderCell>
              <HeaderCell>Acciones</HeaderCell>
            </HeaderRow>
          </Header>
          <Body>
            {tableList.map((item: TableBuysType) => (
              <Row key={item.id} item={item}>
                <CellSelect item={item} />
                <Cell>
                  {item.products.map(
                    (producto, index) =>
                      index > 0 &&
                      index < 2 && (
                        <button
                          key={producto.id}
                          onClick={() => handleExpand(item.id)}
                          className="cursor-pointer p-1 transition-colors duration-300 hover:text-primary"
                        >
                          <FaChevronDown
                            className={`transition-transform duration-300 ${
                              ids.includes(item.id) && "rotate-x-180"
                            }`}
                          />
                        </button>
                      )
                  )}
                </Cell>
                <Cell>
                  {new Date(item.createdAT).toLocaleDateString("es-Es")}
                </Cell>
                <Cell>
                  <ul>
                    {item.products.map((product, index) => (
                      <li
                        key={product.id}
                        className={`${
                          index > 0 && !ids.includes(item.id) && "hidden"
                        }`}
                      >
                        {product.name} x {product.stock} ={" "}
                        {product.price * product.stock}$
                      </li>
                    ))}
                  </ul>
                </Cell>
                <Cell>
                  {item.products.reduce(
                    (total, item) => total + item.price * item.stock,
                    0
                  )}
                  $
                </Cell>
                <Cell>
                  {item.products.reduce(
                    (total, item) => total + item.price * item.stock,
                    0
                  ) * pyDolar}
                  Bs
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
