export interface ITodo {
  $key: string,
  title: string,
  userid: string,
  content: {checked: boolean, content: string}[]
}
