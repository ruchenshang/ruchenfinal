let cubes = [];
let cubeSize;
let textures = [];
let img1, img2,img3,img4,img5,img6,img7,img8;
let sounds = [];

function preload() {
  // Load textures
  for (let i = 0; i < 14; i++) {
    textures.push(loadImage(`texture${i+1}.png`));
    sounds.push(loadSound(`sound${i+1}.mp3`));
  }
  img8 = loadImage('mid-2.png');
  sounds.push(loadSound('mid-sound.mp3'));
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  
  // Calculate cube size based on window dimensions
  cubeSize = min(windowWidth, windowHeight) / 10;

  // Create the cubes 
 cubes.push({ x: -215, y: -85, z: 0, isMouseOver: false,sound: sounds[0] });
cubes.push({ x: -125, y: -85, z: 0, isMouseOver: false, sound: sounds[1] });
cubes.push({ x: -40, y: -85, z: 0, isMouseOver: false, sound: sounds[2] });
cubes.push({ x: 40, y: -85, z: 0, isMouseOver: false, sound: sounds[3] });
cubes.push({ x: 125, y: -85, z: 0, isMouseOver: false, sound: sounds[4] });
cubes.push({ x: 215, y: -85, z: 0, isMouseOver: false, sound: sounds[5] });
cubes.push({ x: -215, y: 0, z: 0, isMouseOver: false, sound: sounds[6] });
cubes.push({ x: 215, y: 0, z: 0, isMouseOver: false, sound: sounds[7] });
cubes.push({ x: -215, y: 85, z: 0, isMouseOver: false, sound: sounds[8] });
cubes.push({ x: -125, y: 85, z: 0, isMouseOver: false, sound: sounds[9] });
cubes.push({ x: -40, y: 85, z: 0, isMouseOver: false, sound: sounds[10] });
cubes.push({ x: 40, y: 85, z: 0, isMouseOver: false, sound: sounds[11] });
cubes.push({ x: 125, y: 85, z: 0, isMouseOver: false, sound: sounds[12] });
cubes.push({ x: 215, y: 85, z: 0, isMouseOver: false, sound: sounds[13] });
//cubes.push({ x: 0, y: 0, z: 0, isMouseOver: false, sound: sounds[sounds.length-1] });

}

function draw() {
  background(220);

  for (let i = 0; i < cubes.length; i++) {
    let cube = cubes[i];
    push();
    translate(cube.x, cube.y, cube.z);

    if (cube.isMouseOver) {
      rotateY(frameCount * 2);
      if (!cube.sound.isPlaying()) {
        cube.sound.play();
      }
    } else {
      rotateY(0);
       if (cube.sound) {
    cube.sound.stop();
  }
    }

    stroke(255);
    noStroke();
    texture(textures[i % 13]);
    cubes[i].sound = sounds[i % 14];

    box(cubeSize);
    pop();
  }
  
  // mid cube
  push();
  stroke(255)
  fill(255, 181, 162);
  translate(0, 0, 0);
  texture(img8);
  box(334 * cubeSize / 80, 80 * cubeSize / 80, 100 * cubeSize / 80);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Calculate new cube size based on new window dimensions
  cubeSize = min(windowWidth, windowHeight) / 10;
}

function mouseMoved() {
  for (let i = 0; i < cubes.length; i++) {
    let cube = cubes[i];
    let distance = dist(mouseX, mouseY, cube.x + width / 2, cube.y + height / 2);
    if (distance < cubeSize / 2) {
      cube.isMouseOver = true;
    } else {
      cube.isMouseOver = false;
    }
  }
}