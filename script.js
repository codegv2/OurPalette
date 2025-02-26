let paltts;

async function cargarDatos() {
    try {
        const response = await fetch('./palettes.json');
        
        if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON');
        }
        paltts = await response.json();

        let innerButton = document.getElementById("innerbutton");
        let outerButton = document.getElementById("outerbutton");
        let body = document.body;

        const buttonPushFx = new Audio("buttonpushfx.mp3");

        const paragraphs = document.querySelectorAll(".paragraph");
        const slideButtons = document.querySelectorAll(".btn");

        const forwardButton = document.getElementById("fwd");
        const backButton = document.getElementById("bck");

        let paletteName = document.getElementById("paletteName");
        let backgroundColorName = document.getElementById("backgroundColorName");
        let obColor = document.getElementById("obColor");
        let ibColor = document.getElementById("ibColor");

        let properties;
        let currentPaletteNumber;
        let currentPalette

        properties = Object.keys(paltts);
        currentPaletteNumber = 0;
        currentPalette = paltts[properties[currentPaletteNumber]];

        console.log("Palettes array length:",properties.length);

        function paletteChange() {
            currentPalette = paltts[properties[currentPaletteNumber]];
            body.style.backgroundColor = currentPalette.bckColor.htmlCode;
            outerButton.style.backgroundColor = currentPalette.obColor.htmlCode;
            innerButton.style.backgroundColor = currentPalette.ibColor.htmlCode;
            paragraphs.forEach(par => {
                par.style.color = currentPalette.textColor.htmlCode;
            });
            slideButtons.forEach(btn => {
                btn.style.color = currentPalette.textColor.htmlCode;
                btn.style.backgroundColor = currentPalette.bckColor.htmlCode;
            });
            paletteName.textContent = currentPalette.palName;
            backgroundColorName.textContent = `Background Color: ${currentPalette.bckColor.colorName}, ${currentPalette.bckColor.htmlCode}`;
            obColor.textContent = `Outer Button Color: ${currentPalette.obColor.colorName}, ${currentPalette.obColor.htmlCode}`;
            ibColor.textContent = `Inner Button Color: ${currentPalette.ibColor.colorName}, ${currentPalette.ibColor.htmlCode}`;
        };

        forwardButton.addEventListener("click", () => {
            if (currentPaletteNumber < properties.length-1) {
                currentPaletteNumber += 1;
                paletteChange();
            }
            else {
                currentPaletteNumber = 0;
                paletteChange();
            };
        });
        backButton.addEventListener("click", () => {   
            if (currentPaletteNumber > 0) {
                currentPaletteNumber -= 1;
                paletteChange();
            }
            else {
                currentPaletteNumber = properties.length-1;
                paletteChange();
            };
        });

        innerButton.addEventListener("mousedown", () => {
            buttonPushFx.play();
            innerButton.style.backgroundColor = currentPalette.iibColor.htmlCode;
        });
        innerButton.addEventListener("mouseup", () => {
            innerButton.style.backgroundColor = currentPalette.ibColor.htmlCode;
        });

        paletteChange();

    } catch (error) {
        console.error('Error:', error);
    }
}

cargarDatos();