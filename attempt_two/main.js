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
const twoAway = [[0,-2], [-2, 0], [0, 2], [2, 0]]
const oneAway = [[0,-1], [-1,0], [0,1], [1,0]]


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
    addPotential(randX, randY)
}

function runStep(){
    let spot = Math.floor(Math.random() * potentialArr.length)
    let selected = potentialArr[spot]
    document.getElementById(selected.node[0] +"_"+ selected.node[1]).style.backgroundColor = "#3d3d3d"
    if(selected.between.length > 1){

    } else {

        addPotential(selected.between[0][0], selected.between[0][1])
    }
    potentialArr.splice(spot, 1)
}


function addPotential(xx, yy){
    //change selected node and add it to openArr
    let tempNode = gridArr[xx][yy].node
    gridArr[xx][yy].open = true
    tempNode.style.backgroundColor = "rgb(255, 255, 255)"
    openArr.push(tempNode)
    cleanArray(xx, yy)

    //check the four directs, 2 spots out, and then add them to the potentialArr
    for(let i = 0; i < twoAway.length; i++){
        let newX = +xx + twoAway[i][0]
        let newY = +yy + twoAway[i][1]
        let newNode = document.getElementById(newX+"_"+newY)
        if(newX > -1 && newX < xSize -1 && newY > -1 && newY < ySize -1){
            let checkExist = false
            let betweenX = +xx + (twoAway[i][0] /2)
            let betweenY = +yy + (twoAway[i][1] /2)
            let borderOpen = checkOneAround(newX, newY)

            if(!gridArr[newX][newY].open && !borderOpen){
                if(potentialArr.length > 0){
                    for(let place in potentialArr){
                        if(potentialArr[place].node === $('#'+newX+"_"+newY)){
                            potentialArr[place].between.push([betweenX, betweenY])
                            checkExist = true
                        }
                    }
                    if(!checkExist){

                        newNode.style.backgroundColor = "rgb(215, 222, 162)"
                        potentialArr.push({
                            node: [newX, newY],
                            between: [[betweenX, betweenY]]
                        })
                    }
                } else {
                    newNode.style.backgroundColor = "rgb(215, 222, 162)"
                    potentialArr.push({
                        node: [newX, newY],
                        between: [[betweenX, betweenY]]
                    })
                }
            }

        }
    }
}

function checkOneAround(xx, yy){
    for(let i = 0; i > oneAway.length; i++){
        if(gridArr[xx][yy].open){
            return true
        }
    }
    return false
}

function cleanArray(xx, yy){
    for(let place in potentialArr){
        for(let i = 0; i < oneAway.length; i++){
            let tempCheck = [(xx +oneAway[i][0]), (yy +oneAway[i][1])]
            if(potentialArr[place].node === tempCheck){
                potentialArr.splice(place, 1)
                if(gridArr[(xx +oneAway[i][0])][(yy +oneAway[i][1])].open){
                    document.getElementById(selected.node[0] +"_"+ selected.node[1]).style.backgroundColor = "rgb(176, 208, 166)"
                } else {
                    document.getElementById(selected.node[0] +"_"+ selected.node[1]).style.backgroundColor = "#beaf91"
                }

            }
        }
    }
}


function randomBetween(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
