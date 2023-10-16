import { json } from "@sveltejs/kit"

async function getStandards() {
    let stds:object[] = []
    const files = await import.meta.glob('../**/*.json')
    for (const path in files) {
        await files[path]().then((mod:any) => {
            stds = [...stds, ...mod.default]
        })
    }
    return stds
}

export async function GET() {
    const standards = await getStandards()
    return json(standards)
}

export const prerender = true