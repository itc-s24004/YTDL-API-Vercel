const ytdl = require("@distube/ytdl-core");



export class YoutubeDownloader {

    /**
     * 
     * @param {string} YTID 
     * @param {{domain: string}[]} cookies 
     * @returns 
     */
    static getInfo(YTID, cookies = []) {
        const C = cookies.filter(e => e.domain == ".youtube.com")
        // console.log(C)
        return ytdl.getInfo(YTID, {agent: ytdl.createAgent(C)})
    }
}

