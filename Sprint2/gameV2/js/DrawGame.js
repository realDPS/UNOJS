let canvas=null,ctx=null;
let cardSizeX = 120, cardSizeY=200;
let border = 20;
let cardMainColor = "blue";
let canvasWidth=1,canvasHeight=1;

window.addEventListener("load", ()=>{

    canvas = document.querySelector("#canvas");
    canvasHeight = canvas.height;
    canvasWidth = canvas.width;
    
    ctx = canvas.getContext("2d");//like graphics java
    
    ctx.fillStyle = "black";
    ctx.fillRect(150,200,120,200);//Inside
    ctx.fillStyle = "rgba(200,0,0,0.5)";
    ctx.strokeRect(150,200,120,200);//contour

    //with this one, spam rect on mouse pos
    // canvas.onmousemove 

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
            deckX = canvasWidth-nbOfCard*cardSizeX/2/2;
            deckY = 0;//border
            color = "black";
        }
        else{
            deckX = 0;//border
            if(nbPlayer==3)
                deckX = canvasWidth - (cardSizeY/2)/2;

            deckY = canvasHeight - (nbOfCard*cardSizeX/2)/2;
            color = "rgba(200,0,0,0.5)";
        }

        //draw all cards of player X
        let cardPosition;
        let nbCards = 5;
        for (let index = 0; index < nbCards; index++) {
            
            ctx.fillStyle = cardMainColor;
            
            if(nbPlayer==1){
                cardPosition = deckX+cardSizeX/2*index;
                ctx.fillRect(cardPosition,deckY,cardSizeX,cardSizeY);//Inside
                ctx.fillStyle = color;
                ctx.strokeRect(cardPosition,deckY,cardSizeX,cardSizeY);//contour
            }
            else{
                cardPosition = deckY+cardSizeX/2*index;
                ctx.fillRect(deckX,cardPosition,cardSizeX,cardSizeY);//Inside
                ctx.fillStyle = color;
                ctx.strokeRect(cardPosition,deckY,cardSizeX,cardSizeY);//contour
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
    let color;
    let cardPositionX,cardPositionY;
    let nbCards=5;

    let deckY = 1;//size vertical - cardSizeY
    let deckX = 1;//mid horizontal - nbOfCard*sizeCardY/2

    for (let index = 0; index < nbCards; index++) {
        
        cardPositionX = deckX+cardSizeX/2*index;
        ctx.fillStyle = cardMainColor;
        
        ctx.fillRect(deckX,deckY,cardSizeX,cardSizeY);//Inside
        ctx.fillStyle = color;
        ctx.strokeRect(150,200,cardSizeX,cardSizeY);//contour
        
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