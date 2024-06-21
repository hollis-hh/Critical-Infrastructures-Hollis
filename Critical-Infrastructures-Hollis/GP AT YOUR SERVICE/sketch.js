// Image variables
let phone1; // Variable for phone line 1
let phone2; // Variable for phone line 2
let phone3; // Variable for phone line 3

// Sound variables
let dial; // Dialling sound
let onhold; // Dialling sound
let playSoundTrigger1 = true;
let playSoundTrigger2 = true;

// Introduction text
let textLines = [
  "This is your GP service", "You are put on the waiting list.", 
  "Each phone has a designated call time.", " ",
  "Step 1: Bid on your preferred phone line.", " ",
  "Pick your phone line.", " ", "1. 8:00AM", "2. 3:30pm", "3. 6:00PM", " ", 
  "Hover over the phone line"
];

let currentLineIndex = 0;
let textTyped = '';
let currentIndex = 0;
let typingSpeed = 100;
let delayBetweenLines = 10000;
let phonesTextTyped = false;
let switchToWhite = false; // Switch background color to white
let showMessage = false; // To manage the state after displaying the message
let messageText = ''; // Message to be displayed

// Input elements
let illnessInput;
let submitButton;

function preload() {
  priorityCase = loadTable('priorityCase.csv', "csv", "header");
  phone1 = loadImage('assets/phone1.jpeg'); // Load asset image (phone1)
  phone2 = loadImage('assets/phone2.jpeg'); // Load asset image (phone2)
  phone3 = loadImage('assets/phone3.jpeg'); // Load asset image (phone3)
  dial = loadSound('assets/dial.mp4'); // Load dialing sound
  onhold = loadSound('assets/on_hold.mp3'); // put on hold
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  typeText();

  // Create input field and submit button for illness description
  illnessInput = createInput();
  illnessInput.position(620, 200);
  submitButton = createButton('Submit');
  submitButton.position(illnessInput.x + illnessInput.width, 200);
  submitButton.mousePressed(handleBiddingProcess);

  // Initially hide input elements
  illnessInput.hide();
  submitButton.hide();

  /*
  //console.log priority case csv data
  console.log(priorityCase); //load data
  //Immediate cases
  console.log(priorityCase.rows[0].arr[0]);
  console.log(priorityCase.rows[1].arr[0]);
  console.log(priorityCase.rows[2].arr[0]);
  //Urgent Cases
  console.log(priorityCase.rows[0].arr[1]);
  console.log(priorityCase.rows[1].arr[1]);
  console.log(priorityCase.rows[2].arr[1]);
*/
}

function draw() {
  if (switchToWhite) {
    background(255); // Change background to white
    dial.stop(); // Ensure dial sound stops
  } else {
    background(0);
    let gap = 5;
    let phoneWidth = 500;
    let phoneHeight = 665;

    image(phone1, 0, 20, phoneWidth, phoneHeight);
    image(phone2, phoneWidth + gap, 20, phoneWidth, phoneHeight);
    image(phone3, (phoneWidth + gap) * 2 + 1 * 2, 20, phoneWidth, phoneHeight);

    textFont('Arial');
    textSize(30);
    textStyle(BOLD);
    fill(phonesTextTyped ? color(255, 0, 0) : 255);
    text('1', 210, 100); // Phone labels
    text('2', 716, 100); // Phone labels
    text('3', 1219, 100); // Phone labels

    textSize(20);
    textStyle(NORMAL);
    textFont('Courier New');
    text('8:00AM', 200, 600); // Time label
    text('3:30PM', 710, 600); // Time label
    text('6:00PM', 1215, 600); // Time label
    
    fill(255);
    textSize(14);
    textStyle(NORMAL);
    textFont('Courier New');
    if (!phonesTextTyped) {
      text(textTyped, 300, 250);
    } else if (!showMessage) {
      noStroke();
      text('Have you decided on your call?', 300, 100);
      text('You have now entered the bidding process', 300, 120);
      text('Whichever phone line you bid for may give', 800, 100);
      text('you a higher chance of securing a GP appointment', 800, 120);
      dial.stop();

      let rectWidth = 500;
      let rectHeight = 210;
      let rectX = (width - rectWidth) / 2;
      let rectY = (height - rectHeight) / 2;

      stroke(255, 0, 0);
      strokeWeight(2);
      textStyle(BOLD);
      fill('white');
      rect(rectX, rectY, rectWidth, rectHeight);

      noStroke();
      fill('black');
      textSize(25);
      textFont('Arial');

      let textX = rectX + 20;
      let textY = rectY + 40;
      text('TO MAKE A BID: PLEASE IDENTIFY ', textX, textY);
      text('AND SELECT YOUR ILLNESS. YOUR', textX, textY + 30);
      text('PHONE CALL DEPENDS ON YOUR.', textX, textY + 60);
      text('PRIORITY OF CASE. SELECT WISELY.', textX, textY + 90);
      text('YOU WILL HAVE A HIGHER CHANCE', textX, textY + 120);
      text('WITH IMMEDIATE CASES.', textX, textY + 150);

      // Show input elements for illness description
      illnessInput.show();
      submitButton.show();
    } //else if (showMessage) {
     // displayMessage(messageText);
   // }

    checkHover();
  }
  if (showMessage) {
    displayMessage(messageText);
  }
}

