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
const boxSize = 30
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
            tempDiv.innerHTML = setNum
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
    let testTemp = gridArr[randY][randX][side]
    if(side != "bad" && testTemp){
        checkSets(randY, randX, side)
        //updateSets()
        updateSetsNew()
    }
}


function updateSetsNew(){
    let singleCounts = 1
    let comboCount = -1
    let mazeDone = true

    //run through the grid once from the top left
    for (var y = 0; y < ySize; y++) {
        for (var x = 0; x < xSize; x++) {
            if(y == 0 && x == 0){
                gridArr[y][x].set = singleCounts
                let tempDiv = document.getElementById(y +"_"+ x)
                tempDiv.innerHTML = ""
                tempDiv.innerHTML = singleCounts
                singleCounts++
            //no border left or up
            } else if(!gridArr[y][x].left || !gridArr[y][x].up){
                setChange(y, x, comboCount)
                comboCount--
            } else {
                gridArr[y][x].set = singleCounts
                let tempDiv = document.getElementById(y +"_"+ x)
                tempDiv.innerHTML = ""
                tempDiv.innerHTML = singleCounts
                singleCounts++
                mazeDone = false
            }
        }
    }

    if(!mazeDone){
        startMaze()
    }
}

function setChange(y, x, counter){
    let gridSpot = document.getElementById(y +"_"+ x)
    gridSpot.innerHTML = ""
    gridSpot.innerHTML = counter
    gridArr[y][x].set = counter


    //left
    if(!gridArr[y][x].left){
        if(gridArr[y -1][x].set !== gridArr[y][x].set){
            setChange(y -1, x, counter)
        }
    }
    //up
    if(!gridArr[y][x].up){
        if(gridArr[y][x -1].set !== gridArr[y][x].set){
            setChange(y, x -1, counter)
        }
    }
    //right
    if(!gridArr[y][x].right){
        if(gridArr[y +1][x].set !== gridArr[y][x].set){
            setChange(y +1, x, counter)
        }
    }
    //down
    if(!gridArr[y][x].down){
        if(gridArr[y][x +1].set !== gridArr[y][x].set){
            setChange(y, x +1, counter)
        }
    }
}



function updateSets(){
    let setCounter = 1
    //let mazeDone = true

    //run through the grid once from the top left
    for (var y = 0; y < ySize; y++) {
        for (var x = 0; x < xSize; x++) {
            if(y == 0 && x == 0){
                gridArr[y][x].set = setCounter
                let tempDiv = document.getElementById(y +"_"+ x)
                tempDiv.innerHTML = ""
                tempDiv.innerHTML = setCounter
                setCounter++
            //no border left
            } else if(!gridArr[y][x].left){
                gridArr[y][x].set = gridArr[y -1][x].set
                let tempDiv = document.getElementById(y +"_"+ x)
                tempDiv.innerHTML = ""
                tempDiv.innerHTML = gridArr[y -1][x].set
            //no border up
            } else if(!gridArr[y][x].up){
                gridArr[y][x].set = gridArr[y][x -1].set
                let tempDiv = document.getElementById(y +"_"+ x)
                tempDiv.innerHTML = ""
                tempDiv.innerHTML = gridArr[y][x -1].set
            } else {
                gridArr[y][x].set = setCounter
                let tempDiv = document.getElementById(y +"_"+ x)
                tempDiv.innerHTML = ""
                tempDiv.innerHTML = setCounter
                setCounter++
                mazeDone = false
            }
        }
    }

    //run through the grid once from the top left
    for (var y = ySize -1; y > -1; y--) {
        for (var x = xSize -1; x > -1; x--) {
            if(y == ySize && x == xSize){

        //no border right
        } else if(!gridArr[y][x].right){
                gridArr[y][x].set = gridArr[y +1][x].set
                let tempDiv = document.getElementById(y +"_"+ x)
                tempDiv.innerHTML = ""
                tempDiv.innerHTML = gridArr[y +1][x].set
            //no border down
        } else if(!gridArr[y][x].down){
                gridArr[y][x].set = gridArr[y][x +1].set
                let tempDiv = document.getElementById(y +"_"+ x)
                tempDiv.innerHTML = ""
                tempDiv.innerHTML = gridArr[y][x +1].set
            } else {

                //mazeDone = false
            }
        }
    }
    // if(!mazeDone){
    //     startMaze()
    // }
}


function checkSets(divY, divX, side){
    if(side === "left"){
        if(divY > 0 && gridArr[divY][divX].set !== gridArr[divY -1][divX].set){
            let divOne = document.getElementById(divY +"_"+ divX)
            let divTwo = document.getElementById((divY -1) +"_"+ divX)
            divOne.style.borderLeft = "0px"
            divOne.style.backgroundColor = "#bcc7ff"
            gridArr[divY][divX].left = false
            divTwo.style.borderRight = "0px"
            divTwo.style.backgroundColor = "#bcc7ff"
            gridArr[divY -1][divX].right = false
        }
    } else if(side === "up"){
        if(divX > 0 && gridArr[divY][divX].set !== gridArr[divY][divX -1].set){
            let divOne = document.getElementById(divY +"_"+ divX)
            let divTwo = document.getElementById(divY +"_"+ (divX -1))
            divOne.style.borderTop = "0px"
            divOne.style.backgroundColor = "#bcc7ff"
            gridArr[divY][divX].up = false
            divTwo.style.borderBottom = "0px"
            divTwo.style.backgroundColor = "#bcc7ff"
            gridArr[divY][divX -1].down = false
        }
    } else if(side === "right"){
        if(divY < ySize -1 && gridArr[divY][divX].set !== gridArr[divY +1][divX].set){
            let divOne = document.getElementById(divY +"_"+ divX)
            let divTwo = document.getElementById((divY +1) +"_"+ divX)
            divOne.style.borderRight = "0px"
            divOne.style.backgroundColor = "#bcc7ff"
            gridArr[divY][divX].right = false
            divTwo.style.borderLeft = "0px"
            divTwo.style.backgroundColor = "#bcc7ff"
            gridArr[divY +1][divX].left = false
        }
    } else if(side === "down"){
        if(divX < xSize -1 && gridArr[divY][divX].set !== gridArr[divY][divX +1].set){
            let divOne = document.getElementById(divY +"_"+ divX)
            let divTwo = document.getElementById(divY +"_"+ (divX +1))
            divOne.style.borderBottom = "0px"
            divOne.style.backgroundColor = "#bcc7ff"
            gridArr[divY][divX].down = false
            divTwo.style.borderTop = "0px"
            divTwo.style.backgroundColor = "#bcc7ff"
            gridArr[divY][divX +1].up = false
        }
    }
}

//takes a grid position and returns a random border side for it
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
