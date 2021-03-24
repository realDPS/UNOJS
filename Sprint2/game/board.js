let canvas=null,ctx=null;

window.addEventListener("load", ()=>{

    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");//like graphics java

    ctx.fillStyle = "black";
    ctx.fillRect(150,200,40,40);//Inside
    ctx.fillStyle = "rgba(200,0,0,0.5)";
    ctx.strokeRect(150,200,40,40);//contour

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

document.onkeyup=e=>{
    console.log(e.key);
    if(e.key==" "){
        ctx.fillStyle="white";
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }
}