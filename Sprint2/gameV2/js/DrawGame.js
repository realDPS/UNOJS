let canvas=null,ctx=null;
let cardSizeX = 120, cardSizeY=200;
let border = 20;
let cardMainColor = "blue";
let canvasWidth=1,canvasHeight=1;
let hideAportion = 3/4;

window.addEventListener("load", ()=>{

    canvas = document.querySelector("#canvas");
    canvasHeight = canvas.height;
    canvasWidth = canvas.width;
    console.log(canvasWidth);
    console.log(canvasHeight);
    ctx = canvas.getContext("2d");//like graphics java
  
    //with this one, spam rect on mouse pos
    // canvas.onmousemove 
    tick();

    canvas.onclick = e=>{
        let x = e.pageX-canvas.offsetLeft;
        let y = e.pageY-canvas.offsetTop;
        // let x = e.pageX - canvas.offsetLeft-SQUARE/2
        // let y = e.pageY - canvas.offsetLeft-SQUARE/2

        ctx.fillStyle = "red";
        ctx.FillRect = (x,y,40,40);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(x,y,40,40);
    }


});




//check if ctx work. Use drawBoard as param
const drawEnDeck=()=>{
    
    let currentPlayers = 3;//temp
    let deckX, deckY,color;
    let nbOfCard=5;//temp

    for (let nbPlayer = 1; nbPlayer <= currentPlayers; nbPlayer++) {

        if(nbPlayer==1){
            deckX =(canvasWidth/2)-nbOfCard*cardSizeX/2;
            deckY = 0;//border
            color = "black";
        }
        else{
            deckX = 0;//border
            if(nbPlayer==3)
                deckX = canvasWidth - (cardSizeY/2)*hideAportion;

            deckY = canvasHeight - (nbOfCard*cardSizeX/2)*hideAportion;
            color = "black";//rgba(200,0,0,0.5)
        }

        //draw all cards of player X
        let cardPosition;
        let nbCards = 5;
        for (let index = 0; index < nbCards; index++) {
            switch(nbPlayer){
                case 1: ctx.fillStyle = "red";break;
                case 2: ctx.fillStyle = "green";break;
                case 3: ctx.fillStyle = "blue";break;
            }
            // ctx.fillStyle = cardMainColor;
            
            if(nbPlayer==1){//arrange cards horizontally
                cardPosition = deckX+cardSizeX*hideAportion*index;
                ctx.fillRect(cardPosition,deckY,cardSizeX,cardSizeY);//Inside
                ctx.fillStyle = color;
                ctx.strokeRect(cardPosition,deckY,cardSizeX,cardSizeY);//contour
            }
            else{//arrange cards vertically
                cardPosition = deckY+cardSizeX*hideAportion*index;
                ctx.fillRect(deckX,cardPosition,cardSizeY,cardSizeX);//Inside
                ctx.fillStyle = color;
                ctx.strokeRect(deckX,cardPosition,cardSizeY,cardSizeX);//contour
            }
            
            
            
        }
        
    }
}

//const checkMouseOnDeck(){ 
//if X >=canvasWidth-nbOfCard*cardSizeX/2/2
//if X <=canvasWidth+nbOfCard*cardSizeX/2/2
//if Y >= canvasHeight-cardSizeY
//return true;

//getCardUnderMouse()
//baseX = canvasWidth-nbOfCard*cardSizeX/2/2
// for loop of nbCard: if Mouse >=baseX+i*cardSizeX/2 and mouse<=cardbaseX+(i+1)*cardSizeX/2 return i

const drawPlayerDeck=()=>{
    let color="black";
    let cardPositionX,cardPositionY;
    let nbCards=5;
    //decky = canvasHeight
    let deckY = canvasHeight-cardSizeY;//size vertical - cardSizeY
    let deckX =(canvasWidth/2)-nbCards*cardSizeX/2;
    

    console.log(deckY);
    for (let index = 0; index < nbCards; index++) {
        
        cardPositionX = deckX+cardSizeX*hideAportion*index;
        ctx.fillStyle = "yellow";
        // console.log(cardPositionX);
        ctx.fillRect(cardPositionX,deckY,cardSizeX,cardSizeY);//Inside
        ctx.fillStyle = color;
        ctx.strokeRect(cardPositionX,deckY,cardSizeX,cardSizeY);//contour
        
    }
}

//////////////////////////////
document.onkeyup=e=>{
    console.log(e.key);
    if(e.key==" "){
        ctx.fillStyle="white";
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }
}

const tick = () => {

    ctx.fillStyle = "black";
    ctx.fillRect(150,200,120,200);//Inside
    ctx.fillStyle = "rgba(200,0,0,0.5)";
    ctx.strokeRect(150,200,120,200);//contour

	// ctx.fillStyle = "white";
	// ctx.fillRect(0, 0, canvas.width, canvas.height);

	// for (let i = 0; i < spriteList.length; i++) {
	// 	let alive = spriteList[i].tick();

	// 	if (!alive) {
	// 		spriteList.splice(i, 1);
	// 		i--;
	// 	}
	// }
    
    drawEnDeck();
    drawPlayerDeck();
	window.requestAnimationFrame(tick);
}