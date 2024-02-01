import { getAllFrontmatter } from "$lib/utils/frontmatter";
import {base} from '$app/paths'

export async function GET() {
    const fm = await getAllFrontmatter();
    let urlString = ""
	// TODO: the <lastmod> thing is sketch
	for(let i=0;i<fm.length;i++) {
        const url = `\n<url>
			<loc>${base}/library/browse/${fm[i].pathData.path.replace('/meta.md', '')}</loc>
			<lastmod>2024-02-01</lastmod>
		</url>`
		urlString+=url
    }
	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			<url>
				<loc>${base}/library</loc>
				<lastmod>2024-02-01</lastmod>
			</url>
			<url>
				<loc>${base}/library/browse</loc>
				<lastmod>2024-02-01</lastmod>
			</url>
			<url>
				<loc>${base}/library/search</loc>
				<lastmod>2024-02-01</lastmod>
			</url>
			<url>
				<loc>${base}/contact</loc>
				<lastmod>2024-02-01</lastmod>
			</url>
			${urlString}
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}

export const prerender = true;