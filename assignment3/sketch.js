// 출발 대기, 전등 들어오고 그 다음에 출발하게
let phase = 0;
let signalTimer = 0;
let speed = 0;
let gear = 0;
let speedLimitTimer = 0;

// 도로랑 펜스 위치
let stripeY1 = 270;
let stripeY2 = 350;
let stripeY3 = 435;
let stripeY4 = 530;
let postY1 = 275;
let postY2 = 355;
let postY3 = 450;
let postY4 = 550;

function setup() {
  createCanvas(960, 600);
  textFont('Arial Black');
}

function draw() {
  // 빨간 불 5개 하고 초록불
  if (phase === 1) {
    signalTimer = signalTimer + 1;
    if (signalTimer >= 190) phase = 2;
  }

  // 기어 안 올라가게 하는거
  if (phase === 3) {
    let gearSpeedLimit = gear * 40;
    if (speed < gearSpeedLimit) {
      speed = speed + 2.5;
      if (speed > gearSpeedLimit) speed = gearSpeedLimit;
      speedLimitTimer = 0;
    } else {
      speedLimitTimer = speedLimitTimer + 1;
      if (speedLimitTimer >= 20) speedLimitTimer = 0;
    }

    // 주행할 때 옆에 펜스가 지나가게
    let moveAmount = speed * 0.05;
    stripeY1 = stripeY1 + moveAmount;
    stripeY2 = stripeY2 + moveAmount;
    stripeY3 = stripeY3 + moveAmount;
    stripeY4 = stripeY4 + moveAmount;
    postY1 = postY1 + moveAmount;
    postY2 = postY2 + moveAmount;
    postY3 = postY3 + moveAmount;
    postY4 = postY4 + moveAmount;
    if (stripeY1 > 630) stripeY1 = stripeY1 - 375;
    if (stripeY2 > 630) stripeY2 = stripeY2 - 375;
    if (stripeY3 > 630) stripeY3 = stripeY3 - 375;
    if (stripeY4 > 630) stripeY4 = stripeY4 - 375;
    if (postY1 > 630) postY1 = postY1 - 375;
    if (postY2 > 630) postY2 = postY2 - 375;
    if (postY3 > 630) postY3 = postY3 - 375;
    if (postY4 > 630) postY4 = postY4 - 375;
  }

  // 배경 그리기
  background(12, 22, 37);
  noStroke();
  fill(20, 37, 57);
  rect(0, 88, 960, 95);
  fill(35, 55, 72);
  rect(0, 183, 960, 75);
  fill(52, 67, 73);
  triangle(0, 250, 0, 207, 240, 250);
  triangle(115, 250, 332, 219, 456, 250);
  triangle(504, 250, 666, 215, 853, 250);
  triangle(760, 250, 960, 209, 960, 250);
  fill(92, 103, 99);
  rect(0, 251, 960, 8);

  // 펜스 움직이기..
  fill(27, 43, 48);
  quad(0, 259, 430, 255, -40, 600, 0, 600);
  quad(530, 255, 960, 259, 960, 600, 1000, 600);
  fill(37, 43, 48);
  quad(430, 255, 530, 255, 1020, 600, -60, 600);
  fill(31, 36, 41);
  quad(454, 255, 506, 255, 740, 600, 220, 600);
  stroke(152, 158, 155);
  strokeWeight(2);
  line(430, 255, -60, 600);
  line(530, 255, 1020, 600);
  stroke(72, 94, 102);
  strokeWeight(2);
  line(411, 255, -30, 600);
  line(549, 255, 990, 600);
  line(411, 255, -20, 560);
  line(549, 255, 980, 560);
  noStroke();

  // 거리감 같은 거 만들기
  drawKerb(stripeY1);
  drawKerb(stripeY2);
  drawKerb(stripeY3);
  drawKerb(stripeY4);
  drawRoadside(postY1);
  drawRoadside(postY2);
  drawRoadside(postY3);
  drawRoadside(postY4);

  // 출발 신호를 약간 HUD처럼 화면 위쪽에 배치
  fill(6, 10, 17, 215);
  rect(337, 29, 286, 85, 13);
  stroke(95, 111, 121);
  strokeWeight(2);
  noFill();
  rect(337, 29, 286, 85, 13);
  noStroke();
  fill(156, 173, 180);
  textAlign(CENTER, CENTER);
  textSize(11);
  text('START SIGNAL', 480, 45);
  fill(32, 37, 42);
  ellipse(380, 77, 37, 37);
  ellipse(430, 77, 37, 37);
  ellipse(480, 77, 37, 37);
  ellipse(530, 77, 37, 37);
  ellipse(580, 77, 37, 37);
  if (phase === 1 && signalTimer < 170) {
    fill(242, 39, 44);
    ellipse(380, 77, 29, 29);
    if (signalTimer >= 30) ellipse(430, 77, 29, 29);
    if (signalTimer >= 60) ellipse(480, 77, 29, 29);
    if (signalTimer >= 90) ellipse(530, 77, 29, 29);
    if (signalTimer >= 120) ellipse(580, 77, 29, 29);
  }
  if (phase === 2 || phase === 3) {
    fill(39, 223, 104);
    ellipse(480, 77, 29, 29);
  }
  fill(235, 241, 235);
  textSize(15);
  if (phase === 0) text('PRESS THE WHEEL BUTTON', 480, 139);
  if (phase === 1 && signalTimer < 170) text('LIGHTS ON', 480, 139);
  if (phase === 1 && signalTimer >= 170) text('LIGHTS OUT', 480, 139);
  if (phase === 2) text('GREEN LIGHT  /  PRESS AGAIN', 480, 139);
  if (phase === 3) text('RACING  /  CLICK + TO SHIFT', 480, 139);

  // 서스펜션 그리기
  stroke(5, 8, 12);
  strokeWeight(9);
  line(218, 386, 403, 411);
  line(225, 447, 398, 437);
  line(742, 386, 557, 411);
  line(735, 447, 562, 437);
  stroke(92, 98, 100);
  strokeWeight(2);
  line(220, 383, 403, 407);
  line(227, 444, 398, 433);
  line(740, 383, 557, 407);
  line(733, 444, 562, 433);
  noStroke();

  // 바퀴 만들기
  fill(4, 6, 9);
  quad(0, 342, 146, 309, 233, 474, 17, 520);
  quad(960, 342, 814, 309, 727, 474, 943, 520);
  ellipse(118, 334, 180, 68);
  ellipse(842, 334, 180, 68);
  fill(20, 23, 27);
  quad(15, 349, 82, 330, 145, 497, 24, 511);
  quad(945, 349, 878, 330, 815, 497, 936, 511);
  fill(11, 14, 18);
  ellipse(183, 407, 100, 184);
  ellipse(777, 407, 100, 184);
  fill(26, 29, 32);
  ellipse(187, 405, 70, 160);
  ellipse(773, 405, 70, 160);
  fill(12, 15, 19);
  ellipse(189, 405, 58, 146);
  ellipse(771, 405, 58, 146);
  stroke(76, 79, 80);
  strokeWeight(2);
  line(50, 350, 73, 484);
  line(87, 341, 117, 490);
  line(910, 350, 887, 484);
  line(873, 341, 843, 490);
  noStroke();
  fill(232, 189, 50);
  quad(171, 340, 185, 337, 197, 346, 182, 351);
  quad(789, 340, 775, 337, 763, 346, 778, 351);

  // 다른 부분도 만들어야지
  fill(166, 24, 39);
  quad(0, 298, 145, 296, 190, 326, 0, 339);
  quad(960, 298, 815, 296, 770, 326, 960, 339);
  fill(16, 24, 32);
  quad(0, 309, 134, 307, 159, 323, 0, 329);
  quad(960, 309, 826, 307, 801, 323, 960, 329);
  fill(12, 16, 21);
  quad(452, 294, 508, 294, 615, 474, 345, 474);
  fill(173, 25, 41);
  quad(464, 300, 496, 300, 566, 470, 394, 470);
  fill(218, 39, 55);
  quad(464, 300, 480, 300, 474, 470, 394, 470);
  fill(117, 15, 30);
  quad(480, 300, 496, 300, 566, 470, 486, 470);
  fill(242, 239, 224);
  quad(477, 314, 483, 314, 494, 463, 466, 463);
  fill(213, 31, 48);
  triangle(464, 300, 480, 277, 496, 300);

  // 차체 부분
  fill(104, 15, 28);
  quad(0, 480, 244, 479, 390, 600, 0, 600);
  quad(960, 480, 716, 479, 570, 600, 960, 600);
  fill(194, 28, 45);
  quad(0, 452, 265, 466, 340, 538, 0, 508);
  quad(960, 452, 695, 466, 620, 538, 960, 508);
  fill(232, 49, 61);
  quad(0, 451, 260, 466, 282, 481, 0, 466);
  quad(960, 451, 700, 466, 678, 481, 960, 466);
  fill(238, 235, 220);
  quad(32, 469, 240, 482, 255, 491, 42, 480);
  quad(928, 469, 720, 482, 705, 491, 918, 480);
  fill(11, 16, 22);
  quad(334, 440, 626, 440, 734, 600, 226, 600);
  fill(34, 40, 47);
  quad(323, 460, 347, 453, 421, 600, 351, 600);
  quad(637, 453, 661, 460, 609, 600, 539, 600);
  fill(18, 23, 29);
  quad(0, 530, 302, 548, 369, 600, 0, 600);
  quad(960, 530, 658, 548, 591, 600, 960, 600);

  // 운전대랑 손잡이 부분. 기어올리는 거 표현
  fill(5, 8, 12);
  rect(341, 452, 278, 133, 25);
  fill(27, 31, 36);
  rect(353, 465, 55, 89, 17);
  rect(552, 465, 55, 89, 17);
  fill(15, 19, 24);
  rect(380, 439, 200, 145, 15);
  stroke(173, 28, 45);
  strokeWeight(4);
  noFill();
  rect(382, 442, 196, 140, 15);
  noStroke();
  fill(7, 17, 22);
  rect(417, 454, 126, 70, 6);
  fill(45, 217, 128);
  ellipse(419, 446, 7, 7);
  ellipse(438, 446, 7, 7);
  ellipse(457, 446, 7, 7);
  ellipse(476, 446, 7, 7);
  ellipse(495, 446, 7, 7);
  ellipse(514, 446, 7, 7);
  ellipse(533, 446, 7, 7);

  let gearText = 'N';
  if (gear > 0) gearText = '' + gear;
  fill(114, 224, 168);
  textSize(27);
  text(gearText, 480, 480);
  let displaySpeed = int(speed);
  if (phase === 3 && speed >= gear * 40 && speedLimitTimer >= 10) {
    displaySpeed = displaySpeed + 1;
  }
  fill(232, 244, 237);
  textSize(17);
  text('' + displaySpeed, 478, 507);
  fill(133, 168, 163);
  textSize(8);
  text('KM/H', 522, 510);

  fill(47, 158, 120);
  ellipse(393, 485, 18, 18);
  fill(216, 64, 54);
  ellipse(567, 532, 17, 17);
  fill(218, 183, 54);
  ellipse(393, 532, 17, 17);
  let overShift = mouseX > 564 && mouseX < 608 && mouseY > 460 && mouseY < 510;
  if (overShift && phase === 3 && gear < 8) {
    stroke(239, 241, 224);
    strokeWeight(3);
    fill(79, 164, 229);
  } else {
    fill(41, 99, 158);
  }
  ellipse(585, 486, 36, 36);
  noStroke();
  fill(255);
  textSize(23);
  text('+', 585, 484);
  fill(170, 187, 194);
  textSize(8);
  text('SHIFT', 585, 514);

  // 장갑이 컨트롤러 잡게.
  fill(123, 17, 31);
  quad(250, 600, 300, 536, 351, 511, 393, 555);
  quad(710, 600, 660, 536, 609, 511, 567, 555);
  fill(194, 28, 45);
  ellipse(369, 533, 61, 55);
  ellipse(591, 533, 61, 55);
  fill(232, 58, 64);
  quad(337, 532, 357, 507, 379, 518, 358, 544);
  quad(623, 532, 603, 507, 581, 518, 602, 544);

  // 출발 버튼이랑 변속 버튼
  let overButton = mouseX > 438 && mouseX < 522 && mouseY > 520 && mouseY < 578;
  if (overButton && (phase === 0 || phase === 2)) {
    stroke(255, 222, 155);
    strokeWeight(5);
    noFill();
    ellipse(480, 551, 91, 64);
    noStroke();
  }
  if (phase === 0) {
    if (overButton) fill(246, 51, 61);
    else fill(178, 34, 48);
  }
  if (phase === 1) fill(143, 102, 34);
  if (phase === 2) {
    if (overButton) fill(69, 198, 104);
    else fill(35, 166, 91);
  }
  if (phase === 3) fill(32, 58, 61);
  ellipse(480, 551, 82, 53);
  fill(255);
  textSize(14);
  if (phase === 0) text('START', 480, 550);
  if (phase === 1) text('WAIT', 480, 550);
  if (phase === 2) text('GO', 480, 550);
  if (phase === 3) text('RUN', 480, 550);

  fill(188, 202, 204);
  textSize(11);
  text('R  RESET', 61, 582);
}

