const matrixCols = 30;
const matrixRows = 75;
let playing = false;

const div = document.querySelector('div')
div.addEventListener('dragstart', (e) => {
  e.preventDefault()
})

div.addEventListener('drop', (e) => {
  e.preventDefault()
})

function generateBord(){
    let bord = document.getElementById('bord')
    for(let row = 0; row < 30; row++){
        let element = document.createElement(`div`)
        element.id = `row ${row}`
        element.className = 'bord-row'
        for(let col = 0; col < 75; col++){
            let other_element = document.createElement('div')
            other_element.id = `${row}-${col}`
            other_element.className = 'bord-col unvisited'
            if(row == 14 && col == 19){
                other_element.innerHTML = '<i class="fa-solid fa-play start" id="start"></i>'
                other_element.addEventListener('mousedown', toRemoveListenerOnStart)
                bord.addEventListener('mouseup', toAddListenerOnStart)
                let s = other_element.children[0]
                s.addEventListener('mousedown', moveStart)
            }else if(row == 14 && col == 57){
                other_element.innerHTML = '<i class="fa-solid fa-bullseye exit" id="exit"></i>'
                other_element.addEventListener('mousedown', toRemoveListenerOnStart)
                bord.addEventListener('mouseup', toAddListenerOnStart)
                let e = other_element.children[0]
                e.addEventListener('mousedown', moveExit)
            }
            other_element.addEventListener('mousedown', toAddListener)
            other_element.addEventListener('mouseup', toRemoveListener)
            other_element.addEventListener('click', visitElement)
            element.appendChild(other_element)
        }
        bord.appendChild(element)
    }
}

function visitElement(){
    let element = this.id.split('-')
    let row = element[0]
    let col = element[1]
    let elementToChange = document.getElementById(`${row}-${col}`)
    if(elementToChange.children.length > 0){
        if('unvisited' == elementToChange.classList[1] && !elementToChange.children[0].classList.contains('start') && !elementToChange.children[0].classList.contains('exit')){
            elementToChange.className = 'bord-col visited'
            elementToChange.style.backgroundColor = 'rgb(148, 43, 5)'
        }else{
            elementToChange.className = 'bord-col unvisited'
            elementToChange.style.backgroundColor = 'white'
        }
    }else{
        if('unvisited' == elementToChange.classList[1]){
            elementToChange.className = 'bord-col visited'
            elementToChange.style.backgroundColor = 'rgb(148, 43, 5)'
            if(playing){
                clearPath()
                play()
            }
        }else{
            elementToChange.className = 'bord-col unvisited'
            elementToChange.style.backgroundColor = 'white'
            if(playing){
                clearPath()
                play()
            }
        }
    }
}

function toAddListener(){
    for(let row = 0; row < 30; row++){
        for(let col = 0; col < 75; col++){
            let element = document.getElementById(`${row}-${col}`)
            element.addEventListener('mouseover', visitElement)
        }
    }
}

function toRemoveListener(){
    for(let row = 0; row < 30; row++){
        for(let col = 0; col < 75; col++){
            let element = document.getElementById(`${row}-${col}`)
            element.removeEventListener('mouseover', visitElement)
        }
    }
}

function toAddListenerOnStart(){
    for(let row = 0; row < 30; row ++){
        for(let col = 0; col < 70; col++){
            let element = document.getElementById(`${row}-${col}`)
            element.addEventListener('mousedown', toAddListener)
        }
    }
}

function toRemoveListenerOnStart(){
    for(let row = 0; row < 30; row ++){
        for(let col = 0; col < 70; col++){
            let element = document.getElementById(`${row}-${col}`)
            element.removeEventListener('mouseover', visitElement)
            element.removeEventListener('mousedown', toAddListener)
        }
    }
}

function moveStart(){
    document.body.style.cursor = 'url("arrow.png"), auto'
    let s = document.getElementById('start')
    let sParent = s.parentElement
    sParent.removeChild(s)
    let sqrs = document.getElementsByClassName('bord-col')
    for(let i of sqrs){
        i.addEventListener('mouseover', moveStartPartOne)
        i.addEventListener('mouseout', moveStartPartTwo)
        i.addEventListener('mouseup', moveStartPartThree)
    }
}

function moveStartPartOne(){
    let element = this
    element.addEventListener('mousedown', toRemoveListenerOnStart)
    element.innerHTML = '<div class="start" id="start"></div>'
    if(playing){
        clearPath()
        play()
    }
}

function moveStartPartTwo(){
    let element = this
    element.innerHTML = ''
}

function moveStartPartThree(){
    document.body.style.cursor = ''
    let element = this
    element.addEventListener('mousedown', moveStart)
    element.innerHTML = '<i class="fa-solid fa-play start" id="start"></i>'
    let sqrs = document.getElementsByClassName('bord-col')
    for(let i of sqrs){
        i.removeEventListener('mouseover', moveStartPartOne)
        i.removeEventListener('mouseout', moveStartPartTwo)
        i.removeEventListener('mouseup', moveStartPartThree)
    }
}

function moveExit(){
    document.body.style.cursor = 'url("aim.png"), auto'
    let e = document.getElementById('exit')
    let eParent = e.parentElement
    eParent.removeChild(e)
    let sqrs = document.getElementsByClassName('bord-col')
    for(let i of sqrs){
        i.addEventListener('mouseover', moveExitPartOne)
        i.addEventListener('mouseout', moveExitPartTwo)
        i.addEventListener('mouseup', moveExitPartThree)
    }
}

