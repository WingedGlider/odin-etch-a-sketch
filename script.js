const canvas = document.querySelector('.canvas');
var clicked = false;
canvas.addEventListener('click', () => {
    if(clicked){
        clicked = !clicked;
        return;
    }
    clicked = true;
});
generateCanvas();

function generateCanvas(val){
    for(let i = 16; i > 0; i--){
        let coldiv = document.createElement('div');
        coldiv.classList.add('col');
        for(let j = 16; j > 0; j--){
            let pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.addEventListener('mouseover', () => {
                if(clicked) pixel.style.backgroundColor = ('black');
            });
            coldiv.appendChild(pixel);
        } 
        canvas.appendChild(coldiv);
    }
}

