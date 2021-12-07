let slider1;
let slider2;
let slider3;

let r1 = 125;
let r2 = 125;
let m1 = 20;
let m2 = 20;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = 0.4;

//previous points
let px2 = -1;
let py2 = -1;
let cx, cy;

let buffer;

let b;
let ball = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // createCanvas(500, 300);

    b = new Ball(width/4, height/4, float(40), floor(random(255)), floor(random(255)), floor(random(255)));


    //sliders
    slider1 = createSlider(windowHeight / 20, windowHeight / 2, 180);
    slider1.position(windowWidth / 20, windowHeight * 8 / 10);
    //slider1.style('width', '80px');

    slider2 = createSlider(windowHeight / 20, windowHeight / 2, 180);
    slider2.position(windowWidth / 20, windowHeight * 9 / 10);
    //slider2.style('width', '80px');

    colorMode(HSB, 255);
    slider3 = createSlider(0, 255, 127);
    slider3.position(windowWidth / 20, windowHeight * 7 / 10);
    //slider3.style('width', '80px');

    pixelDensity(1);

    a1 = PI / 2;
    a2 = PI / 2;
    cx = width / 2;
    cy = height / 5;
    buffer = createGraphics(width, height);
    buffer.background(175);
    buffer.translate(cx, cy);
    buffer.colorMode(HSB, 255);

    button = createButton('Reset Velocity');
    button.position(19, 50);
    button.mousePressed(reset);

    button = createButton('Add/Remove Ball');
    button.position(19, 75);
    button.mousePressed(addBall);
}

function draw() {
    background(220);
    imageMode(CORNER);
    image(buffer, 0, 0, width, height);

    push();
    stroke(0);
    strokeWeight(0);
    fill(0);
    textSize(15);
    text('Arm 1 length', windowWidth / 20, windowHeight * 8 / 10);

    text('Arm 2 length', windowWidth / 20, windowHeight * 9 / 10);

    text('Colour (HSB)', windowWidth / 20, windowHeight * 7 / 10);
    pop();

    //colour slider
    let val3 = slider3.value();

    //pendulum length sliders
    let val1 = slider1.value();
    let val2 = slider2.value();
    let r1 = val1;
    let r2 = val2;
    let m1 = 20;
    let m2 = 20;


    //pendulum logic
    //see https://myphysicslab.com/pendulum/double-pendulum-en.html
    //each of these values are separate derived valeus from website, den is denominator
    let num1 = -g * (2 * m1 + m2) * sin(a1);
    let num2 = -m2 * g * sin(a1 - 2 * a2);
    let num3 = -2 * sin(a1 - a2) * m2;
    let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
    let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    let a1_a = (num1 + num2 + num3 * num4) / den;
  
    num1 = 2 * sin(a1 - a2);
    num2 = a1_v * a1_v * r1 * (m1 + m2);
    num3 = g * (m1 + m2) * cos(a1);
    num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
    den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    let a2_a = (num1 * (num2 + num3 + num4)) / den;

    //translate(windowWidth / 2, windowHeight / 5);
    translate(cx, cy);

    let x1 = r1 * sin(a1);
    let y1 = r1 * cos(a1);

    let x2 = x1 + r2 * sin(a2);
    let y2 = y1 + r2 * cos(a2);


    stroke(val3, 255, 255);
    fill(val3, 255, 255, 127);
    strokeWeight(2);

    //first pendulum
    line(0, 0, x1, y1);
    fill(0);
    ellipse(x1, y1, m1, m1);

    //second pendulum
    line(x1, y1, x2, y2);
    fill(0);
    ellipse(x2, y2, m2, m2);

    //must have these values before
    a1_v += a1_a;
    a2_v += a2_a;
    //these values
    a1 += a1_v;
    a2 += a2_v;


    // dampening?
    // a1_v *= 0.99;
    // a2_v *= 0.99;


    // BALL STUFF
    if (ball) {
        b.display();
        b.update(x1, y1, x2, y2);
    }


    //trace line
    buffer.stroke(val3, 255, 255);
    buffer.fill(val3, 255, 255, 127);
    if (frameCount > 1) {
        buffer.line(px2, py2, x2, y2);
    }

    px2 = x2;
    py2 = y2;

}


function reset() {
    r1 = 125;
    r2 = 125;
    a1 = 1.5;
    a2 = 1.5;
    a1_v = 0;
    a2_v = 0;
    
    px1 = -1;
    py1 = -1;
    buffer.background(175);
}

function addBall() {
    ball = !ball;
}