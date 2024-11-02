export interface IList {
  id: number;
  listName: string;
  dateCreated: string;
  listAuthor: string;
  members: string[];
  items: IListItem[];
  isArchived?: boolean;
}

export interface IListItem {
  isCompleted: boolean;
  itemName: string;
  id: number;
}
