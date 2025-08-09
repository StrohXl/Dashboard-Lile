import { TypeData } from "@/types/data";
import { State } from "@table-library/react-table-library/types/common";
import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
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

export const functionSelects = ({
  data,
  setSelects,
}: {
  data: TypeData;
  setSelects: (value: number[]) => void;
}) => {
  const select = useRowSelect(
    { nodes: data.data },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );
  return select;
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
