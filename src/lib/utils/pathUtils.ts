import * as fs from 'fs'
import {validatePath, defaultPath, type Path} from './frontmatter'
import {base} from '$app/paths'

export function srcToUrl(path:string) {
    // console.log(path)
    let newPath = '/'+base+'library/browse/'+path.replace('/src/content/', '/').replace('.md', '')
    newPath = newPath.replace('//', '/')
    console.log(newPath)
    return newPath
  }

export function getParentDirectory(pathData:Path):string {
    const parentPath = pathData.path.substring(0, pathData.path.lastIndexOf('/'))
    if(parentPath[0] == '/') {
        return parentPath
    } else {
        return '/'+parentPath
    }
}

export function getParentMeta(pathData:Path):Path {
    if(!pathData.path.endsWith('meta.md')) {
        // file is not a metafile
        // check to see if meta next to file, otherwise continue
        // console.log('looking in',getParentDirectory(pathData)+'/meta.md', 'for parents')
        const adjacentMeta = validatePath(getParentDirectory(pathData)+'/meta')
        const hiddenAdjacentMeta = validatePath(getParentDirectory(pathData)+'/.meta')
        if(adjacentMeta.exists) {
            return adjacentMeta
        } else if(hiddenAdjacentMeta.exists) {
            return hiddenAdjacentMeta
        }
        console.log('No adjacent metafile exists for', pathData.path)
    }
    // if we are at the top level, return a null path
    const parentDirectory = getParentDirectory(pathData).substring(0, getParentDirectory(pathData).lastIndexOf('/'))
    // if(parentDirectory.length == 0) {
    //     return defaultPath()
    // }
    // file is a meta file, get meta or .meta in next upper directory
    const parent = validatePath(parentDirectory+'/meta')
    const hiddenParent = validatePath(parentDirectory+'/.meta')
    if(parent.exists) {
        return parent
    } else if(hiddenParent.exists) {
        return hiddenParent
    } else {
        throw new Error ('Could not find parent to inherit from! Be sure that there is a `.meta.md` file with default element values in `src/content/`')
    }
}