import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    const [searchType,searchText,index] = `${req.query.q}`.split(',');
    
    const response = await fetch(`https://api.deezer.com/search/${searchType}?q=${searchText}`)
    const json = await response.json();
    
    res.status(200).json({
        list: json
    })
}