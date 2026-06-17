import { visit } from 'unist-util-visit'
import {toHtml} from 'hast-util-to-html'
import {remove} from 'unist-util-remove'
import {h} from 'hastscript'
import { linear } from 'svelte/easing'

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
export interface Question {
    name:string,
    text:string,
    options:Option[],
    completed:boolean
}
export interface Prompt {
    title:string,
    text:string,
    response:string,
    completed:boolean
}
export interface Option {
    text:string,
    feedback?:string,
    correct:boolean
}

export interface Feedback {
    onCorrect?:string,
    onIncorrect?:string
}

// This directive takes the slotted content of the custom element and generates props to insert into the PracticeQuestion component
export function prompt(tree:any, path:string):object[] {
    let content:Prompt[] = []
    visit(tree, function (node:any) {
        let index = 0
        if(node.tagName == 'prompt' && node.children) {
            const obj:Prompt= { title: 'No title given', text: '', response: '', completed: false }
            console.log("Found prompt at", path)
            // generate hast tree for practice questions from children of practice element
            node.tagName = 'practice-prompt'
            if(node.properties.title) { obj.title= node.properties.title}
            for(let i=0;i<node.children.length;i++) {
                const child = node.children[i]
                obj.text += "\n"+toHtml(child)
            }
            content.push(obj)
            node.properties.title = obj.title
            node.properties.text = obj.text
            node.properties.prompt = JSON.stringify(obj)
            node.properties.path = path
            node.properties.index = index
            index++

            node.children = []
        }
    })
    return content
}
export function practice(tree:any, path:string):object[] {
    let content:Question[] = []
    visit(tree, function (node:any) {
        let index = 0
        if(node.tagName == 'practice-question' && node.children) {
            const obj:any = { text: '' }
            console.log("Found practice question at", path)
            // generate hast tree for practice questions from children of practice element
            node.tagName = 'practice-question'
            if(node.properties.title) { obj.title = node.properties.title}
            for(let i=0;i<node.children.length;i++) {
                const child = node.children[i]
                if(child.tagName == 'p') { // this is content that comes before the options
                    obj.text += toHtml(child)
                }
                if(child.tagName == 'ul' || child.tagName == 'ol') {
                    obj.options = getOptions(child)
                }
                // Feedback
                if(child.tagName == 'feedback') {
                    // console.log("Found feedback")
                    // console.log(child)
                }
            }
            obj.completed = false
            content.push(obj)
            node.properties.title = obj.title
            node.properties.text = obj.text
            node.properties.question = JSON.stringify(obj)
            node.properties.path = path
            node.properties.index = index
            index++

            node.children = []
            // remove(tree, (node:any) => node.tagName == 'practice-question')
        }
    })
    return content
}

function getOptions(node:any):Option[] {
    let options:Option[] = []
    for(let i=0;i<node.children.length;i++) {
        let opt:Option;
        if(node.children[i].tagName == 'li') {
            // Found a list item, time to parse its children/peers
            opt = getOption(node.children[i])
            options.push(opt)
        }
    }
    // console.log("#### Got options ####")
    // console.log(options)
    return options
}

// It's either something like this

// > li
//     > text
//     > text (the text I'm looking for)
//     > text

// ...or something like this:

// > li
//     > text
//     > p
//         > the content I'm looking for
//     > feedback
//     > text


function getOption(node:any):Option {
    let option:Option = { text: '', correct: false }
    let foundInput = false
    let feedback = ''
    // Each list item should include at least an input and a text child element
    const children = node.children.filter((obj:any) => {
        if(obj.tagName == 'input') {
            option.correct = obj.properties.checked? true : false
            foundInput = true
        }
        if(obj.tagName == 'feedback') {
            feedback += toHtml(obj.children)
        }
        return obj.tagName != 'feedback' && obj.tagName != 'input'
    })
    if(!foundInput) {
        // the input is in a paragraph tag in `children`
        const paragraph = children.filter((obj:any) => {
            return obj.tagName == 'p' && obj.children
        })
        // console.log("Found <p> with children:",paragraph[0].children.length)
        // console.log(paragraph[0].children[i])
        const text = paragraph[0].children.filter((obj:any) => {
            if(obj.tagName == 'input') {
                foundInput = true
                option.correct = obj.properties.checked? true : false
            }
            if(obj.tagName == 'feedback') {
                feedback += toHtml(obj.children)
            }
            return obj.tagName != 'input'
        })
        option.text += toHtml(text)
    } else {
        option.text += toHtml(children)
    }
    option.feedback = feedback
    // console.log('-------------------------------------------------')
    return option
}

function getFeedback(node:any):string {
    let fb:string = ''
    for(let i=0;i<node.children.length;i++) {
        const child = node.children[i]
        if(child.tagName == 'li') {
            fb += child.children[0]
        }
    }
    return fb;
}

export function quick_take(tree:any):string {
    let content:string = ''
    visit(tree, function (node:any) {
        if(node.tagName == 'quick-take' && node.children) {
            // const el = h('div', [
            //    , 
            // ])
            // el.properties.src = node.properties.src
            console.log("found quick take!", node.properties.src)
            content += toHtml( h('div.column.mt-0.pt-0.pb-5', [node.children]))
            if(node.properties.src) {
                content += toHtml(h('div.column.mt-0.pt-0.pb-5', [h('img', {src: node.properties.src})]))
            }
        }
    })
    remove(tree, (node:any) => node.tagName == 'quick-take')
    return content
}
