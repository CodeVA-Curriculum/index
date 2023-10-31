import { json } from '@sveltejs/kit'

export async function GET() {
    const key = YAML.parse((await read('src/routes/api/standards/id_key.yaml')).toString())
    return json(key)
}

export const prerender = true