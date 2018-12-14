export interface ITodo {
  $key: string,
  title: string,
  content: {checked: boolean, content: string}[]
}
