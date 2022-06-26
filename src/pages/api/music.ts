import type { NextApiRequest, NextApiResponse } from 'next'

type Music = {
  id:number; 
  name:string;
  artist:string;
  img:string;
  src:string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Music[]>
) {
  res.status(200).json(
  [
    {
      id:1,  
      name: "Harley Bird - Home",
      artist: "Jordan Schor",
      img: "/image/music-1.jpg",
      src: "/audio/music-1.mp3"
    },
    {
      id:2,
      name: "Ikson Anywhere – Ikson",
      artist: "Audio Library",
      img: "/image/music-2.jpg",
      src: "/audio/music-2.mp3"
    },
    {
      id:3,
      name: "Beauz & Jvna - Crazy",
      artist: "Beauz & Jvna",
      img: "/image/music-3.jpg",
      src: "/audio/music-3.mp3"
    },
    {
      id:4,
      name: "Hardwind - Want Me",
      artist: "Mike Archangelo",
      img: "/image/music-4.jpg",
      src: "/audio/music-4.mp3"
    },
    {
      id:5,
      name: "Jim - Sun Goes Down",
      artist: "Jim Yosef x Roy",
      img: "/image/music-5.jpg",
      src: "/audio/music-5.mp3"
    },
    {
      id:6,
      name: "Lost Sky - Vision NCS",
      artist: "NCS Release",
      img: "/image/music-6.jpg",
      src: "/audio/music-6.mp3"
    }
  ])
}