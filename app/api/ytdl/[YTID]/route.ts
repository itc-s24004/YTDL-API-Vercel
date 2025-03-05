
import { NextResponse } from 'next/server';
import path from 'path';

import {YoutubeDownloader} from "../../../_server_module/youtubeDownloader"
import ytdl from '@distube/ytdl-core';



 
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





type responseType = {
    status: number,
    m4a: {
        low: ytdl.videoFormat[],
        medium: ytdl.videoFormat[]
    },
    webm: {
        low: ytdl.videoFormat[],
        medium: ytdl.videoFormat[]
    }
}

export async function POST(request: Request) {
    try {
        const cookies = await request.json();

        const url = new URL(request.url);

        const YTID = path.basename(url.pathname);


        const C = cookies.test
        // console.log("=".repeat(20))
        // console.log(cookies)

        const info = await YoutubeDownloader.getInfo(YTID, cookies);

        const audioFormats = info.formats.filter(data => data.hasAudio && !data.hasVideo);

        // console.log(JSON.stringify(audioFormats, null, "   "));


        const m4a = audioFormats.filter(e => e.mimeType?.startsWith("audio/mp4"));
        const webm = audioFormats.filter(e => e.mimeType?.startsWith("audio/webm"));



        const response: responseType = {
            status: 0,
            m4a: {
                low: m4a.filter(e => e.audioQuality == "AUDIO_QUALITY_LOW"),
                medium: m4a.filter(e => e.audioQuality == "AUDIO_QUALITY_MEDIUM")
            },
            webm: {
                low: webm.filter(e => e.audioQuality == "AUDIO_QUALITY_LOW"),
                medium: webm.filter(e => e.audioQuality == "AUDIO_QUALITY_MEDIUM")
            }
        }


        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error(error)
        return NextResponse.json({status: 4}, {status: 200});

    }
}