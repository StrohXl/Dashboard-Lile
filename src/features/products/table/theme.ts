import { getTheme } from "@table-library/react-table-library/material-ui";
import { useTheme } from "@table-library/react-table-library/theme";

export default function ThemeTableProducts() {
  const materialTheme = getTheme();
  const theme = useTheme([
    materialTheme,
    {
      Table: `grid-template-columns: auto 1fr 200px 150px 200px 200px 120px !important;`,
      BaseCell: `
      &:nth-of-type(7){
      border-left: 1px solid #f0f0f0;
      right:0px;
      }`,
      BaseRow: ``,
    },
  ]);
  return theme;
}
