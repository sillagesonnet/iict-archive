let faceWidth;
let faceHeight;
let faceRed;
let faceGreen;
let faceBlue;
let eyeSize;
let eyeGap;
let pupilSize;
let mouthWidth;
let mouthHeight;
let antennaHeight;
let cheekSize;
let spotSize;

function setup() {
  createCanvas(500, 500);

  faceWidth = random(220, 320);
  faceHeight = random(190, 270);
  faceRed = random(70, 240);
  faceGreen = random(70, 240);
  faceBlue = random(70, 240);
  eyeSize = random(38, 65);
  eyeGap = random(45, 82);
  pupilSize = random(12, 26);
  mouthWidth = random(70, 145);
  mouthHeight = random(20, 65);
  antennaHeight = random(35, 85);
  cheekSize = random(18, 38);
  spotSize = random(15, 45);
}

function draw() {
  background(239, 232, 218);
  rectMode(CENTER);
  ellipseMode(CENTER);

  // 몸, 팔다리
  stroke(45, 45, 45);
  line(180, 370, 120, 420);
  line(320, 370, 380, 420);
  line(220, 430, 195, 475);
  line(280, 430, 305, 475);

  noStroke();
  fill(faceRed, faceGreen, faceBlue, 180);
  ellipse(250, 385, 190, 145);

  // 더듬이
  stroke(45, 45, 45);
  line(200, 145, 180, 145 - antennaHeight);
  line(300, 145, 320, 145 - antennaHeight);
  noStroke();
  fill(faceRed, faceGreen, faceBlue);
  ellipse(180, 145 - antennaHeight, 24, 24);
  ellipse(320, 145 - antennaHeight, 24, 24);

  // 귀
  fill(faceRed, faceGreen, faceBlue);
  triangle(
    250 - faceWidth / 2, 175,
    250 - faceWidth / 2 - 45, 215,
    250 - faceWidth / 2, 245
  );
  triangle(
    250 + faceWidth / 2, 175,
    250 + faceWidth / 2 + 45, 215,
    250 + faceWidth / 2, 245
  );

  // 얼굴
  fill(faceRed, faceGreen, faceBlue);
  ellipse(250, 220, faceWidth, faceHeight);

  // 점
  fill(255, 230, 80, 190);
  ellipse(250, 145, spotSize, spotSize);

  // 눈
  fill(255);
  ellipse(250 - eyeGap, 205, eyeSize, eyeSize);
  ellipse(250 + eyeGap, 205, eyeSize, eyeSize);

  fill(35, 35, 35);
  ellipse(250 - eyeGap, 205, pupilSize, pupilSize);
  ellipse(250 + eyeGap, 205, pupilSize, pupilSize);

  // 볼
  fill(255, 100, 130, 150);
  ellipse(250 - eyeGap - 15, 255, cheekSize, cheekSize);
  ellipse(250 + eyeGap + 15, 255, cheekSize, cheekSize);

  // 입
  fill(45, 25, 35);
  ellipse(250, 275, mouthWidth, mouthHeight);
  fill(245, 100, 120);
  ellipse(250, 280, mouthWidth * 0.55, mouthHeight * 0.35);

  // 발
  fill(45, 45, 45);
  ellipse(190, 475, 65, 24);
  ellipse(310, 475, 65, 24);
}

function mousePressed() {
  faceWidth = random(220, 320);
  faceHeight = random(190, 270);
  faceRed = random(70, 240);
  faceGreen = random(70, 240);
  faceBlue = random(70, 240);
  eyeSize = random(38, 65);
  eyeGap = random(45, 82);
  pupilSize = random(12, 26);
  mouthWidth = random(70, 145);
  mouthHeight = random(20, 65);
  antennaHeight = random(35, 85);
  cheekSize = random(18, 38);
  spotSize = random(15, 45);
}

// 이미지 저장
function keyPressed() {
  if (key == 's') {
    saveCanvas('randomCharacter', 'png');
  }
}
