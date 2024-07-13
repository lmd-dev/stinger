export class Scene
{
    private _firstUpdate: number;
    private _lastUpdate: number;

    private _width: number;
    private _height: number;
    private _middleFrame: number;

    private xRight: number;
    private xLeft: number;

    constructor(width: number, height: number)
    {
        this._firstUpdate = 0;
        this._lastUpdate = 0;

        this._height = height;
        this._width = width;
        this._middleFrame = this._width / 2.0

        this.xRight = 0;
        this.xLeft = -width * 2 / 3;
    }

    draw(ctx: CanvasRenderingContext2D, runningTime: number)
    {
        if (this._firstUpdate === 0)
            this._firstUpdate = runningTime;

        const elapsedTime = runningTime - this._firstUpdate;

        if (this._lastUpdate !== 0)
        {
            let speed = 3;
            if (elapsedTime > 300 && elapsedTime < 800)
                speed = Math.cos(((elapsedTime - 300) / 500.0) * (Math.PI * 2)) * 1.5 + 1.5;

            this.xRight += speed * (runningTime - this._lastUpdate);  
            
            speed = 3;
            if (elapsedTime > 500 && elapsedTime < 1000)
                speed = Math.cos(((elapsedTime - 500) / 500.0) * (Math.PI * 2)) * 1.5 + 1.5;

            this.xLeft += speed * (runningTime - this._lastUpdate);  
        }

        this._lastUpdate = runningTime;

        const offset = 300;

        const xBottomRight = this.xRight;
        const xTopRight = xBottomRight - offset;

        const xBottomLeft = this.xLeft;
        const xTopLeft = xBottomLeft - offset;

        const yTop = 0;
        const yBottom = this._height;

        const slashWidth = 50;

        ctx.beginPath()
        ctx.moveTo(xTopRight, yTop);
        ctx.lineTo(xTopRight + slashWidth, yTop);
        ctx.lineTo(xBottomRight + slashWidth, yBottom);
        ctx.lineTo(xBottomRight, yBottom);
        ctx.lineTo(xTopRight, yTop);

        ctx.fillStyle = "#80643f";
        ctx.fill();

        ctx.beginPath()
        ctx.moveTo(xTopLeft, yTop);
        ctx.lineTo(xTopRight, yTop);
        ctx.lineTo(xBottomRight, yBottom);
        ctx.lineTo(xBottomLeft, yBottom);
        ctx.lineTo(xTopLeft, yTop);

        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.beginPath()
        ctx.moveTo(xTopLeft, yTop);
        ctx.lineTo(xTopLeft - slashWidth, yTop);
        ctx.lineTo(xBottomLeft - slashWidth, yBottom);
        ctx.lineTo(xBottomLeft, yBottom);
        ctx.lineTo(xTopLeft, yTop);

        ctx.fillStyle = "#80643f";
        ctx.fill();

        ctx.beginPath();
        ctx.rect(this._middleFrame, 0, this._middleFrame, this._height);
        ctx.fillStyle = "#000000";
        ctx.fill();

        ctx.beginPath()
        ctx.moveTo(this._middleFrame, yTop);
        ctx.lineTo(this._middleFrame + xTopRight, yTop);
        ctx.lineTo(this._middleFrame + xBottomRight, yBottom);
        ctx.lineTo(this._middleFrame, yBottom);
        ctx.lineTo(this._middleFrame, yTop);

        ctx.fillStyle = "#ffffff";
        ctx.fill();
    }

}