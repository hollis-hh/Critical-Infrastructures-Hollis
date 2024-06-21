function preload() {
    hospital = loadImage('assets/hospital.png');
    GP = loadImage('assets/GP.png');
    heart = loadImage('assets/heart.png');
  }

function setup() {
    createCanvas(windowWidth, 900 );
    noLoop();
    strokeWeight(1);
  }
  function draw() {
    //background(220, 255, 210);
    background(0);
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    //textStyle(ITALIC);
    textFont('Times New Roman', 80);
    text('AUCTION: ON-CALL', 50,90);
    image(hospital, 825, 30, 80,80);
    textSize(30);
    strokeWeight(1.3);
    
    textStyle(NORMAL);
    //grid border
    const borderPadding = 50;
    //noFill();
    //fill(255,255,237);
    rect(borderPadding,170, width - 2 * borderPadding, height - 2 * borderPadding - 100);
    noFill();
    strokeWeight(2);
    textSize(22);
    text('BID NOW!', 700, 125);
    textFont('Times New Roman', 10);
    //fill('black');
    strokeWeight(1);
    textSize(30);
    text('It’s now or never... Wait in line to get your treatment.',50, 125);
    
    fill('black');
    strokeWeight(3);
    strokeWeight(3);
    fill(255,255,237);
    rect(1030,30,360, 100);
    textSize(40);

    fill('yellow');
    //fill(255,255,237);
    stroke(1);
    strokeWeight(2);
    rect(50,160,1340, 100);

    textSize(18);
    fill('black');
    stroke(0);
    strokeWeight(0);
    
    textStyle(BOLD);
    textFont('Times New Roman', 20);
    text('~Welcome to the GP Auction~', 65,190);
    textSize(13);
    textStyle(BOLD);
    textFont('Courier New', 13);
    text('Your bid is a contract -', 71,215);
    textStyle(NORMAL);
    text ('Place a bid only if you are serious about buying the item.',265,215);
    text('If you are the winning bidder, you will enter into a legally binding contract to purchase the item from the seller.', 71,235);
    
    fill('yellow');
    stroke(1);
    strokeWeight(2);
    rect(1030,160,360, 100);
    strokeWeight(1);
    fill('black');
    textFont('Times New Roman', 30);
    textStyle(BOLD);
    text('No. OF BIDDERS:', 1050,200);
    fill('red');
    //text('109', 1300,200); 
    //number of bidders will be determined by number of people interested in getting an appointmnet
    

    fill('red');
    textFont('Times New Roman');
    strokeWeight(2);
    textStyle(NORMAL);
    textSize(100);
    strokeWeight(6);
    //textStyle(ITALIC);
    text('!!MAKE YOUR BID NOW!!', 125,380);
    textStyle(NORMAL);
    fill('blue');
    textSize(30);
    strokeWeight(3);
    text('$ $ $',700,450);
    text('BIDDING ITEMS LIST',585,490);

    fill('red');
    strokeWeight(0);

    fill(211,211,211);
    //fill('grey');
    stroke('black');
    strokeWeight(2);
    rect(200,525,350, 300);
    rect(565,525,350, 300);
    rect(930,525,350, 300);

    //bidding items
    image(GP, 248,510,230, 300);
    image(GP, 620,510,230, 300);
    image(GP, 990,510,230, 300);
    fill('white');
    noStroke();
    circle(1250,550,30, 30);
    image(heart, 1242,543,16, 16);

    fill('white');
    noStroke();
    circle(880,550,30, 30);
    image(heart, 872,543,16, 16);

    fill('white');
    circle(520,550,30, 30);
    image(heart, 512,543,16, 16);



  // Clock Time
  // Get the current second, minute and hours 
  // and assign them to res variables 
  var sec = second(); 
  var min = minute(); 
  var hrs = hour(); 

  fill('blue'); 
  stroke('black');
  //textStyle(BOLD);
  textSize(50); 
  textFont('Times New Roman');
    
  // Check for AM or PM based on the 
  var mer = hrs < 12 ? "AM":"PM"; 
    
  // Format time - 0's are added when needed 
  sec = formatting(sec); 
  min = formatting(min); 
  hrs = formatting(hrs % 12); 
    
  // Display the time 
  text(hrs + ":" + min + ":" + sec +  " " + mer, 1070, 95); 
} 

function formatting(num){ 
      // Convert to int and check  
  // if less than 10 
  if(int(num) < 10) {      
    // Return the padded number 
    return "0" + num; 
  }   
  // Return the original number if 
  // padding is not required 
  return num;
  }
  