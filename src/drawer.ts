import { Scene } from "./scene";

export class Drawer
{
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;

    private scene: Scene;
    private recording: boolean;

    constructor()
    {
        this.initCanvas();
        this.initEvents();

        this.recording = false;
        this.scene = new Scene(3840, 1080);
    }

    private initCanvas()
    {
        const canvas = document.querySelector("canvas");
        const ctx = canvas?.getContext("2d");

        if (!canvas || !ctx)
            throw new Error("Canvas not found");

        this.canvas = canvas;
        this.ctx = ctx;

        this.resize();
    }

    private resize()
    {
        this.canvas.width = 3840;
        this.canvas.height = 1080;
    }

    private initEvents()
    {
        window.addEventListener("resize", () => { this.resize() });

        document.addEventListener("keydown", (event) =>
        {
            if (event.key === "Enter")
                this.startAnimation();
        })
    }

    private startAnimation()
    {
        const videoChunks: Blob[] = [];

        const stream = this.canvas.captureStream(60);
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8' });
        recorder.ondataavailable = (event) =>
        {
            videoChunks.push(event.data);
            console.log(`added : ${videoChunks.length}`)
        }
        recorder.onstop = () =>
        {
            console.log(`merged : ${videoChunks.length}`)
            var blob = new Blob(videoChunks, {
                'type': 'video/webm;codecs=vp8'
            });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a') as HTMLAnchorElement;
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = 'test.webm';
            a.click();
            window.URL.revokeObjectURL(url);
        }

        recorder.start(2000);
        this.recording = true;
        this.drawScene(0);

        setTimeout(() =>
        {
            this.recording = false;
            recorder.stop();

        }, 1900);
    }

    private drawScene(elapsedTime: number)
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.scene.draw(this.ctx, elapsedTime);

        requestAnimationFrame((runningTime) =>
        {
            if (this.recording)
                this.drawScene(runningTime);
        })
    }
}