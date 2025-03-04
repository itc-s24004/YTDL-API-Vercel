
import { NextResponse } from 'next/server';
import path from 'path';

import {YoutubeDownloader} from "../../../_server_module/youtubeDownloader"
import ytdl from '@distube/ytdl-core';

type Props = {
    params: {
        id: string;
    };
    searchParams: {
        dk?: string;
    };
};


 
export async function GET(request: Request) {
    const url = new URL(request.url);

    const YTID = path.basename(url.pathname);

    const info = await YoutubeDownloader.getInfo(YTID);

    // await YoutubeDownloader.downloadAudio(YTID)

    const audioFormats = info.formats.filter(data => data.hasAudio && !data.hasVideo && data.audioQuality == "AUDIO_QUALITY_MEDIUM")


    
    // const params = url.searchParams;
    // const json = {YTID}
    
    // console.log(JSON.stringify(info, null, "    "));
    return NextResponse.json(audioFormats, { status: 200 });
    

}

export async function POST(request: Request) {
    try {
        const cookies = await request.json();

        // console.log(cookiesText)

        // const cookies = JSON.parse(cookiesText);

        // console.log(cookies);
        // return NextResponse.json([{url: "https://youtube.com"}], {status: 200});

        // return NextResponse.json(reqJson);
        const url = new URL(request.url);

        const YTID = path.basename(url.pathname);


        const C = cookies.test
        console.log("=".repeat(20))
        console.log(cookies)

        const info = await YoutubeDownloader.getInfo(YTID, cookies);

        // await YoutubeDownloader.downloadAudio(YTID)

        const audioFormats = info.formats.filter(data => data.hasAudio && !data.hasVideo && data.audioQuality == "AUDIO_QUALITY_MEDIUM")

        // console.log(audioFormats)

        
        // const params = url.searchParams;
        // const json = {YTID}
        
        // console.log(JSON.stringify(info, null, "    "));
        return NextResponse.json(audioFormats, { status: 200 });

    } catch (error) {
        console.error(error)
        return NextResponse.json([{url: "https://ytdl-api-vercel.vercel.app/"}], {status: 200});

    }
}