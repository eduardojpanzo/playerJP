import type { NextApiRequest, NextApiResponse } from 'next'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'da32ed02ddmshe4c02f758716e51p1328e2jsn76da7a74877e',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    const response = await fetch(`https://api.deezer.com/search/artist?q=${'keith green'}`)
    const json = await response.json();
    
    res.status(200).json({
        list: json.data
    })
}
