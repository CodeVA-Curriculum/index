import { importDocument } from '$lib/utils/index.js'

export async function load({ params }){
  return await importDocument(await import.meta.glob(`$content/data-science/python.md`))
}
