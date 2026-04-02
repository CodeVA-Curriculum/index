export class Camera {
    
    p5:any
    x:number = 0; y:number = 0;
    lx:number = 0; ly:number = 0;
    ix:number; iy:number
    transform:Transform = { x: 0, y: 0, scale: 1}
    lerpTransform:Transform = { x: 0, y: 0, scale: 1}
    matrix:DOMMatrix;
    offsetX:number = 0; offsetY:number = 0
    moving:boolean = false

    constructor(p5:any, scale:number) {
        this.p5 = p5;
        this.ix = this.p5.width/2
        this.iy = this.p5.height/2
        // this.setCenter(1)

        this.p5.push();
        this.p5.translate(this.transform.x, this.transform.y);
        this.p5.scale(this.transform.scale)
        this.matrix = this.p5.drawingContext.getTransform()
        this.p5.pop();
    }

    offsetTransform(coords:Coords):boolean {
        this.transform.x += coords.x
        this.transform.y += coords.y
        return false
    }

    display(cb:any) {
        this.lerpTransform = {
            x: this.lerpTransform.x + ((this.transform.x - this.lerpTransform.x)/4),
            y: this.lerpTransform.y + ((this.transform.y - this.lerpTransform.y)/4),
            scale: this.lerpTransform.scale + ((this.transform.scale - this.lerpTransform.scale)/4)
        }
        this.p5.push()
        this.p5.translate(-this.lerpTransform.x, -this.lerpTransform.y)
        this.p5.scale(this.lerpTransform.scale)
        cb();
        this.matrix = this.p5.drawingContext.getTransform()
        this.p5.pop()

        // this.p5.fill('rgba(0, 0, 0, 0')
        // this.p5.circle(this.p5.width/2, this.p5.height/2, 10)
        // this.p5.line(this.p5.width/2, this.p5.height/2 - 15, this.p5.width/2, this.p5.height/2 + 15)
        // this.p5.line(this.p5.width/2 + 15, this.p5.height/2, this.p5.width/2 - 15, this.p5.height/2)
        // this.p5.fill(0)
    }
    zoom(absoluteLocation:Coords, deltaZoom:number, absolute:boolean) {
        let factor;
        if(!absolute) {
            factor = deltaZoom
        } else {
            factor = deltaZoom/this.transform.scale
        }
        this.transform.scale = this.transform.scale * factor;
        this.transform.x = -(absoluteLocation.x - (absoluteLocation.x * factor) + (-this.transform.x * factor));
        this.transform.y = -(absoluteLocation.y - (absoluteLocation.y * factor) + (-this.transform.y * factor));
    }

    moveCenterTo(x:number, y:number) {
        const absolutePosition = { x: x, y: y }
        console.log("Got call to move to", absolutePosition)
        // figure out transformation needed to move camera to correct screen coordinate
        const dx = this.ix - absolutePosition.x
        const dy = this.iy - absolutePosition.y
        this.transform.x -= dx
        this.transform.y -= dy
    }
    getLocalCoords(coords:Coords) {
        return getLocalCoords(this.p5, this.matrix, coords)
    }
    getScreenCoords(coords:Coords) {
        const screenCoords = this.matrix
        .transformPoint(
            new DOMPoint(
                coords.x * this.p5.pixelDensity(),
                coords.y * this.p5.pixelDensity()
            )
        );
        return screenCoords
    }
    setCenter(factor:number) {
        this.ix = this.p5.displayWidth * factor
        this.iy = this.p5.displayHeight * factor
    }
}

export function getLocalCoords(p5:any, matrix:DOMMatrix, screenCoords:Coords) {
    // from https://www.reddit.com/r/p5js/comments/jo7ucf/clicking_on_a_translated_scaled_and_rotated_shape/
    const localCoord = matrix
        .inverse()
        .transformPoint(
            new DOMPoint(
                screenCoords.x * p5.pixelDensity(),
                screenCoords.y * p5.pixelDensity()
            )
        );
    return localCoord
}
