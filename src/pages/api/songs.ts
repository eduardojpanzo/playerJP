import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    const index = req.query;

    console.log();
    
    
    const response = await fetch(`https://api.deezer.com/artist/${index.q}/top`)
    const json = await response.json();
    
    res.status(200).json({
        list: json
    })
}