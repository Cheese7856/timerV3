dayjs.extend(window.dayjs_plugin_customParseFormat);

function counterTo(start, slutt) {
    document.querySelector("#cp");

    const startDT = dayjs(start, "H:mm");
    const sluttDT = dayjs(slutt, "H:mm");

    const max = sluttDT.diff(startDT, "second");
    cp.setAttribute("max", max);

    setInterval(() => {
        const tekst = document.querySelector("#cp").shadowRoot.querySelector("svg > text")

        const nå = dayjs(); // nåtid

        const diffSek = sluttDT.diff(nå, "second"); // sekunder fra nå til t1

        const min = Math.floor(diffSek / 60);
        const sek = diffSek % 60;

        const resultat = `${min}:${sek.toString().padStart(2, "0")}`;
        console.log(resultat);
        console.log(tekst)
        tekst.innerHTML = resultat


        //Nå for sirkelgreien

        const value = nå.diff(startDT, "second")
        cp.setAttribute("value", value);

    }, 1000); // 1000 ms = 1 sekund
}

document.addEventListener("DOMContentLoaded", () => {
    counterTo("22:30", "22:50")
});