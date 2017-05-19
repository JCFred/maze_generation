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

function startMaze(){
    let randY = Math.floor(Math.random() * gridArr.length)
    let randX = Math.floor(Math.random() * gridArr[randY].length)

    let arrPos = gridArr[randY][randX]
    let posSides = arrPos.sides
    let randSide = Math.floor(Math.random() * posSides.length)
    let side = posSides[randSide]
    let arrPosTwo = gridArr[randY +side[0]][randX +side[1]]

    if(arrPos.set !== arrPosTwo.set){
        arrPos.node.style.backgroundColor = "#bcc7ff"
        let tempString = "border"+ side[2]
        console.log(tempString);
        console.log(arrPos.node.style.tempString)
        posSides.splice(randSide, 1)
        arrPosTwo.node.style.backgroundColor = "#bcc7ff"
        //This is where done fucked up!!
        //So close... but now you need to delete the border walls of both divs
        //Also, need to change the sets on the array for both positions.
        //other than that... so close mother fucker



    }

}

function createArray(y, x, setNum, node){
    //top left corner
    if(y === 0 && x === 0){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[1, 0, "Right"],[0, 1, "Bottom"]]
        })
    //bottom left corner
    } else if(y === 0 && x === xSize -1){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[0, -1, "Top"],[1, 0, "Right"]]
        })
    //bottom right corner
    } else if(y === ySize -1 && x === 0){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "Left"],[0, -1, "Top"]]
        })
    //top right corner
    } else if(y === ySize -1 === xSize -1){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "Left"],[0, 1, "Bottom"]]
        })
    //left edge
    } else if(y == 0){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[0, -1, "Top"],[1, 0, "Right"],[0, 1, "Bottom"]]
        })
    //top edge
    } else if(x == 0){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "Left"],[1, 0, "Right"],[0, 1, "Bottom"]]
        })
    //right edge
    } else if(y == ySize -1){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "Left"],[0, -1, "Top"],[0, 1, "Bottom"]]
        })
    //bottom edge
    } else if(y == xSize -1){
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "Left"],[0, -1, "Top"],[1, 0, "Right"]]
        })
    //anywhere else in the middle
    } else{
        gridArr[y].push({
            set: setNum,
            node: node,
            sides: [[-1, 0, "Left"],[0, -1, "Top"],[1, 0, "Right"],[0, 1, "Bottom"]]
        })
    }
}
