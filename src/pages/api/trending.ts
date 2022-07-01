import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    const response = await fetch(`https://api.deezer.com/search/artist?q=${'keith green'}`)
    const json = await response.json();
    
    res.status(200).json({
        list: json
    })
}