
import { NextResponse } from 'next/server';
import path from 'path';

import {YoutubeDownloader} from "../../../_server_module/youtubeDownloader"

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

    const audioFormats = info.formats.filter(data => data.hasAudio && !data.hasVideo && data.audioQuality == "AUDIO_QUALITY_MEDIUM" && data.mimeType?.startsWith("audio/mp4"))


    
    // const params = url.searchParams;
    // const json = {YTID}
    
    // console.log(JSON.stringify(info, null, "    "));
    return NextResponse.json(audioFormats, { status: 200 });
    

}