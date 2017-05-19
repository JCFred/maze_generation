$(document).ready(function(){
    console.log("main.js connected")

    drawGrid()

    $('#mazeBtn').click(function(){
        startMaze()
    })

    $('.container').click(function(event){
        if(event.target.classList.contains('gridBox')){
            console.log(event.target);
            let tempY = event.target.getAttribute('y')
            let tempX = event.target.getAttribute('x')
            console.log(gridArr[tempY][tempX]);
        }
    })
})

const xSize = 15
const ySize = 15
const boxSize = 20
const gridArr = []


function drawGrid(){
    var container = document.querySelector('.container')
    $('#container').empty()
    container.style.width = (xSize * boxSize) +"px"
    container.style.height = (ySize * boxSize) +"px"

    var setNum = 1
    for (var y = 0; y < ySize; y++) {
        gridArr[y] = []
        for (var x = 0; x < xSize; x++) {
            let tempDiv = document.createElement('div')
            tempDiv.className = 'gridBox'
            tempDiv.id = y +"_"+ x
            tempDiv.style.width = boxSize +"px"
            tempDiv.style.height = boxSize +"px"
            tempDiv.setAttribute('y', y)
            tempDiv.setAttribute('x', x)
            container.append(tempDiv)

            gridArr[y][x] = {
                up: true,
                left: true,
                right: true,
                down: true,
                set: setNum
            }
            setNum++
        }
    }
}

function startMaze(){
    let randX = Math.floor(Math.random() * xSize -1) + 1
    let randY = Math.floor(Math.random() * ySize -1) + 1
    let side = getSide(randY, randX)
    if(side != "bad"){
        let testTemp = gridArr[randY][randX][side]
        if(testTemp){
            checkSets(randY, randX, side)
            updateSets()
        }
    } else {
        updateSets()
    }


}

function updateSets(){
    let setCounter = 1
    let mazeDone = true
    for (var y = 0; y < ySize; y++) {
        for (var x = 0; x < xSize; x++) {
            if(y == 0 && x == 0){
                gridArr[y][x].set = setCounter
                setCounter++
            } else if(!gridArr[y][x].left){
                gridArr[y][x].set = gridArr[y -1][x].set
            } else if(!gridArr[y][x].up){
                gridArr[y][x].set = gridArr[y][x -1].set
            } else {
                gridArr[y][x].set = setCounter
                setCounter++
                mazeDone = false
            }

        }
    }
    if(!mazeDone){
        startMaze()
    }
}


function checkSets(divY, divX, side){
    if(side === "left"){
        if(divY > 0 && gridArr[divY][divX].set !== gridArr[divY -1][divX].set){
            let divOne = document.getElementById(divY +"_"+ divX)
            let divTwo = document.getElementById((divY -1) +"_"+ divX)
            divOne.style.borderLeft = "0px"
            gridArr[divY][divX].left = false
            divTwo.style.borderRight = "0px"
            gridArr[divY -1][divX].right = false
        }
    } else if(side === "up"){
        if(divX > 0 && gridArr[divY][divX].set !== gridArr[divY][divX -1].set){
            let divOne = document.getElementById(divY +"_"+ divX)
            let divTwo = document.getElementById(divY +"_"+ (divX -1))
            divOne.style.borderTop = "0px"
            gridArr[divY][divX].up = false
            divTwo.style.borderBottom = "0px"
            gridArr[divY][divX -1].down = false
        }
    } else if(side === "right"){
        if(divY < ySize -1 && gridArr[divY][divX].set !== gridArr[divY +1][divX].set){
            let divOne = document.getElementById(divY +"_"+ divX)
            let divTwo = document.getElementById((divY +1) +"_"+ divX)
            divOne.style.borderRight = "0px"
            gridArr[divY][divX].right = false
            divTwo.style.borderLeft = "0px"
            gridArr[divY +1][divX].left = false
        }
    } else if(side === "down"){
        if(divX < xSize -1 && gridArr[divY][divX].set !== gridArr[divY][divX +1].set){
            let divOne = document.getElementById(divY +"_"+ divX)
            let divTwo = document.getElementById(divY +"_"+ (divX +1))
            divOne.style.borderBottom = "0px"
            gridArr[divY][divX].down = false
            divTwo.style.borderTop = "0px"
            gridArr[divY][divX +1].up = false
        }
    }
}

function getSide(posY, posX){
    if(posY > 0 && posY < ySize && posX > 0 && posX < xSize){
        let tempNum = Math.floor(Math.random() * 4) + 1
        switch (tempNum){
            case 1:
                return "left"
                break;
            case 2:
                return "up"
                break;
            case 3:
                return "right"
                break;
            case 4:
                return "down"
                break;
        }
    } else if((posY == 0 && posX == 0)
    || (posY == 0 && posX == xSize -1)
    || (posY == ySize && posX == 0)
    || (posY == ySize && posX == xSize)){
        return "bad"
    } else if(posY == 0){
        let tempNum = Math.floor(Math.random() * 3) + 1
        switch (tempNum){
            case 1:
                return "up"
                break;
            case 2:
                return "down"
                break;
            case 3:
                return "right"
                break;
        }
    } else if(posX == 0){
        let tempNum = Math.floor(Math.random() * 3) + 1
        switch (tempNum){
            case 1:
                return "left"
                break;
            case 2:
                return "down"
                break;
            case 3:
                return "right"
                break;
        }
    } else if(posY == ySize){
        let tempNum = Math.floor(Math.random() * 3) + 1
        switch (tempNum){
            case 1:
                return "left"
                break;
            case 2:
                return "up"
                break;
            case 3:
                return "down"
                break;
        }
    } else if(posX == xSize){
        let tempNum = Math.floor(Math.random() * 3) + 1
        switch (tempNum){
            case 1:
                return "left"
                break;
            case 2:
                return "up"
                break;
            case 3:
                return "right"
                break;
        }
    }

}
