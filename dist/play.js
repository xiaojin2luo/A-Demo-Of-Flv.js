document.onreadystatechange = function() {
    if (this.readyState == "complete") {
        let video = document.getElementsByTagName("video");
        if (video.length > 0) {
            for (let i = 0; i < video.length; i++) {
                if ((video[i].src).split(".")[(video[i].src).split(".").length - 1] == "flv") {
                    let script = document.createElement("SCRIPT");
                    /**************************************************************/
                    // 此处的flv.min.js文件的路径按照使用页面的相对路径来引入         //
                    /**************************************************************/
                    script.src = "./dist/flv.min.js"
                    script.onload = function() {
                        for (let j = 0; j < video.length; j++) {
                            playFlvVideo(video[j]);
                        }
                    }
                    document.body.appendChild(script);
                    break;
                }
            }
        }
    }
}

function playFlvVideo(video = null) {
    if (video == null) return;
    if (!video.controls) video.controls = true;
    if (video.src.split(".")[video.src.split(".").length - 1] != "flv") return false;
    if (flvjs.isSupported()) {
        let flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            hasVideo: true,
            hasAudio: true,
            url: video.src
        });
        flvPlayer.attachMediaElement(video);
        flvPlayer.load();
    } else {
        alert("您的浏览器不支持播放此视频！");
    }
}