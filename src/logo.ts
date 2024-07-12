import { Drawable } from "./drawable";
import imagePath from "./moulin.png";

export class Logo extends Drawable
{
    private _image: HTMLImageElement |null;
    
    constructor()
    {
        super(1);

        this._image = null;

        this.initImage();
    }

    private initImage()
    {
        const image = new Image();

        image.onload = () => {
            this._image = image;
        }
        image.src = imagePath;
    }

    public draw(ctx: CanvasRenderingContext2D, clip: boolean)
    {
        if(!this._image)
            return;

        ctx.save();

        ctx.drawImage(this._image, 960 - this._image.width / 2.0, 540 - this._image.height / 2.0)
        
        ctx.restore();
    }
}