// 연석이 더 커지게 만들기
function drawKerb(y) {
  let distance = y - 255;
  let leftX = 430 - distance * 1.42;
  let rightX = 530 + distance * 1.42;
  let widthOfStripe = 3 + distance * 0.045;
  let heightOfStripe = 5 + distance * 0.095;
  noStroke();
  fill(188, 35, 49);
  quad(leftX - widthOfStripe, y, leftX, y, leftX - 5, y + heightOfStripe, leftX - widthOfStripe - 5, y + heightOfStripe);
  quad(rightX, y, rightX + widthOfStripe, y, rightX + widthOfStripe + 5, y + heightOfStripe, rightX + 5, y + heightOfStripe);
  fill(246, 241, 224);
  quad(leftX - widthOfStripe, y, leftX - 2, y, leftX - 7, y + heightOfStripe * 0.6, leftX - widthOfStripe - 5, y + heightOfStripe * 0.6);
  quad(rightX + 2, y, rightX + widthOfStripe, y, rightX + widthOfStripe + 5, y + heightOfStripe * 0.6, rightX + 7, y + heightOfStripe * 0.6);
}

// 주변에 움직이는 거 반복시키기ㄱ
function drawRoadside(y) {
  let distance = y - 255;
  let leftX = 414 - distance * 1.26;
  let rightX = 546 + distance * 1.26;
  let poleHeight = 17 + distance * 0.29;
  let panelWidth = 13 + distance * 0.16;
  let panelHeight = 6 + distance * 0.045;
  let bushWidth = 8 + distance * 0.14;
  let bushLeft = leftX - 18 - distance * 0.17;
  let bushRight = rightX + 18 + distance * 0.17;
  noStroke();
  fill(21, 50, 49);
  triangle(bushLeft - bushWidth, y + 6, bushLeft, y - bushWidth, bushLeft + bushWidth, y + 6);
  triangle(bushRight - bushWidth, y + 6, bushRight, y - bushWidth, bushRight + bushWidth, y + 6);
  stroke(145, 161, 162);
  strokeWeight(2 + distance * 0.008);
  line(leftX, y, leftX, y - poleHeight);
  line(rightX, y, rightX, y - poleHeight);
  noStroke();
  fill(242, 232, 187, 70);
  ellipse(leftX, y - poleHeight, 9 + distance * 0.075, 9 + distance * 0.075);
  ellipse(rightX, y - poleHeight, 9 + distance * 0.075, 9 + distance * 0.075);
  fill(245, 241, 216);
  rect(leftX - 4, y - poleHeight - 2, 8, 4);
  rect(rightX - 4, y - poleHeight - 2, 8, 4);
  fill(161, 31, 47);
  quad(leftX - panelWidth, y - panelHeight, leftX, y - panelHeight, leftX, y, leftX - panelWidth, y);
  quad(rightX, y - panelHeight, rightX + panelWidth, y - panelHeight, rightX + panelWidth, y, rightX, y);
  fill(233, 235, 223);
  rect(leftX - panelWidth + 3, y - panelHeight + 2, panelWidth * 0.38, panelHeight * 0.45);
  rect(rightX + 3, y - panelHeight + 2, panelWidth * 0.38, panelHeight * 0.45);
}

function mousePressed() {
  if (phase === 3 && mouseX > 564 && mouseX < 608 && mouseY > 460 && mouseY < 510) {
    if (gear < 8) {
      gear = gear + 1;
      speedLimitTimer = 0;
    }
  }
  if (mouseX > 438 && mouseX < 522 && mouseY > 520 && mouseY < 578) {
    if (phase === 0) {
      phase = 1;
      signalTimer = 0;
    } else if (phase === 2) {
      phase = 3;
      gear = 1;
      speedLimitTimer = 0;
    }
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    phase = 0;
    signalTimer = 0;
    speed = 0;
    gear = 0;
    speedLimitTimer = 0;
    stripeY1 = 270;
    stripeY2 = 350;
    stripeY3 = 435;
    stripeY4 = 530;
    postY1 = 275;
    postY2 = 355;
    postY3 = 450;
    postY4 = 550;
  }
}