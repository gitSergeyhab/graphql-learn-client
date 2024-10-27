import { FC } from "react";
import { ContentLink } from "../content-link";
import { List } from "../list";
import { WriterItem } from "../../types/writer";
import style from "./style.module.css";
import { Button } from "../button";

export interface WriterListProps {
  writers: WriterItem[];
  onDelete?: (id: string) => void;
}

export const WriterList: FC<WriterListProps> = ({ writers, onDelete }) => {
  return (
    <List>
      {writers.map(({ id, birthYear, firstName, lastName }) => (
        <li className={style.listItem} key={id}>
          <ContentLink
            href={`/writers/${id}`}
            title={`${firstName} ${lastName} (${birthYear})`}
            size="large"
          />
          {onDelete && (
            <Button size="small" variant="danger" onClick={() => onDelete(id)}>
              X
            </Button>
          )}
        </li>
      ))}
    </List>
  );
};
