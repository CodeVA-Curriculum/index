import type { Node as DbNode } from '$lib/server/db/schema'
import { Lerp } from '$lib/utils'

export const HIGHLIGHT_COLOR = "#22A5E6"
export const STROKE_WEIGHT= 8
export const BACKGROUND_COLOR = "#ffffff"
export const HOVER_COLOR = "ffffff"
const SCALE = 1.5 // bigger = less spacing

export class Node {
  db:DbNode
  // status
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
  stroke = STROKE_WEIGHT;
  constructor(obj:DbNode) {
    this.db = obj
    this.x = obj.x/SCALE
    this.y = obj.y/SCALE
    this.complete = obj.status?.length > 0 ? obj.status[0].complete : false
  }
  async setup(p5, font) {
    const fontData = this.getWidth(p5, font)
    const minDiameter = fontData.lines * 20 + 175
    let w = Math.ceil(fontData.w) > minDiameter ? Math.ceil(fontData.w) : minDiameter
    this.width = w
    if(this.db.type == "cache") { w = 100 }
    this.radius = new Lerp(Math.round(w), 5)
    if(this.db.type == "cache") {
       await p5.loadImage("/trail-guides/" + this.db.path.substring(0, this.db.path.lastIndexOf('/')) + "/icon.png").then((img) => {
        this.icon = img
      })
    }
    this.idle = p5.createGraphics(this.width*1.125, this.width*1.125)
    this.idle.strokeWeight(STROKE_WEIGHT)
    this.idle.circle(this.idle.width/2, this.idle.width/2, Math.round(this.width))
    this.highlight = p5.createGraphics(this.width * 1.25, this.width * 1.25)
    this.highlight.stroke(HIGHLIGHT_COLOR)
    this.highlight.strokeWeight(STROKE_WEIGHT * 2)
    this.highlight.circle(this.highlight.width/2, this.highlight.width/2, Math.round(this.width))
    if(this.db.status.date) { this.lastUpdated = this.db.status.date }
    // make shadow
    // this.shadow = makeShadow(p5, 100, 10, "#000000", 0.9)
  }
  draw(p5:any) {
    this.radius.update(p5)
    let w = this.radius.get()
    let x = this.x*this.scale
    let y = this.y*this.scale
    let pastFill
    let styleFlag = false
    switch (this.highlighted) {
      case true:
        p5.image(this.highlight, x, y, w, w)
        break
      default:
        p5.image(this.idle, x, y, w, w)
    }
    // p5.circle(x, y, w)
    // if(styleFlag) {
    //   p5.stroke(0)
    //   p5.strokeWeight(STROKE_WEIGHT)
    // }

    if(this.db.type == "cache" && this.icon) {
      let iconScale = 0.50
      if(this.hover) {
        let ix = x + w/2 * Math.cos(45 * p5.PI/180)
        let iy = y + w/2 * Math.sin(45 * p5.PI/180)
        p5.circle(ix, iy, 100)
        p5.text(this.db.title, x-150/2, y, 150)
        // iconScale = 0.25
        p5.image(this.icon, ix, iy, 100*iconScale, 100*iconScale)
      } else {
        p5.image(this.icon, x, y, 100*iconScale, 100*iconScale)
      }
    } else if(this.db.type != "cache" || (this.db.type == 'cache' && this.hover)) {
      p5.text(this.db.title, x-150/2, y, 150)
    }
    if(this.complete) {
      // Draw checkmark
      p5.image(this.completeImage, this.x, this.y)
    }
    // p5.image(this.shadow, x, y)
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
    if(!this.db.title) { console.log(this)}
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
  setSelect(status:boolean) {
    this.selected = status
  }
  highlight() {
    
  }
  dehighlight() {
    
  }
}
export function  getCompleteImage(p5:any, w:number,h:number) {
    const img = p5.createGraphics(w,h)
    let cx = w*.37; let cy=h*.75;
    img.fill(0)
    img.strokeWeight(h/4)
    img.line(cx, cy, cx - w/4, cy - w/4)
    img.line(cx, cy, cx + w/2, cy - w/2)
    img.stroke('rgb(72, 199, 116)');
    img.strokeWeight(h/5)
    img.line(cx, cy, cx - w/4, cy - w/4)
    img.line(cx, cy, cx + w/2, cy - w/2)
    return img
  }

export function getDefaultNodeStyle() {
  return {
    stroke: STROKE_WEIGHT,
    fill: BACKGROUND_COLOR,
    highlight: HIGHLIGHT_COLOR,
    hover: HOVER_COLOR
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
export function makeShadow(p5, radius, sigma, shadowColor, opacity) {
  // Gaussian goes to approx. 0 at 3sigma
  // away from the mean; pad image with
  // 3sigma on all sides to give space
  const newW = radius*2 + 6 * sigma;
  const newH = radius*2 + 6 * sigma;
  const g = p5.createGraphics(newW, newH);
  
  g.fill(0)
  g.circle(g.width/2, g.height/2, 40);
  g.filter(g.BLUR, sigma);
  
  // const shadow = g.get();
  // const c = p5.color(shadowColor);
  // shadow.loadPixels();
  // const numVals = 4 * shadow.height * shadow.height
  // for (let i = 0; i < numVals; i+=4) {
  //   shadow.pixels[i + 0] = c.levels[0];
  //   shadow.pixels[i + 1] = c.levels[1];
  //   shadow.pixels[i + 2] = c.levels[2];
  //   shadow.pixels[i + 3] *= opacity;
  // }
  // shadow.updatePixels();
  
  // g.remove();
  return g;
}
