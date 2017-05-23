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

const xSize = 15
const ySize = 15
const boxSize = 30
const gridArr = []
const openArr = []
const potentialArr = []
const twoAway = [[0, -2], [-2, 0], [0, 2], [2, 0]]
const oneAway = [[0, -1], [-1, 0], [0, 1], [1, 0]]

function drawGrid(){
    var container = document.querySelector('.container')
    $('#container').empty()
    container.style.width = (xSize * boxSize) +"px"
    container.style.height = (ySize * boxSize) +"px"

    for (var x = 0; x < xSize; x++) {
        gridArr[x] = []
        for (var y = 0; y < ySize; y++) {
            let tempDiv = document.createElement('div')
            tempDiv.className = 'gridBox'
            tempDiv.id = x +"_"+ y
            tempDiv.style.width = boxSize +"px"
            tempDiv.style.height = boxSize +"px"
            tempDiv.setAttribute('y', y)
            tempDiv.setAttribute('x', x)
            container.append(tempDiv)

            gridArr[x][y] = {
                node:tempDiv,
                open: false,
                potential: false
            }
        }
    }
}

function startMaze(){
    let randX = randomBetween(1,13)
    let randY = randomBetween(1,13)
    updateArrays(randX, randY)
}

function updateArrays(xx, yy){

}

function checkOneAround(xx, yy){
    for(let i = 0; i > oneAway.length; i++){
        if(gridArr[xx][yy].open){
            return true
        }
    }
    return false
}

function randomBetween(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
