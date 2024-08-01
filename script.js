const tilesContainer= document.querySelector('.tiles');
const colors= ["Teal","Khaki","Coral","Gold","Green","Purple","Firebrick","RoyalBlue"];
const cPickList= [...colors,...colors];
const tCount= cPickList.length;
for(let i=0;i<tCount;i++){
    const randomIndex= Math.floor(Math.random()*cPickList.length);
    const color= cPickList[randomIndex];
    const tile= buildMyTile(color);
    cPickList.splice(randomIndex,1);
    tilesContainer.appendChild(tile);
}
let revealCount= 0;
let activeTile= null;
let awaitingfinish= false;
function buildMyTile(color){
    const element= document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color",color);
    element.setAttribute("data-revealed","false");
    element.addEventListener('click',()=>{
        const revealed= element.getAttribute("data-revealed");
        if(awaitingfinish || revealed === "true" || element == activeTile){
            return;
        }
        element.style.backgroundColor=color;
        if(!activeTile){
            activeTile= element;
            return;
        }
        const colorToMatch= activeTile.getAttribute("data-color");
        if(colorToMatch===color){
            element.setAttribute("data-revealed","true");
            activeTile.setAttribute("data-revealed","true");
            activeTile= null;
            awaitingfinish= false;
            revealCount+= 2;
            if(revealCount===tCount){
                alert("Yay, you WON the game, Please Refresh.");
            }
            return;
        }
        awaitingfinish= true;
        setTimeout(()=>{
            activeTile.style.backgroundColor= null;
            element.style.backgroundColor= null;
            awaitingfinish= false;
            activeTile= null;
        },1000)
    });
    return element;
}