function typeText() {
  if (currentLineIndex < textLines.length) {
    if (currentIndex < textLines[currentLineIndex].length) {
      textTyped += textLines[currentLineIndex].charAt(currentIndex);
      currentIndex++;
    } else {
      currentLineIndex++;
      currentIndex = 0;
      textTyped += '\n';
    }
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(() => {
      phonesTextTyped = true;
    }, delayBetweenLines);
  }
}

function checkHover() {
  let phoneWidth = 500;
  let phoneHeight = 665;
  let gap = 5;

  if (mouseX >= 0 && mouseX <= phoneWidth && mouseY >= 20 && mouseY <= 20 + phoneHeight) {
    playDialSound();
  } else if (mouseX >= phoneWidth + gap && mouseX <= phoneWidth * 2 + gap && mouseY >= 20 && mouseY <= 20 + phoneHeight) {
    playDialSound();
  } else if (mouseX >= (phoneWidth + gap) * 2 + 1 * 2 && mouseX <= phoneWidth * 3 + gap * 2 && mouseY >= 20 && mouseY <= 20 + phoneHeight) {
    playDialSound();
  } else {
    dial.stop();
  }
}

function playDialSound() {
  if (!dial.isPlaying()) {
    dial.loop();
  }
}

function handleBiddingProcess() {
  let illness = illnessInput.value().toLowerCase().trim();
  dial.stop();
  let priorityCase = ""; // Variable to store priority case
  
  // Illnesses corresponding to immediate cases
  const immediateCases = ["heart attack", "chest pain", "severe pain", "stroke symptoms", "difficulty breathing", "severe trauma", "severe bleeding"];

  // Illnesses corresponding to urgent cases
  const urgentCases = ["broken bone", "high fever", "severe infection", "severe migraine", "asthma attacks"];

  // Prompt the participant to identify their illness
  //let illness = prompt("Please describe your illness: ").toLowerCase().trim();

  // Check if the illness corresponds to immediate cases
  if (immediateCases.includes(illness)) {
    messageText = "You are classified as an immediate case.\n";
    messageText += "You will get the phone line immediately.\n";
    messageText += "Please wait.";
    priorityCase = "immediate"; // Set priority case to immediate
  
  }
  // Check if the illness corresponds to urgent cases
  else if (urgentCases.includes(illness)) {
    messageText = "You are classified as an urgent case.\n";
    messageText += "You will get the phone line as soon as possible.\n";
    messageText += "This will not be your preferred phone line.";
    priorityCase = "urgent"; // Set priority case to urgent
  }
  // If illness is non-urgent
  else {
    messageText = "You are classified as a non-urgent case.\n";
    messageText += "You will be put in the waiting queue.\n";
    messageText += "The phone queue is busy right now.";
    messageText += "We will be with you shortly.";
    priorityCase = "non-urgent"; // Set priority case to non-urgent
  }
  showMessage = true;
}

function displayMessage(message) {
  background(0);
  fill('white');
  textFont('Arial');
  textSize(40);
  textStyle(BOLD);
  textAlign(CENTER);
  text(message, width / 2, height / 2);
  dial.stop()

  // Delay before displaying phone image
  setTimeout(displayPhoneImage, 10000);

  function displayPhoneImage() {
    background(0);
    image(phone1, 500, 30, 500, 665);
    //sound signal
    if (playSoundTrigger1) {
      onhold.loop();
      onhold.play();
      playSoundTrigger1 = false;
    }
  }

  // Hide input elements after displaying the message
  illnessInput.hide();
  submitButton.hide();

  if (displayPhoneImage) {
  displayMessage(message).hide;
  }
}