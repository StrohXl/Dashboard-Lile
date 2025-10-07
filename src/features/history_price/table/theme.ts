import { getTheme } from "@table-library/react-table-library/material-ui";
import { useTheme } from "@table-library/react-table-library/theme";

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
