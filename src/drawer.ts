import { Scene } from "./scene";

export class Drawer
{
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;

    private scene: Scene;

    constructor()
    {
        this.initCanvas();
        this.initEvents();

        this.scene = new Scene(480, 270);
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
        this.canvas.width = 960;
        this.canvas.height = 270;
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
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
        recorder.ondataavailable = (event) =>
        {
            videoChunks.push(event.data);
        }
        recorder.onstop = () =>
        {
            var blob = new Blob(videoChunks, {
                'type': 'video/webm;codecs=vp9'
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

        recorder.start();
        this.drawScene(0);

        setTimeout(() =>
        {
            recorder.stop();

        }, 1000);
    }

    private drawScene(elapsedTime: number)
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.scene.update(elapsedTime);

        this.scene.draw(this.ctx);

        

        requestAnimationFrame((elapsedTime) =>
        {
            this.drawScene(elapsedTime);
        })
    }
}