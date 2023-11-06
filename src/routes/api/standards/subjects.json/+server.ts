import { json } from '@sveltejs/kit'
import { read } from 'to-vfile'
import YAML from 'yaml'

export async function GET() {
    const key = YAML.parse((await read('src/routes/api/standards/index/id_key.yaml')).toString())
    return json(key)
}

export const prerender = true