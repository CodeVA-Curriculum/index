export class Row {
  unit:number = 0
  description:string = $state("")
  sols:Standard[] = []
  elements:Element[] = []
  constructor(id) {
    this.unit = id
  }
}

export interface Element {
  title:string,
  url:string,
  thumbail:string,
  short:string,
  sols:Standard[]
}

export interface Standard {
  id:string,
  text:string,
  subs:string[]
}
