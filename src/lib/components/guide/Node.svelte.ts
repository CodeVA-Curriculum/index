import type { Node as DbNode } from '$lib/server/db/schema'
import { Lerp } from '$lib/utils'

export class Node {
  db:DbNode
  complete:boolean = $state(false)
  selected:boolean = $state(false)
  highlighted:boolean = $state(false)
  x = 0; y = 0;
  // radius = null
  radius = new Lerp(100, 40)
  width = 50
  hover = false
  scale = 1
  icon:any = false;
  constructor(obj:DbNode) {
    this.db = obj
    this.x = obj.x/2
    this.y = obj.y/2
  }
  setup(p5, font) {
    const fontData = this.getWidth(p5, font)
    const minDiameter = fontData.lines * 20 + 175
    let w = Math.ceil(fontData.w) > minDiameter ? Math.ceil(fontData.w) : minDiameter
    this.width = w
    if(this.db.type == "cache") { w = 100 }
    this.radius = new Lerp(Math.round(w), 5)
    if(this.db.type == "cache") {
      p5.loadImage("/trail-guides/" + this.db.path.substring(0, this.db.path.lastIndexOf('/')) + "/icon.png").then((img) => {
        this.icon = img
      })
    }
  }
  draw(p5:any) {
    // this.radius = this.hover ? 100 : 50;
    // if(this.hover) {
    //   this.radius.setTarget(this.width * 1.5)
    // } else {
    //   this.radius.setTarget(this.width)
    // }
    this.radius.update(p5)
    let w = this.radius.get()
    let x = this.x*this.scale
    let y = this.y*this.scale
    if(this.selected) {
      p5.fill(0, 255, 0)
    }
    if(this.highlighted) {
      p5.stroke(255, 0, 0)
      p5.strokeWeight(8)
    }
    p5.circle(x, y, w)
    if(this.selected) { p5.fill(255) }
    if(this.highlighted) { p5.stroke(0); p5.strokeWeight(1)}
    // this.debug(p5)
    if(this.db.type == "cache" && this.icon) {
      let iconScale = 0.50
      if(this.hover) {
        p5.text(this.db.title, x-150/2, y, 150)
        let ix = x + w/2 * Math.cos(45 * p5.PI/180)
        let iy = y + w/2 * Math.sin(45 * p5.PI/180)
        p5.circle(ix, iy, 100)
        // iconScale = 0.25
        p5.image(this.icon, ix-100*iconScale/2, iy-100*iconScale/2, 100*iconScale, 100*iconScale)
      } else {
        x = x-100*iconScale/2
        y = y - 100 * iconScale / 2
        p5.image(this.icon, x, y, 100*iconScale, 100*iconScale)
      }
    } else if(this.db.type != "cache") {
      p5.text(this.db.title, x-150/2, y, 150)
    }
  }
  debug(p5:any) {
    
    if(this.x && this.y) {
      p5.text(this.db.title, (this.x+this.width/1.5)*this.scale, this.y*this.scale)
      // p5.text(this.hover, (this.x+this.width/1.5)*this.scale, this.y*this.scale+10)
      p5.text(this.radius.get(), (this.x+this.width/1.5)*this.scale, this.y*this.scale+10)
      p5.text((this.x+this.width/1.5) + ", " + this.y, (this.x+this.width/1.5)*this.scale, this.y*this.scale+20)
    } else {
      console.warn("Tried to render "+this.db.path+" to map, but node is not present in map.canvas!")
    }
  }
  setWidth(p5:any, font:any) {
    const { w } = p5.getWidth(p5, font)
    this.width = w
  }
  setHover(hovering:boolean) {
    if(this.hover != hovering) {
      this.hover = hovering || this.selected
      const lowerTarget = this.db.type == 'cache' ? 100 : this.width
      this.radius.setTarget(this.hover ? this.width * 1.5 : lowerTarget)
    }
  }
  getWidth(p5:any, font:any) {
    // find the longest series of words that will be displayed on one line (<= 150px)
    let words = this.db.title.split(' ')
    const lengths:number[] = []
    let lineHeight = -1;
    for(let i=0;i<words.length;i++) {
      words[i] += ' '
      let box = font.textBounds(words[i], this.x/2, this.y/2, 28)
      lengths.push(box.w)
      if(box.h > lineHeight) { lineHeight = box.h * 2 }
    }
    let lines = [{ text: '', lineLength: 0 }]
    let linesIndex = 0
    for(let i=0;i<words.length;i++) {
      if(lines[linesIndex].text == "" || lines[linesIndex].lineLength + lengths[i] < 150) {
        lines[linesIndex].text += words[i]
        lines[linesIndex].lineLength += lengths[i]
      } else {
        lines.push({
            text: words[i],
            lineLength: lengths[i]
        })
        linesIndex += 1
      }
    }

    let maxLength = -1
    let index = 0
    for(let i=0;i<lines.length;i++) {
      if(maxLength < lines[i].lineLength) {
        maxLength = lines[i].lineLength
        index = i
      }
    }

    // width of longest word is in `maxLength`, now need to scale the width based on how high or low that word is in the circle using `index`
    const offsetY = (index - (lines.length -1) / 2) * lineHeight
    // console.log(this.frontmatter.title, offsetY)
    return {
      lines: lines.length,
      w: Math.sqrt(offsetY*offsetY + (maxLength)*(maxLength)) + 30    
    }
  }
  setFonts() {
    
  }
  toggleSelect():boolean {
    console.log("Selected", this.db.title)
    this.selected = !this.selected
    return this.selected
  }
}

export class NodeInGroup {
  obj:Node
  optional:boolean = $state(false)
  index:number = -1
  constructor(node:Node, index:number, optional:boolean) {
    this.obj = node
    this.optional = optional
    this.index = index
  }
  
}
