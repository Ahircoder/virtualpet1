//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload() {
  //load images here
  dogImage = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
   database = firebase.database();
  createCanvas(800, 700);
 
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  dog = createSprite(200, 200);
  dog.addImage(dogImage);
  dog.scale = 0.25;
}

function draw() {
  background("green");

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
  fill(255, 255, 254);
  stroke("black");
  text("Food remaining : " + foodS, 470, 100);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 130, 10, 300, 20);

  drawSprites();
  //add styles here
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").update({
    Food: x,
  });
}

function readStock(data) {
  foodS = data.val();
}
