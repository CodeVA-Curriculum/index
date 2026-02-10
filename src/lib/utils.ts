export function dbObjTitles(objs:any[]):string {
  let s = objs[0].title
  for(const o of objs) {
    s += ', ' + o.title
  }
  return s
}
