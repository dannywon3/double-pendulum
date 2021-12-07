function Ball(tempX, tempY, tempD, tempR, tempG, tempB) {
    this.posX = tempX;
    this.posY = tempY;
    this.diameter = tempD; 
    this.r = tempR;
    this.g = tempG;
    this.b = tempB;
    this.velX = -5;
    this.velY = -5;
    this.expanded = false;
}
 

// draw ball
Ball.prototype.display = function() {
    stroke(0);
    fill(this.r, this.g, this.b);
    ellipse(this.posX, this.posY, this.diameter, this.diameter);
}
 
Ball.prototype.update = function(x1, y1, x2, y2) {
    this.posX += this.velX;
    this.posY += this.velY;

    // wall collision, weird numbers because i translated in the original file for the pendulum calculations
    // and dont want to tranlate them back, so instead am changing them here
    if (this.posX + (this.diameter/2) >= width/2 || this.posX - (this.diameter/2) <= -width/2) {
        this.velX *= -1; 
    }

    if (this.posY + (this.diameter/2) >= height - height/5 || this.posY - (this.diameter/2) <= -height/5) {
        this.velY *= -1; 
    }

    // ball collisions
    let d1 = dist(x1, y1, this.posX, this.posY);
    let d2 = dist(x2, y2, this.posX, this.posY);
    // if masses touch
    if (d1 < this.diameter) {
        // changing direction of ball depending on where it got hit from
        if (x1 < this.posX && this.velX < 0) {
            this.velX *= -1;
        }
        if (x1 > this.posX && this.velX > 0) {
            this.velX *= -1;
        }
        if (y1 < this.posY && this.velY < 0) {
            this.velY *= -1;
        }
        if (y1 > this.posY && this.velY > 0) {
            this.velY *= -1;
        }    

    }

    if (d2 < this.diameter) {
        // changing direction of ball depending on where it got hit from
        if (x2 < this.posX && this.velX < 0) {
            this.velX *= -1;
        }
        if (x2 > this.posX && this.velX > 0) {
            this.velX *= -1;
        }
        if (y2 < this.posY && this.velY < 0) {
            this.velY *= -1;
        }
        if (y2 > this.posY && this.velY > 0) {
            this.velY *= -1;
        }    

    }
} 
