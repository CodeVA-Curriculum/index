import {json} from '@sveltejs/kit'

export function GET() {
    // All standards, narrowed down by params (subject area, grade, strand)
    const standards:object[] = []
	return json(standards)
}