import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
  donut: DonutTable;
}

export interface DonutTable {
  id: Generated<number>;
  name: string;
  rating: number | null;
  review: string | null;
}

export type Donut = Selectable<DonutTable>;
export type NewDonut = Insertable<DonutTable>;
export type DonutUpdate = Updateable<DonutTable>;
