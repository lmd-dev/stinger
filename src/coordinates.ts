export class Coordinates
{
    private _x: number;
    public get x(): number { return this._x; };
    
    private _y: number;
    public get y(): number { return this._y; };
    
    public constructor(x?: number, y?:number)
    {
        this._x = x ?? 0;
        this._y = y ?? 0;
    }

    public set(x: number, y: number)
    {
        this._x = x;
        this._y = y;
    }

    public move(vector: Coordinates)
    {
        this._x += vector._x;
        this._y += vector._y;
    }
}