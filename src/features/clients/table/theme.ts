import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/material-ui";

export default function PaymentsTheme() {
  const materialTheme = getTheme();
  const theme = useTheme([
    materialTheme,
    {
      Table: `grid-template-columns:50px 1fr 1fr 1fr 1fr 120px !important;`,
    },
  ]);
  return theme;
}
