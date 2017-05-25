$(document).ready(function(){
    console.log("main.js connected")

    drawGrid()

    $('#ellerBtn').click(function(){
        startMaze()
    })

    $('#1Btn').click(function(){
        stepOne()
    })

    $('#2Btn').click(function(){
        startMaze()
    })

    $('#3Btn').click(function(){
        startMaze()
    })

    $('.container').click(function(event){
        if(event.target.classList.contains('gridBox')){
            console.log(event.target);
            let tempY = event.target.getAttribute('y')
            let tempX = event.target.getAttribute('x')

        }
    })
})

const xSize = 20
const ySize = 20
const boxSize = 30
const gridArr = []

const fourDirArr = [[0, -1], [-1, 0], [0, 1], [1, 0]]
const timeSet = 5

const rowSets = []
var rowPosition = 0

function drawGrid(){
    var container = document.querySelector('.container')
    $('#container').empty()
    container.style.maxWidth = (xSize * boxSize) +"px"
    container.style.minWidth = (xSize * boxSize) +"px"
    container.style.maxHeight = (ySize * boxSize) +"px"
    container.style.minHeight = (ySize * boxSize) +"px"

    for (let x = 0; x < xSize; x++) {
        gridArr[x] = []
        for (let y = 0; y < ySize; y++) {
            rowSets.push(y)
            let tempDiv = document.createElement('div')
            tempDiv.className = 'gridBox'
            tempDiv.id = x +"_"+ y
            tempDiv.style.width = boxSize +"px"
            tempDiv.style.height = boxSize +"px"
            tempDiv.setAttribute('y', y)
            tempDiv.setAttribute('x', x)
            container.append(tempDiv)

            gridArr[x][y] = {
                open: true,
                set:0
            }
        }
    }
}

function stepOne(){
    //list the row
    startSets()
    rightWalls()
    downWalls()
}

function startSets(){
    for (let x = 0; x < gridArr[rowPosition].length; x++) {
        gridArr[rowPosition][x].set = rowSets[x]
        document.getElementById(x +"_"+ rowPosition).innerHTML = rowSets[x]
    }
}

function rightWalls(){
    let atSide, passage, chance
    for (let x = 0; x < gridArr[rowPosition].length; x++) {
        atSide = (x === 0 || x === xSize -1)
        if(!atSide){
            passage = (gridArr[rowPosition][x-1].open && gridArr[rowPosition][x+1].open)
            if(passage){
                chance = randomBetween(1, 100)
                if(chance > 40){
                    rowSets[x] = gridArr[rowPosition][x-1].set
                    gridArr[rowPosition][x].set = rowSets[x]
                    document.getElementById(x +"_"+ rowPosition).innerHTML = rowSets[x]
                } else {
                    gridArr[rowPosition][x].open = false
                    document.getElementById(x +"_"+ rowPosition).style.backgroundColor = "rgb(101, 101, 101)"
                }
            }
        }
        gridArr[rowPosition][x].set = rowSets[x]
        document.getElementById(x +"_"+ rowPosition).innerHTML = rowSets[x]
    }
}

function downWalls(){
    rowPosition++
    let tempRowSets = []
    let atSide

//stuck about here!
//need to make an array of each number in rowSets, as each must have at least ONE down passage
//then create logic for each cell to determine if they must be one or have a random chance. 

    for (let x = 0; x < gridArr[rowPosition].length; x++) {
        atSide = (x === 0 || x === xSize -1)
        if(!atSide){

        }
    }
}


function randomBetween(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}




function startMaze(){
    let randX = randomBetween(1,xSize -1)
    let randY = randomBetween(1,ySize -1)
    updateArrays(randX, randY)
    runStep()
}

function runStep(){
    let randPos = randomBetween(0, potentialArr.length -1)
    let newPos = findPassage(randPos)
    if(newPos !== undefined){
        updateArrays(newPos[0], newPos[1])
    } else {
        console.log("step error")
    }
    setTimeout(runStep, timeSet)
}

function updateGrid(xx, yy){
    let startX = +xx -5
    let startY = +yy -5
    let newX, newY
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            newX = startX + x
            newY = startY + y
            if(newX > -1 && newX < xSize && newY > -1 && newY < ySize){
                if(gridArr[newX][newY].state === 2){
                    document.getElementById(newX +"_"+ newY).style.backgroundColor = "rgb(255, 255, 255)"
                } else if(gridArr[newX][newY].state === 1){
                    document.getElementById(newX +"_"+ newY).style.backgroundColor = "rgb(215, 222, 162)"
                } else if (gridArr[newX][newY].state === 0){
                    document.getElementById(newX +"_"+ newY).style.backgroundColor = "#3d3d3d"
                }
            }
        }
    }
}
