import { useEffect, useState } from "react";
import { TableWork } from "src/@types/works";
import { getRechangesByIdWork } from "src/api/rechange.api";
import {
  calculatePrice,
  formatArrayDate,
  getMonthAndYear,
  showNA,
} from "src/helpers/filters";
import { ApiRechange } from "src/hooks/useRechanges";
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
  id,
  rechanges: apiRechanges,
}: TableWork & { rechanges: ApiRechange[] }) {
  const [mounted, setMounted] = useState(false);
  const [rechanges, setRechanges] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (role === "Mecánico") {
        const { data } = await getRechangesByIdWork(id);
        if (data.rechanges) {
          setRechanges(data.rechanges);
          setMounted(true);
        } else {
          setMounted(true);
        }
      } else {
        setMounted(true);
      }
    };
    getData();
  }, [id, role]);

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
      <TableRow width={130}>
        {mounted && calculatePrice(hours, hourly, rechanges, apiRechanges)}
      </TableRow>
      {false && <button className="button_table">Abrir</button>}
    </div>
  );
}
