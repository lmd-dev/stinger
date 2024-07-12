import { Coordinates } from "./coordinates";

export abstract class Drawable
{
    private readonly _coordinates: Coordinates;
    public get coordinates() { return this._coordinates; }

    private _speed: number;
    public get speed() { return this._speed; }

    constructor(speed: number)
    {
        this._coordinates = new Coordinates();
        this._speed = speed;
    }

    public abstract draw(ctx: CanvasRenderingContext2D, clip: boolean): void;
}