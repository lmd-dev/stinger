import { Coordinates } from "./coordinates";
import { Drawable } from "./drawable";
import { Logo } from "./logo";
import { NotRectangleParallelogram } from "./not-rectangle-parallelogram";

export class Scene
{
    private _items: Drawable[];

    private _lastUpdate: number;

    constructor(width: number, height: number)
    {
        this._items = [];
        this._lastUpdate = 0;

        this.initItems(width, height);
    }

    update(elapsedTime: number)
    {
        if (this._lastUpdate !== 0)
        {
            for (const item of this._items)
                item.coordinates.move(new Coordinates((elapsedTime - this._lastUpdate) * item.speed, 0));
        }

        this._lastUpdate = elapsedTime;
    }

    draw(ctx: CanvasRenderingContext2D)
    {
        for(let i = 0; i < 3; ++i)
            this._items[i].draw(ctx, false);

        ctx.save();
        this._items[1].draw(ctx, true);
        this._items[3].draw(ctx, false);
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.rect(480, 0, 960, 270);
        ctx.clip();

        ctx.beginPath();
        ctx.rect(480, 0, 960, 270);
        ctx.fillStyle = "black";
        ctx.fill();

        this._items[4].draw(ctx, false);
        ctx.restore();

    }

    private initItems(width: number, height: number)
    {
        const firstSlash = new NotRectangleParallelogram(50, height, 75);
        firstSlash.color = "#C79E33";
        
        const middleSlash = new NotRectangleParallelogram(width, height, 75);
        middleSlash.coordinates.set(-width, 0);

        const lastSlash = new NotRectangleParallelogram(50, height, 75);
        lastSlash.coordinates.set(-width - 50, 0);
        lastSlash.color = "#C79E33";

        const logo = new Logo();

        const transitionSlash = new NotRectangleParallelogram(960, height, 75);
        transitionSlash.coordinates.set(-940, 0);


        this._items.push(firstSlash, middleSlash, lastSlash, logo, transitionSlash);
    }

}