const canvas = document.querySelector('.canvas');
const save = document.querySelector('.save');
const saveButtons = document.querySelectorAll('.sav');
const color = document.querySelector('.color');
const range = document.querySelector('.range');
const reset = document.querySelector('.reset');
const brush = document.querySelector('.brush');
const pointer = document.querySelector('.pointer');
const eraser = document.querySelector('.eraser');
const rainbow = document.querySelector('.rainbow');
const egg = document.querySelector('.trans');
const grid = document.querySelector('.grid-enable');
const saves = new Array(4);
let sizeLabel = document.querySelector('.range-label');
let colorSelection = 'black';
let transval = 1;
let saveInstance = 0;
let brushEnabled = true;
let pixelEnabled = false;
let eraserEnabled = false;
let rainbowEnabled = false;
let canvArray = null;
let gridToggle = true;
let painting = false;
listenerInit();
generateCanvas(16);

function generateCanvas(val){
    for(let i = val; i > 0; i--){
        let coldiv = document.createElement('div');
        coldiv.classList.add('col');
        for(let j = val; j > 0; j--){
            let pixel = document.createElement('div');
            pixel.classList.add('pixel');
            coldiv.appendChild(pixel);
        } 
        canvas.appendChild(coldiv);
    }
    gridListenerInit();
    toggleGrid();
}

function changeSize(){
    sizeLabel.textContent = (range.value+ " x " +range.value);
    canvas.textContent = '';
    generateCanvas(range.value);
}

function toggleGrid(){
    canvArray = canvas.querySelectorAll('.pixel');
    if ((canvArray[0].classList.contains('grid')) && !gridToggle){ 
        canvArray.forEach(pixel => {
            pixel.classList.remove('grid');
        });
        return;
    }
    if (gridToggle){
        canvArray.forEach(pixel => {
            pixel.classList.add('grid');
        });
    }
}

function gridListenerInit(){
    canvArray = canvas.querySelectorAll('.pixel');
    canvArray.forEach(pixel => {
        pixel.addEventListener('mouseover', () => {
            if(brushEnabled && painting){ 
                if(rainbowEnabled) pixel.style.backgroundColor = ("#" + Math.floor(Math.random()*16777215).toString(16));
                else pixel.style.backgroundColor = (colorSelection);
                pixel.style.opacity = (transval);
            }
        });
        pixel.addEventListener('click', () => {
            if(pixelEnabled){ 
                if(rainbowEnabled) pixel.style.backgroundColor = ("#" + Math.floor(Math.random()*16777215).toString(16));
                else pixel.style.backgroundColor = (colorSelection);
                pixel.style.opacity = (transval);
            }
        });
    });
}

function listenerInit(){
    grid.addEventListener('click', ()=> {
        if(gridToggle){
            gridToggle = false;
            toggleGrid();
            grid.textContent = ('Enable Grid')
            grid.classList.remove('enabled')
        }
        else{
            gridToggle = true;
            toggleGrid();
            grid.textContent = ('Disable Grid')
            grid.classList.add('enabled')
        }
    });
    color.addEventListener('change', ()=> {
        colorSelection = color.value;
    });
    egg.addEventListener('click', ()=> {
        if(transval == 1){
            rainbowEnabled = false;
            rainbow.classList.remove('rainbow-enable');
            eraserEnabled = false;
            eraser.classList.remove('enabled');
            transval = 0;
            egg.classList.add('enabled');
        } 
        else {
        transval = 1;
        egg.classList.remove('enabled');
        }
    });
    eraser.addEventListener('click', ()=> {
        if (!eraserEnabled){
            colorSelection = 'white';
            eraserEnabled = true;
            eraser.classList.add('enabled');
            rainbowEnabled = false;
            rainbow.classList.remove('rainbow-enable');
            transval = 1;
            egg.classList.remove('enabled');
        }
        else{
            colorSelection = color.value
            eraserEnabled = false;
            eraser.classList.remove('enabled');
        }
    })
    rainbow.addEventListener('click', ()=> {
        if(!rainbowEnabled){
            rainbowEnabled = true;
            rainbow.classList.add('rainbow-enable');
            eraserEnabled = false;
            eraser.classList.remove('enabled');
            transval = 1;
            egg.classList.remove('enabled');
        } else {
            rainbowEnabled = false;
            rainbow.classList.remove('rainbow-enable');
        }
    })
    brush.addEventListener('click', ()=> {
        if(brushEnabled){ 
            brushEnabled = false;
            brush.classList.remove('enabled');
        }
        else{ 
            brushEnabled = true;
            pixelEnabled = false;
            pointer.classList.remove('enabled');
            brush.classList.add('enabled');
        }
    });
    pointer.addEventListener('click', ()=> {
        if(pixelEnabled) {
            pixelEnabled = false;
            pointer.classList.remove('enabled');
        }
        else{   
            pixelEnabled = true; 
            brushEnabled = false;
            brush.classList.remove('enabled');
            pointer.classList.add('enabled');
        }
    });
    range.addEventListener('change', ()=>{
        changeSize();
    });
    reset.addEventListener('click', ()=>{
        canvas.textContent = '';
        generateCanvas(range.value);
    });
    canvas.addEventListener('click', ()=>{
        if (!painting) painting = true;
        else painting = false;
    });
    save.addEventListener('click', ()=>{
        if (saveInstance >= 4){
            save.textContent = "Saves Full!"
        }
        if (saveInstance < 4){
        saveButtons[saveInstance].disabled = false;
        saves[saveInstance] = canvas.innerHTML;
        saveInstance++;
        }
    });
    saveButtons.forEach(button => {
        button.disabled = true; 
        button.addEventListener('click', () =>{
            canvas.textContent = '';
            canvas.innerHTML = saves[button.innerHTML-1];
            gridListenerInit();
        });   
    });
}
