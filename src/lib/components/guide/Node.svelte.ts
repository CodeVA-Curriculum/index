import type { Node as DbNode } from '$lib/server/db/schema'
import { Lerp } from '$lib/utils'

export class Node {
  db:DbNode
  complete:boolean = $state(false)
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
    const w = Math.ceil(this.getWidth(p5, font))
    this.width = w
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
    p5.circle(x, y, w)
    this.debug(p5)
    if(this.db.type == "cache" && this.icon) {
      let iconScale = 0.5
      if(this.hover) {
        x = x + w/2 * Math.cos(45 * p5.PI/180)
        y = y + w/2 * Math.sin(45 * p5.PI/180)
        p5.circle(x, y, 50)
        iconScale = 0.25
      }
      x = x-this.width*iconScale/2
      y = y - this.width * iconScale / 2
      p5.image(this.icon, x, y, this.width*iconScale, this.width*iconScale)
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
    this.width = p5.getWidth(p5, font)
  }
  setHover(hovering:boolean) {
    if(this.hover != hovering) {
      this.hover = hovering
      this.radius.setTarget(this.hover ? this.width * 1.5 : this.width)
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
    return Math.sqrt(offsetY*offsetY + (maxLength)*(maxLength)) + 30
  }
  setFonts() {
    
  }
}

export class NodeInGroup {
  obj:Node
  optional:boolean = $state(false)
  constructor(node:Node, optional:boolean) {
    this.obj = node
    this.optional = optional
  }
  
}
