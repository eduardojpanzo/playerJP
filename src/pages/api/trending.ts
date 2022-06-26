import { NextApiRequest, NextApiResponse } from "next";

/* const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'da32ed02ddmshe4c02f758716e51p1328e2jsn76da7a74877e',
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
	}
}; */
// const response = await fetch('https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=40008598&locale=en-US', options)

export default async (req: NextApiRequest,res: NextApiResponse) => {
    const response = await fetch(`http://localhost:5050/list`)
    const json = await response.json();
    
    res.status(200).json({
        list: json
    })
  }