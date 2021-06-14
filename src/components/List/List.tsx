// Style
import { useEffect, useState } from "react";
import "./List.css";
import ListItem, { Item } from "./ListItem/ListItem";

export interface ListProps {
  title: string;
  emptyMessage: string;
  items: Item[];
  onUpdate: (client: Item) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function List({
  title,
  items,
  emptyMessage,
  onUpdate,
  onDelete,
}: ListProps) {
  const [currentItems, setCurrentItems] = useState(items);

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  return currentItems.length > 0 ? (
    <section className="panel_column list">
      <h1 className="list_title">{title}</h1>
      <div className="list_items">
        {currentItems.map((item, idx) => (
          <ListItem
            key={`item-${item}-${idx}`}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  ) : (
    <section className="panel_column list">
      <h1 className="list_title">{emptyMessage}</h1>
    </section>
  );
}
