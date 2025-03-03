const path = require("path");
// const fs = require("fs");
//remove fs

const ytdl = require("@distube/ytdl-core");
const Ffmpeg = require("fluent-ffmpeg");
const { URL } = require("url");



export class YoutubeDownloader {
    static #savePath = path.join(__dirname, "youtube");


    static setSavePath(savePath) {
        if (path.isAbsolute(savePath)) this.#savePath = savePath;
    }


    static async download(YTURL) {

        const url = new URL(YTURL);
        const YTID = url.searchParams.get("v");
        // const savePath = path.join(__dirname, "output.mp4");

        // const stream = fs.createWriteStream(savePath);

        const info = await ytdl.getInfo(YTID)
        // console.log(info);

        return info

        // const saveDir = path.join(this.#savePath, YTID)
        // fs.mkdirSync(saveDir, {recursive: true});
        // fs.writeFileSync(path.join(saveDir, "info.json"), JSON.stringify(info));

        // ytdl(url, {}).pipe(stream).on("close", () => {
        //     stream.close();

        //     Ffmpeg(savePath).setFfmpegPath(path.join(__dirname, "ffmpeg/win/bin/ffmpeg.exe")).save(path.join(__dirname, "output.mp3"))
        // })
    }

    static getInfo(YTID) {
        return ytdl.getInfo(YTID)
    }

    static async downloadAudio(YTID) {

        // const saveDir = path.join(this.#savePath, YTID);


        // fs.mkdirSync(saveDir, {recursive: true});
        
        // const savePath = path.join(saveDir, `audio`);

        // const stream = fs.createWriteStream(savePath);
        
        // ytdl(YTID, {quality: "highestaudio", requestCallback: () => {console.log("haaaaaaaaaaaaaaaaaaaaaaaaaa")}}).pipe(stream).on("close", () => {
        //     stream.close();

            
        //     // Ffmpeg(savePath).setFfmpegPath(path.join(__dirname, "ffmpeg/win/bin/ffmpeg.exe")).save(path.join(__dirname, "output.mp3"))
        // })
    }
}

