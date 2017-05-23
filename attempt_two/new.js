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
    updateGrid()
}


function updateGrid(){
    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            if(gridArr[x][y].open){
                gridArr[x][y].node.style.backgroundColor = "rgb(255, 255, 255)"
            } else if(gridArr[x][y].potential){
                gridArr[x][y].node.style.backgroundColor = "rgb(215, 222, 162)"
            } else {
                gridArr[x][y].node.style.backgroundColor = "#3d3d3d"
            }
        }
    }
}

function updateArrays(xx, yy){
    gridArr[xx][yy].open = true
    //change potentials directly bordering
    for(let i = 0; i < oneAway.length; i++){
        let newX = xx + oneAway[i][0]
        let newY = yy + oneAway[i][1]
        if(gridArr[newX][newY].potential){
            gridArr[newX][newY].potential = false
            findRemove(newX, newY)
        }
    }

    //add potential to those two out.
    for(let n = 0; n < twoAway.length; n++){
        let twoX = +xx + twoAway[n][0]
        let twoY = +yy + twoAway[n][1]

        if(twoX > -1 && twoX < xSize -1 && twoY > -1 && twoY < ySize -1){
            if(!gridArr[twoX][twoY].open){
                let checkForOpen = checkOneAround(twoX, twoY)
                if(checkForOpen < 1){
                    gridArr[twoX][twoY].potential = true
                    potentialArr.push([twoX, twoY])
                }
            }
        }
    }

    //run through potential array and update it
    for(let p = 0; p < potentialArr.length; p++){
        let tempX = potentialArr[p][0]
        console.log(tempX);
        let tempY = potentialArr[p][1]
        console.log(tempY);
        let count = checkOneAround(tempX, tempY)
        if(count > 0){
            gridArr[tempX][tempY].potential = false
            findRemove(tempX, tempY)
        }
    }
}

function findRemove(xx, yy){
    for(let spot in potentialArr){
        if(potentialArr[spot][0] == xx && potentialArr[spot][1] == yy){
            potentialArr.splice(spot, 1)
        }
    }
}

function checkOneAround(xx, yy){
    let tempNum = 0
    for(let i = 0; i > oneAway.length; i++){
        if(gridArr[xx + oneAway[i][0]][yy + oneAway[i][1]].open){
            tempNum++
        }
    }
    return tempNum
}

function randomBetween(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