function moveExitPartOne(){
    let element = this
    element.addEventListener('mousedown', toRemoveListenerOnStart)
    element.innerHTML = '<div class="exit" id="exit"></div>'
    if(playing){
        clearPath()
        play()
    }
}

function moveExitPartTwo(){
    let element = this
    element.innerHTML = ''
}

function moveExitPartThree(){
    document.body.style.cursor = ''
    let element = this
    element.addEventListener('mousedown', moveExit)
    element.innerHTML = '<i class="fa-solid fa-bullseye exit" id="exit"></i>'
    let sqrs = document.getElementsByClassName('bord-col')
    for(let i of sqrs){
        i.removeEventListener('mouseover', moveExitPartOne)
        i.removeEventListener('mouseout', moveExitPartTwo)
        i.removeEventListener('mouseup', moveExitPartThree)
    }
}

function clearPath(){
    for(let i = 0; i < matrixCols; i++){
        for(let j = 0; j < matrixRows; j++){
            let element = document.getElementById(`${i}-${j}`)
                if(element.classList.contains('visited')){
                    element.style.backgroundColor = 'rgb(148, 43, 5)'
                }else if(element.classList.contains('unvisited')){
                    element.style.backgroundColor = 'white'
                }
        }
    }
}


function generateMatrix(){
    let matrix = []
    let cnt = 0
    let rows = document.getElementsByClassName('bord-row')
    for(let i of rows){
        matrix.push([])
        for(let j of i.children){
            if(j.children.length > 0){
                if(j.children[0].classList.contains('start')){
                    matrix[cnt].push('s')
                }else{
                    matrix[cnt].push('e')
                }
            }else{
                if(j.classList.contains('unvisited')){
                    matrix[cnt].push(0)
                }else{
                    matrix[cnt].push('x')
                }
            }
        }
        cnt++
    }
    return matrix
}

function heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);
  
    return d1 + d2;
}

function GridPoint(x, y, val) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.parent = undefined;
    this.val = val
  
    this.updateNeighbors = function (grid) {
      let i = this.x;
      let j = this.y;
      if (i < matrixCols - 1 && grid[i + 1][j].val != 'x') {
        this.neighbors.push(grid[i + 1][j]);
      }
      if (i > 0 && grid[i - 1][j].val != 'x') {
        this.neighbors.push(grid[i - 1][j]);
      }
      if (j < matrixRows - 1 && grid[i][j + 1].val != 'x') {
        this.neighbors.push(grid[i][j + 1]);
      }
      if (j > 0 && grid[i][j - 1].val != 'x') {
        this.neighbors.push(grid[i][j - 1]);
      }
    };
}

function init(maze) {
    for (let i = 0; i < matrixCols; i++) {
      for (let j = 0; j < matrixRows; j++) {
        let temp = maze[i][j]
        maze[i][j] = new GridPoint(i, j, temp);
      }
    }
  
    for (let i = 0; i < matrixCols; i++) {
      for (let j = 0; j < matrixRows; j++) {
        maze[i][j].updateNeighbors(maze);
      }
    }
}

function getPositions(maze){
    let start
    let end
    for(let i = 0; i < maze.length; i++){
        for(let j = 0; j < maze[0].length; j++){
            if(maze[i][j] == 's'){
                start = [i, j]
            }else if(maze[i][j] == 'e'){
                end = [i, j]
            }
        }
    }
    return [start, end]
}

function drawPath(lst, color){
    if(!playing){
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
        const loop = async () => {
        for(let i of lst){
            let element = document.getElementById(`${i[0]}-${i[1]}`)
            element.style.backgroundColor = color
            await wait(50)
    }
    }
    loop()
    }else{
        for(let i of lst){
            let element = document.getElementById(`${i[0]}-${i[1]}`)
            element.style.backgroundColor = color
    }
    }
}

function astar(maze, startPos, endPos) {
    init(maze);
    let start = maze[startPos[0]][startPos[1]]
    let end = maze[endPos[0]][endPos[1]]
    let openSet = [];
    let closedSet = [];
    let path = [];
    openSet.push(start);
    while (openSet.length > 0) {
        //let lst = []
        //for(let i of openSet){
        //lst.push([i['x'], i['y']])
        //}
        //drawPath(lst, 'blue')
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      let current = openSet[lowestIndex];
  
      if (current === end) {
        let temp = current;
        path.push(temp);
        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }
        return path.reverse();
      }
      openSet.splice(lowestIndex, 1);
      closedSet.push(current);
  
      let neighbors = current.neighbors;
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
  
        if (!closedSet.includes(neighbor)) {
          let possibleG = current.g + 1;
  
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          } else if (possibleG >= neighbor.g) {
            continue;
          }
  
          neighbor.g = possibleG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }
  
    return [];
}

function play(){
    let maze = generateMatrix()
    let [startPos, endPos] = getPositions(maze)
    let path = astar(maze, startPos, endPos)
    let lst = []
    for(let i of path){
        lst.push([i['x'], i['y']])
    }
    drawPath(lst, 'green')
    playing = true
}

function clearWalls(){
    let bord = document.getElementById('bord')
    for(let i of bord.children){
        for(let j of i.children){
            j.className = 'bord-col unvisited'
            j.backgroundColor = 'white'
        }
    }
    clearPath()
    if(playing){
        play()
    }
}

function restart(){
    playing = false
    let bord = document.getElementById('bord')
    bord.innerHTML = ''
    generateBord()
}
