import { State } from "@table-library/react-table-library/types/common";

export const handleExpand = ({
  idItem,
  ids,
  setIds,
}: {
  ids: number[];
  idItem: number;
  setIds: (value: number[]) => void;
}) => {
  if (ids.includes(idItem)) {
    setIds(ids.filter((id) => id !== idItem));
  } else {
    setIds(ids.concat(idItem));
  }
};

export const onSelectChange = ({
  state,
  setSelects,
}: {
  state: State;
  setSelects: (value: number[]) => void;
}) => {
  setSelects(state.ids);
};
