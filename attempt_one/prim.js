$(document).ready(function(){
    console.log("prim.js connected")
    let temp = $('#0_0').attr(set)
    console.log(temp);
    //initalize the prim variables.
    primInit()

    $("#primBtn").click(function(){

    })
})

// const xSize = 15
// const ySize = 15
// const boxSize = 30
// const preArr = []
// const doneArr = []
// const gridArr = []

function primInit(){
    for (var y = 0; y < ySize; y++) {
        gridArr[y] = []
        for (var x = 0; x < xSize; x++) {
            gridArr[y][x] = {

            }
        }
    }
}
