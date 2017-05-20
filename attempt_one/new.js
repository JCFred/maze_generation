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

            //note on 'gridArr[pos].sides'>>[left, up, right, down]
            createArray(y, x, setNum, tempDiv)
            setNum++
        }
    }
}

var connectCounter = -1
function startMaze(){
    let randY = Math.floor(Math.random() * gridArr.length)
    let randX = Math.floor(Math.random() * gridArr[randY].length)

    let arrPos = gridArr[randY][randX]
    let posSides = arrPos.sides
    let randSide = Math.floor(Math.random() * posSides.length)
    let side = posSides[randSide]
    let arrPosTwo = gridArr[randY +side[0]][randX +side[1]]

    if(arrPos.set !== arrPosTwo.set){
        dropWalls(arrPos.node, arrPosTwo.node, side[2])
        changeSets(arrPos.set, arrPosTwo.set)
        arrPos.node.style.backgroundColor = "#bcc7ff"
        posSides.splice(randSide, 1)
        arrPosTwo.node.style.backgroundColor = "#bcc7ff"
        //This is where done fucked up!!
        //So close... but now you need to delete the border walls of both divs
        //Also, need to change the sets on the array for both positions.
        //other than that... so close mother fucker
    }

}

function changeSets(setA, setB){
    for(let y in gridArr){
        for(let x in gridArr[y]){
            if(gridArr[y][x].set == setA || gridArr[y][x].set == setB){
                gridArr[y][x].set = connectCounter
                document.getElementById(y +"_"+ x).innerHTML = connectCounter
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
