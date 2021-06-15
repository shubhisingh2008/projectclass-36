//Create variables here
var dog , happydog , database , foodS , foodStock;
var dogimage , dogimage1;
var feed , addFood;
var feedtime , lastfeedTime;
var foodobj;

function preload(){
dogimage = loadImage("dogImg.png")
dogimage1 = loadImage("dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog  = createSprite(250,300,150,150);
  dog.addImage(dogimage);
  dog.scale = 0.15;

  foodStock = database.ref("food")
  foodStock.on("value",readStock)

  foodobj  = new Food();
  feed = createButton("feedthedog");
  feed.position(500,95);
  feed.mousePressed("feedDog")

  addFood = createButton("ADDfood");
  addFood.position(600,95);
  addFood.mousePressed("addfood")
}


function draw() {  
background(46, 139, 87);
//if (keyWentDown(UP_ARROW)){
//writeStock(foodS)
//dog.addImage(dogimage1)
foodobj.display();
//}
  drawSprites();
  //add styles here

  textSize(13)
  fill("white")
  stroke("black")
  text("NOTE: PRESS UP_ARROW KEY TO FEED DRAGO MILK",100,20)

  text("REMAINING FOOD:"+foodS,170,100)
  
  feedtime = database.ref("FeedTime")
  feedtime.on("value",function(data){
    lastfeedTime = data.val();
  })
  fill("orange")
  textSize(15)
  if (lastfeedTime>=12){
    text("LAST FEED TIME:"+lastfeedTime%12+"pm",250,35)
  }else if(lastfeedTime == 0){
    text("LAST FEED TIME : 12 AM",250,35)
  }else {
    text("LAST FEED TIME : "+lastfeedTime+"am",250,35)
  }
}

function readStock(data){
foodS = data.val();
}

function writeStock(x){
if(x<=0){
x = 0;
}else{
  x = x-1;
}
database.ref('/').update({
  food:x
})
}

function feedDog(){
dog.addImage(dogimage1)
if(foodobj.getFoodStock()<= 0){
  foodobj.updateFoodStock(foodobj.getFoodStock()*0);
}else{
  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
}
database.ref('/').update({
  food:foodobj.getFoodStock(),
  FeedTime:hour()
})
}

function addfood(){
foodS++;
database.ref('/').update({
  food:foodS
})
}

