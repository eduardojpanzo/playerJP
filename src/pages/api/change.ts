import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    const query = req.query;
    console.log(query);
    
    const response = await fetch(`${query}`)
    const json = await response.json();
    
    res.status(200).json({
        list: json
    })
}