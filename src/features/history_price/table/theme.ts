import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/material-ui";

export default function ThemeTableHistory() {
  const materialTheme = getTheme();
  const theme = useTheme([
    materialTheme,
    {
      Table: `grid-template-columns: 100px 250px !important;`,
    },
  ]);
  return theme;
}
