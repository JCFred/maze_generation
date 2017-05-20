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
            tempDiv.setAttribute('set', setNum)
            container.append(tempDiv)

            //note on 'gridArr[pos].sides'>>[left, up, right, down]
            createArray(y, x, setNum, tempDiv)
            setNum++
        }
    }
}

var connectCounter = -1
function startMaze(){
    let randPos = getRandom()

    let arrPos = gridArr[randPos[0]][randPos[1]]
    let posSides = arrPos.sides
    let randSide = Math.floor(Math.random() * posSides.length)
    let side = posSides[randSide]

    let newNode = document.getElementById((+randPos[0] +side[0]) +"_"+ (+randPos[1] +side[1]))
    if(newNode !== undefined){
        let setTwo = newNode.getAttribute('set')
        let setOne = arrPos.node.getAttribute('set')

        if(setOne !== setTwo){

            let posTwoArr = []
            for(let checkY in gridArr){
                for(let checkX in gridArr[checkY]){
                    if(gridArr[checkY][checkX].node === newNode) {
                        posTwoArr = [checkY, checkX]
                        break;
                    }
                }
            }
            let arrPosTwo = gridArr[posTwoArr[0]][posTwoArr[1]]

            dropWalls(arrPos.node, arrPosTwo.node, side[2])
            changeSets(arrPos.set, arrPosTwo.set)
            updateArray(randPos, posTwoArr, side[2])
            arrPos.node.style.backgroundColor = "#bcc7ff"
            arrPosTwo.node.style.backgroundColor = "#bcc7ff"

            //remove sides from array
            posSides.splice(randSide, 1)

        }
    }

    if(gridArr.length > 1){
        startMaze()
    }
}

function getRandom(){
    let allGood = false
    let randY, randX
    while(!allGood){
        randY = Math.floor(Math.random() * gridArr.length)
        if(gridArr[randY].length > 0){
            randX = Math.floor(Math.random() * gridArr[randY].length)
            if(gridArr[randY][randX].sides.length > 1){
                allGood = true
            }
        }
    }
    return [randY, randX]
}

function updateArray(posA, posB, side){
    let oppSide
    switch(side){
        case "left":
            oppSide = "right"
            break;
        case "top":
            oppSide = "bottom"
            break;
        case "right":
            oppSide = "left"
            break;
        case "bottom":
            oppSide = "top"
            break
    }
    let arrPosA = gridArr[posA[0]][posA[1]]
    let arrPosB = gridArr[posB[0]][posB[1]]
    for(let matchA in arrPosA.sides){
        if(arrPosA.sides[matchA][2] === side){
            arrPosA.sides.splice(matchA, 1)
            if(arrPosA.sides.length < 1){
                gridArr[posA[0]].splice([posA[1]], 1)
                console.log(gridArr[posA[0]].length);
            }
        }
    }
    for(let matchB in arrPosB.sides){
        if(arrPosB.sides[matchB][2] === oppSide){
            arrPosB.sides.splice(matchB, 1)
            if(arrPosB.sides.length < 1){
                gridArr[posB[0]].splice([posB[1]], 1)
                console.log(gridArr[posB[0]].length);
            }
        }
    }
}

function changeSets(setA, setB){
    for(let y in gridArr){
        for(let x in gridArr[y]){
            if(gridArr[y][x].set == setA || gridArr[y][x].set == setB){
                gridArr[y][x].set = connectCounter
                document.getElementById(y +"_"+ x).innerHTML = connectCounter
                document.getElementById(y +"_"+ x).setAttribute('set', connectCounter)
            }
        }
    }
    connectCounter--
}

function dropWalls(nodeA, nodeB, side){
    switch(side){
        case "left":
            nodeA.style.borderLeft = "0px"
            nodeB.style.borderRight = "0px"
            break;
        case "top":
            nodeA.style.borderTop = "0px"
            nodeB.style.borderBottom = "0px"
            break;
        case "right":
            nodeA.style.borderRight = "0px"
            nodeB.style.borderLeft = "0px"
            break;
        case "bottom":
            nodeA.style.borderBottom = "0px"
            nodeB.style.borderTop = "0px"
            break;
    }
}

function createArray(y, x, setNum, node){
    //top left corner
    if(y === 0 && x === 0){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[1, 0, "right"],[0, 1, "bottom"]]
        })
    //bottom left corner
    } else if(y === 0 && x === xSize -1){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[0, -1, "top"],[1, 0, "right"]]
        })
    //bottom right corner
    } else if(y === ySize -1 && x === 0){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "left"],[0, -1, "top"]]
        })
    //top right corner
    } else if(y === ySize -1 === xSize -1){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "left"],[0, 1, "bottom"]]
        })
    //left edge
    } else if(y == 0){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[0, -1, "top"],[1, 0, "right"],[0, 1, "bottom"]]
        })
    //top edge
    } else if(x == 0){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "left"],[1, 0, "right"],[0, 1, "bottom"]]
        })
    //right edge
    } else if(y == ySize -1){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "left"],[0, -1, "top"],[0, 1, "bottom"]]
        })
    //bottom edge
} else if(x == xSize -1){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "left"],[0, -1, "top"],[1, 0, "right"]]
        })
    //anywhere else in the middle
    } else{
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "left"],[0, -1, "top"],[1, 0, "right"],[0, 1, "bottom"]]
        })
    }
}
