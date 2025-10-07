import { getTheme } from "@table-library/react-table-library/material-ui";
import { useTheme } from "@table-library/react-table-library/theme";

export default function ClientTheme() {
  const materialTheme = getTheme();
  const theme = useTheme([
    materialTheme,
    {
      Table: `grid-template-columns:50px 1fr 1fr 1fr 120px !important;`,
    },
  ]);
  return theme;
}
