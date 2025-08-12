import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/material-ui";

export default function ThemeTableProducts() {
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
  return theme;
}
