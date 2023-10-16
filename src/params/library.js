export function match(param) {
    return param != 'browse' && !param.includes('search') && param[0] != '/' && param[param.length-1] != '/';
}