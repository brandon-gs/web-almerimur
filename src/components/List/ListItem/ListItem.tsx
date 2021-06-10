import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "src/components";
// Svgs
import { ReactComponent as EditIcon } from "../../../assets/svg/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/svg/delete.svg";
// Styles
import "./ListItem.css";

export interface Item {
  name: string;
  price?: string;
  id: string;
}

export interface ListItemProps {
  item: Item;
  onUpdate: (item: Item) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function ListItem({ item, onUpdate, onDelete }: ListItemProps) {
  const [currentItem, setCurrentItem] = useState(item);
  const [value, setValue] = useState(item.name);
  const [price, setPrice] = useState(item.price ? item.price : "");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setCurrentItem(item);
  }, [item]);

  useEffect(() => {
    setValue(item.name);
  }, [item.name]);

  useEffect(() => {
    setPrice(item.price ? item.price : "");
  }, [item.price]);

  const enableEditMode = () => setEditMode(true);
  const disableEditMode = () => setEditMode(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = async () => {
    const newItem: Item = { id: item.id, name: value, price };
    await onUpdate(newItem);
    disableEditMode();
  };

  const handleDelete = async () => {
    await onDelete(item.id);
  };

  return (
    <div className="list_item">
      {!editMode && (
        <>
          <p>{currentItem.name}</p>
          {currentItem.price && <p>{currentItem.price} €</p>}
          <EditIcon
            onClick={enableEditMode}
            style={{ minWidth: 25.6, minHeight: 40 }}
          />
          <DeleteIcon
            fill="#1A8D8C"
            onClick={handleDelete}
            style={{ minWidth: 25.6, minHeight: 40 }}
          />
        </>
      )}
      {editMode && (
        <>
          <Input
            value={value}
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
          />
          {item.price && (
            <Input
              value={price}
              type="text"
              name="price"
              placeholder="Precio"
              onChange={(e) => setPrice(e.target.value)}
            />
          )}
          <button
            className="button"
            onClick={handleClick}
            style={{ minWidth: 88 }}
          >
            Guardar
          </button>
        </>
      )}
    </div>
  );
}
