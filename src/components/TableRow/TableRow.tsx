import "./TableRow.css";

interface TableRowProps {
  children?: React.ReactNode | string;
  header?: boolean;
  width?: number;
}

export default function TableRow({
  width = 180,
  children,
  header,
}: TableRowProps) {
  const classHeader = header ? "tablerow_header" : "tablerow_text";

  return (
    <div className="tablerow" style={{ width, minWidth: width }}>
      {typeof children === "string" ? (
        <p className={classHeader}>{children}</p>
      ) : (
        children
      )}
    </div>
  );
}
