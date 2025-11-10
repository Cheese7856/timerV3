const cp = document.querySelector("#cp");
const tekst = document.querySelector("#timerTekst");

let pipAktiv = false;
let pipVideo = null;

let startDT
let sluttDT
let navn
let diffSek

function drawPipCountdown(min, sek) {
    const canvas = document.getElementById("pipCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Beregn hvor mange sekunder som er igjen totalt
    const totalSekIgjen = min * 60 + sek;

    // Bestem standard bakgrunn: hvit, eller blå hvis body har klassen darkMode
    const erDark = document.body.classList.contains("darkMode");
    const standardBakgrunn = erDark ? "#1c1c1d" : "white";
    const tekstFarge = erDark ? "white" : "black";

    // Siste 10 sekunder: blink rød/standardBakgrunn annenhvert sekund
    let bakgrunn = standardBakgrunn;
    if (totalSekIgjen <= 10) {
        bakgrunn = (totalSekIgjen % 2 === 0) ? "red" : standardBakgrunn;
    }

    ctx.fillStyle = bakgrunn;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = tekstFarge;
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${min}:${sek.toString().padStart(2, "0")}`, canvas.width / 2, canvas.height / 2);
}

function counterTo(start, slutt, navnevan) {
    const cp = document.querySelector("#cp");
    startDT = dayjs(start, "HH:mm");
    sluttDT = dayjs(slutt, "HH:mm");
    navn = navnevan
    const max = sluttDT.diff(startDT, "second");
    cp.setAttribute("max", max);

    timerLoop = setInterval(() => { // Remove 'const' to use the global variable
        opdater()

        if (diffSek <= 0) {
            clearInterval(timerLoop);
            diffSek = 999
            window.gjørAlt();
        }
    }, 1000);
}

function opdater() {
    const nå = dayjs();
    diffSek = sluttDT.diff(nå, "second");
    const min = Math.floor(diffSek / 60);
    const sek = diffSek % 60;
    const resultat = `${min}:${sek.toString().padStart(2, "0")}`;


    if (document.body.classList.contains("visning3")) {
        tekst.innerHTML = `${resultat}<br><span>${navn}</span>`;
    } else {
        tekst.innerHTML = resultat;
    }

    document.title = `${resultat}`

    // Oppdater PiP hvis aktiv
    if (pipAktiv) {
        drawPipCountdown(min, sek);
    }

    const value = nå.diff(startDT, "second");
    cp.value = value;
}


function pip() {
    const canvas = document.getElementById("pipCanvas");
    const stream = canvas.captureStream();
    if (!pipVideo) {
        pipVideo = document.createElement("video");
        pipVideo.srcObject = stream;
    }
    pipAktiv = true;
    pipVideo.play().then(() => {
        pipVideo.requestPictureInPicture();
    }).catch(console.error);
}
