
import { NextResponse } from 'next/server';
import path from 'path';

import {YoutubeDownloader} from "../../../_server_module/youtubeDownloader"
import ytdl from '@distube/ytdl-core';






type responseType = {
    status: number,
    m4a: {
        low: ytdl.videoFormat[],
        medium: ytdl.videoFormat[]
    },
    weba: {
        low: ytdl.videoFormat[],
        medium: ytdl.videoFormat[]
    }
}

export async function POST(request: Request) {
    try {
        const url = new URL(request.url);
        const YTID = path.basename(url.pathname);
        
        const cookies = await request.json();

        const info = await YoutubeDownloader.getInfo(YTID, cookies);

        const audioFormats = info.formats.filter(data => data.hasAudio && !data.hasVideo);

        // console.log(JSON.stringify(audioFormats, null, "   "));


        const m4a = audioFormats.filter(e => e.mimeType?.startsWith("audio/mp4"));
        const weba = audioFormats.filter(e => e.mimeType?.startsWith("audio/webm"));



        const response: responseType = {
            status: 0,
            m4a: {
                low: m4a.filter(e => e.audioQuality == "AUDIO_QUALITY_LOW"),
                medium: m4a.filter(e => e.audioQuality == "AUDIO_QUALITY_MEDIUM")
            },
            weba: {
                low: weba.filter(e => e.audioQuality == "AUDIO_QUALITY_LOW"),
                medium: weba.filter(e => e.audioQuality == "AUDIO_QUALITY_MEDIUM")
            }
        }


        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error(error)
        return NextResponse.json({status: 4}, {status: 200});

    }
}