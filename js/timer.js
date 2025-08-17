const resultat = 0

function counterTo(start, slutt) {
    const cp = document.querySelector("#cp");

    const startDT = dayjs(start, "HH:mm");
    const sluttDT = dayjs(slutt, "HH:mm");

    const max = sluttDT.diff(startDT, "second");
    cp.setAttribute("max", max);

    const timerLoop = setInterval(() => {
        const cp = document.querySelector("#cp");
        const tekst = document.querySelector("#timerTekst");

        const nå = dayjs(); // nåtid



        const diffSek = sluttDT.diff(nå, "second"); // sekunder fra nå til t1

        const min = Math.floor(diffSek / 60);
        const sek = diffSek % 60;




        const resultat = `${min}:${sek.toString().padStart(2, "0")}`;

        tekst.innerHTML = resultat;

        //Nå for sirkelgreien

        const value = nå.diff(startDT, "second");
        cp.value = value;


        if (diffSek <= 0) {
            clearInterval(timerLoop);
        }

    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    counterTo("17:20", "17:40")
});


function pip() {
    console.log("aaa")
}