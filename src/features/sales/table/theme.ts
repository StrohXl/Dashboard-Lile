import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/material-ui";

export function ThemeMaterialSales() {
  const materialTheme = getTheme();
  const theme = useTheme([
    materialTheme,
    {
      Table: `grid-template-columns: 50px 150px 180px 170px 170px 1fr 120px !important;`,
      BaseCell: `
      &:nth-of-type(7){
      right:0px;
      border-left:1px solid #f0f0f0;
      }
      `,
    },
  ]);
  return theme;
}
