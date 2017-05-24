$(document).ready(function(){
    console.log("main.js connected")

    drawGrid()

    $('#squaresBtn').click(function(){
        dropSquares()
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

const xSize = 100
const ySize = 100
const boxSize = 8
const gridArr = []
const potentialArr = []
const fourDirArr = [[0, -1], [-1, 0], [0, 1], [1, 0]]

const sqaureNumber = 200
const boxes = [[30, 30], [20, 20], [15, 15], [10, 10]]
const smallBox = 10

const colors = ["rgb(97, 197, 235)", "rgb(221, 31, 22)", "rgb(68, 168, 40)", "rgb(148, 33, 156)", "rgb(217, 241, 87)", "rgb(56, 227, 223)", "rgb(31, 228, 125)"]
var colorPos = 0

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

function dropSquares(){
    let boxPos = 0
    let randX, randY, check
 for (var i = 0; i < sqaureNumber; i++) {
     randX = randomBetween(0, xSize -smallBox)
     randY = randomBetween(0, ySize -smallBox)
     check = checkDrop(randX, randY, boxPos)
     console.log(check);

     if(check){
        doDrop(randX, randY, boxPos)
     }

     boxPos++
     if(boxPos >= boxes.length){
         boxPos = 0
     }
 }
}

function checkDrop(xx, yy, pos){
    let boxW = boxes[pos][0]
    let boxH = boxes[pos][1]
    let isOk = true
    let newX, newY
    if(xx + boxW < xSize && yy + boxH < ySize){
        for (var w = 0; w < boxW; w++) {
            for (var h = 0; h < boxH; h++) {
                newX = xx + w
                newY = yy + h
                if(gridArr[newX][newY].state === 1){
                    isOk = false
                }
            }
        }
    } else {
        isOk = false
    }
    return isOk
}

function doDrop(xx, yy, pos){
    let boxW = boxes[pos][0]
    let boxH = boxes[pos][1]
    let newX, newY
    for (let w = 0; w < boxW; w++) {
        for (let h = 0; h < boxH; h++) {
            newX = xx + w
            newY = yy + h
            gridArr[newX][newY].state = 1
            document.getElementById(newX +"_"+ newY).style.backgroundColor = colors[colorPos]
        }
    }
    colorPos++
    if(colorPos >= colors.length){
        colorPos = 0
    }
}

function randomBetween(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
