import { TableWork } from "src/@types/works";
import {
  calculatePrice,
  formatArrayDate,
  getMonthAndYear,
  showNA,
} from "src/helpers/filters";
import TableRow from "../TableRow/TableRow";

export default function TableRowWork({
  role,
  userName,
  date,
  machine,
  project,
  client,
  hours,
  hourly,
  checked,
}: TableWork) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "16px 16px",
        color: checked ? "var(--gray)" : "#a5a8aa",
      }}
    >
      <input
        style={{ marginRight: 24 }}
        type="checkbox"
        checked={checked}
        disabled
      />
      <TableRow>{showNA(role)}</TableRow>
      <TableRow>{showNA(userName)}</TableRow>
      <TableRow>
        {showNA(date) !== "N/A"
          ? getMonthAndYear(formatArrayDate(date))
          : "N/A"}
      </TableRow>
      <TableRow>{showNA(machine)}</TableRow>
      <TableRow>{showNA(project)}</TableRow>
      <TableRow>{showNA(client)}</TableRow>
      <TableRow width={130}>{calculatePrice(hours, hourly)}</TableRow>
      <button className="button_table">Abrir</button>
    </div>
  );
}
