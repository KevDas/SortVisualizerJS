class Column
{

    constructor(x,y,width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue= [];
    }


    changeHeight(height)
    {
        for (let i = 1; i < 10; ++i)
        {
            this.height = height; 
            const left = this.x - this.width/2;
            const top = this.y - this.height;

            ctx.beginPath();
            //sets the fill Style of the rectangle to a gray
            ctx.fillStyle = "rgb(150, 150, 150)";
            //creating the rectangle path
            ctx.rect(left, top, this.width, this.height);
            //fills the rectangle path specified above with the gray color
            ctx.fill();
        }

    }
    
    moveTo(loc, yOffset = 1, frameCount = 1)
    {
        for (let i = 1; i <= frameCount; ++i)
        {
            const t = i/ frameCount;
            const u = Math.sin(t * Math.PI);
            this.queue.push(
            {
                x:linearInterpolation(this.x, loc.x, t), 
                y:linearInterpolation(this.y, loc.y, t) + u * this.width/2 * yOffset
            }); 
        }
    }

    jump(frameCount = 20)
    {
        for (let i = 1; i <= frameCount; ++i)
        {
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            this.queue.push(
            {
                x:this.x, 
                y: this.y - u * this.width 
            });
        }
    }


    draw(ctx, color)
    {
        let changed = false;
        //if there are animations to perform, change the x and y positions of the column
        // and remove the frame from the queue / return that a change is occuring
        if (this.queue.length > 0)
        {
            const {x, y} = this.queue.shift();
            this.x = x;
            this.y = y;
            changed = true;
            color = "red";
        }

        const left = this.x - this.width/2;
        const top = this.y - this.height;
        //creates a new path where we will draw a rectangle
        ctx.beginPath();
        //sets the fill Style of the rectangle to a gray
        ctx.fillStyle = color;
        //creating the rectangle path
        ctx.rect(left, top, this.width, this.height);
        //fills the rectangle path specified above with the gray color
        ctx.fill();
        return changed;
    }

    
}

function linearInterpolation(a, b, t)
{
    return a + (b - a) * t;  
}