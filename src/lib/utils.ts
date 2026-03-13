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
  private offset = 0
  private frames
  private state = false
  
  constructor(v:number, frames:number=10) {
    this.value = v
    this.target = v
    this.previous = v
    this.frames = frames
  }
  update(p5:any) {
    this.state = Math.round(this.target) != Math.round(this.value)
    if(this.state) {
      // console.log(this.value, this.target)
      this.offset += 0.2 * (this.target - this.previous)
      this.value = this.value + this.offset
    } else {
      // lerp has finished, clean up
      this.previous = this.target
      this.offset = 0
    }
  }
  setTarget(t:number) {
    this.previous = this.target
    this.target = t 
  }
  get():number {
    return this.value
  }
}
