export class Todo {
  id:             number;
  active:         boolean;
  title:          string;
  type:           string;
  description:    string;
  init_date:      number;
  completed_date: number = 0;
}