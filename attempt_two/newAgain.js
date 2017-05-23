$(document).ready(function(){
    console.log("main.js connected")

    drawGrid()

    $('#primBtn').click(function(){
        startMaze()
    })

    $('#runBtn').click(function(){
        runStep()
    })

    $('.container').click(function(event){
        if(event.target.classList.contains('gridBox')){
            console.log(event.target);
            let tempY = event.target.getAttribute('y')
            let tempX = event.target.getAttribute('x')
            console.log(gridArr[tempX][tempY]);
        }
    })
})

const xSize = 50
const ySize = 50
const boxSize = 10
const gridArr = []
const potentialArr = []
const fourDirArr = [[0, -1], [-1, 0], [0, 1], [1, 0]]

function drawGrid(){
    var container = document.querySelector('.container')
    $('#container').empty()
    container.style.width = (xSize * boxSize) +"px"
    container.style.height = (ySize * boxSize) +"px"

    for (let x = 0; x < xSize; x++) {
        gridArr[x] = []
        for (let y = 0; y < ySize; y++) {
            let tempDiv = document.createElement('div')
            tempDiv.className = 'gridBox'
            tempDiv.id = x +"_"+ y
            tempDiv.style.width = boxSize +"px"
            tempDiv.style.height = boxSize +"px"
            tempDiv.setAttribute('y', y)
            tempDiv.setAttribute('x', x)
            container.append(tempDiv)

            gridArr[x][y] = {
                state:0
            }
        }
    }
}

function startMaze(){
    let randX = randomBetween(1,13)
    let randY = randomBetween(1,13)
    updateArrays(randX, randY)
}

function runStep(){
    let randPos = randomBetween(0, potentialArr.length -1)
    let newPos = findPassage(randPos)
    if(newPos !== undefined){
        updateArrays(newPos[0], newPos[1])
    } else {
        console.log("step error")
    }
    setTimeout(runStep, 50)
}

function updateArrays(xx, yy){
    gridArr[xx][yy].state = 2
    removePossibles()
    setPossibles()
    updateGrid()
}

function updateGrid(){
    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            if(gridArr[x][y].state === 2){
                document.getElementById(x +"_"+ y).style.backgroundColor = "rgb(255, 255, 255)"
            } else if(gridArr[x][y].state === 1){
                document.getElementById(x +"_"+ y).style.backgroundColor = "rgb(215, 222, 162)"
            } else if (gridArr[x][y].state === 0){
                document.getElementById(x +"_"+ y).style.backgroundColor = "#3d3d3d"
            }
        }
    }
}

function findPassage(randPos){
    let xx = potentialArr[randPos][0]
    let yy = potentialArr[randPos][1]
    let tempArr = []
    let newX, newY, count
    for(let i = 0; i < fourDirArr.length; i++){
        newX = xx + fourDirArr[i][0]
        newY = yy + fourDirArr[i][1]
        if(newX > -1 && newX < xSize && newY > -1 && newY < ySize){
            if(gridArr[newX][newY].state === 0){
                count = checkOneAround(newX, newY)
                if(count === 1){
                    tempArr.push([newX, newY])
                }
            }
        }
    }
    if(tempArr.length > 0){
        let newRand = randomBetween(0, tempArr.length -1)
        newX = tempArr[newRand][0]
        newY = tempArr[newRand][1]
        return [newX, newY]
    } else {
        runStep()
    }


}

//remove all state === 1 from the gridArr
function removePossibles(){
    potentialArr.splice(0, potentialArr.length)
    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            if(gridArr[x][y].state === 1){
                gridArr[x][y].state = 0
            }
        }
    }
}

//set the new state === 1 on the gridArr
function setPossibles(){
    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            if(gridArr[x][y].state === 2){
                twoAwayCheck(x, y)
            }
        }
    }
}

function twoAwayCheck(xx, yy){
    let newX, newY, test
    for (let i = 0; i < fourDirArr.length; i++) {
        newX = xx + (fourDirArr[i][0] *2)
        newY = yy + (fourDirArr[i][1] *2)

        if(newX > -1 && newX < xSize && newY > -1 && newY < ySize){
            if(gridArr[newX][newY].state == 0){
                test = checkPossible(newX, newY)
                if(test){
                    gridArr[newX][newY].state = 1
                    potentialArr.push([newX, newY])
                }
            }
        }
    }
}

function checkPossible(xx, yy){
    let firstCount = checkOneAround(xx, yy)
    if(firstCount < 1){
        let newX, newY, count
        for (let i = 0; i < fourDirArr.length; i++) {
            newX = xx + (fourDirArr[i][0])
            newY = yy + (fourDirArr[i][1])
            count = checkOneAround(newX, newY)
            if(gridArr[newX] !== undefined && gridArr[newX][newY] !== undefined){
                if(gridArr[newX][newY].state !== 2 && count < 2){
                    return true
                }
            }
        }
    }
    return false
}

function findRemove(xx, yy){
    for(let spot in potentialArr){
        if(potentialArr[spot][0] == xx && potentialArr[spot][1] == yy){
            potentialArr.splice(spot, 1)
        }
    }
}

function checkOneAround(xx, yy){
    let newX, newY
    let tempNum = 0
    for(let i = 0; i < fourDirArr.length; i++){
        newX = xx + fourDirArr[i][0]
        newY = yy + fourDirArr[i][1]
        if(newX > 0 && newX < xSize-1 && newY > 0 && newY < ySize -1){
            if(gridArr[newX][newY].state === 2){
                tempNum++
            }
        }
    }
    return tempNum
}

function randomBetween(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
