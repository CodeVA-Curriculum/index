export function dbObjTitles(objs:any[]):string {
  let s = objs[0].title
  for(const o of objs) {
    s += ', ' + o.title
  }
  return s
}

export class Lerp {
  private value = 0
  private previous = 0
  private target = 0
  private offset = 1
  private frames = 10
  
  constructor(v:number, frames:number=10) {
    this.value = v
    this.target = v
    this.previous = v
    this.frames = frames
  }
  update(p5:any) {
    if(this.offset < 1) {
      // console.log(this.value, this.target)
      this.offset += 1/this.frames // 0.02
      this.value = p5.lerp(this.previous, this.target, this.offset)
    } else {
      // lerp has finished, clean up
      this.previous = this.target
      this.offset = 1
      this.value = this.target
    }
  }
  setTarget(t:number) {
    this.previous = this.target
    this.target = t 
    this.offset = 0
  }
  get():number {
    return this.value
  }
}
