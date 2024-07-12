import { Drawable } from "./drawable";

export class NotRectangleParallelogram extends Drawable
{
    private _width: number;
    public get width(): number { return this._width; };
    
    private _height: number;
    public get height(): number { return this._height; };

    private _offset: number;
    public get offset(): number { return this._offset; };

    private _color: string;
    public get color(): string { return this._color; };
    public set color(value: string) { this._color = value; }
        
    constructor(width: number, height: number, offset: number)
    {
        super(1);

        this._width = width;
        this._height = height;
        this._offset = offset;
        this._color = "#fff";
    }

    public draw(ctx: CanvasRenderingContext2D, clip: boolean)
    {
        ctx.beginPath();

        ctx.moveTo(this.coordinates.x - this._offset / 2.0, this.coordinates.y);
        ctx.lineTo(this.coordinates.x - this._offset / 2.0 + this.width, this.coordinates.y);
        ctx.lineTo(this.coordinates.x + this._offset / 2.0 + this.width, this.coordinates.y + this.height);
        ctx.lineTo(this.coordinates.x + this._offset / 2.0, this.coordinates.y + this.height);
        ctx.lineTo(this.coordinates.x - this._offset / 2.0, this.coordinates.y);

        ctx.fillStyle = this._color;
        if(clip)
            ctx.clip();
        else
            ctx.fill();
    }
}