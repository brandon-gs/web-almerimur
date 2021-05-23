import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "src/components";
// Svgs
import { ReactComponent as EditIcon } from "../../../assets/svg/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/svg/delete.svg";
// Styles
import "./ListItem.css";

export interface Item {
  name: string;
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
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setCurrentItem(item);
  }, [item]);

  useEffect(() => {
    setValue(item.name);
  }, [item.name]);

  const enableEditMode = () => setEditMode(true);
  const disableEditMode = () => setEditMode(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = async () => {
    const newItem: Item = { id: item.id, name: value };
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
          <EditIcon onClick={enableEditMode} />
          <DeleteIcon fill="#1A8D8C" onClick={handleDelete} />
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
          <button className="button" onClick={handleClick}>
            Guardar
          </button>
        </>
      )}
    </div>
  );
}
