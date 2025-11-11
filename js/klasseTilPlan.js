// const response = await fetch('klasser/9E copy.json');
// const klasseData = await response.json();

const klasserJSON = await fetch("klasser.json");
const klasserData = await klasserJSON.json();

var valgtKlasse = localStorage.getItem("klasse") || "9E";

async function hentKlasse() {
    const klasseFil = await fetch(klasserData[valgtKlasse].json)
    const klasseData = await klasseFil.json()
    console.log(klasseData)
    return klasseData
}


const klasseData = await hentKlasse();

console.log(klasseData)

const klassevelger = document.getElementById("klassevelger")

klassevelger.selectedIndex = klasserData[valgtKlasse].index;

function endreKlasse() {
    const verdi = klassevelger.value
    if (verdi != "") {
        console.log("Endrer klasse til " + verdi)
        localStorage.setItem("klasse", verdi)
        valgtKlasse = verdi
        location.reload();
    }
}


window.endreKlasse = endreKlasse;


function render(time, iTime) {
    document.getElementById("timeH").innerHTML = iTime ? "Time:" : "Neste time:";
    document.getElementById("time").innerHTML = time.Navn
    document.getElementById("timeTekst").innerHTML = time.Navn

    document.getElementById("lærer").innerHTML = time.Lærer.join(" og ")

    const startTid = dayjs(time.Start, "HH:mm")
    const sluttTid = dayjs(time.Slutt, "HH:mm")

    document.getElementById("lengde").innerHTML = sluttTid.diff(startTid, "m") + " minutter"

    document.getElementById("start").innerHTML = time.Start
    document.getElementById("slutt").innerHTML = time.Slutt

    if (klasseData.Lenker[time.Navn]) {
        document.getElementById("classroom").setAttribute("href", klasseData.Lenker[time.Navn] || "")
    } else {
        document.getElementById("classroom").removeAttribute("href")
    }
}

function loopTilNeste(timeplanDag, d) {
    for (let i = 0; i < timeplanDag.length; i++) {
        const v = timeplanDag[i];
        console.log(v);

        const startDT = dayjs(v.Start, "HH:mm")
        const sluttDT = dayjs(v.Slutt, "HH:mm")

        console.log(startDT.isAfter(d), sluttDT.isAfter(d))

        if (sluttDT.isAfter(d)) {
            return (i);
        }
    }
}

function oddetallsUke(nesteTime, d) {
    const ukeNummer = d.isoWeek()

    if ((ukeNummer % 2) == 1) {
        for (const i in nesteTime.Oddetall) {
            nesteTime[i] = nesteTime.Oddetall[i]
        }
    }

    return nesteTime
}

function gjørAlt(klasse) {
    console.log("Start av gjøralt")
    // const d = dayjs("09:35", "HH:mm"); //dummy tid, skal være dayjs();
    const d = dayjs()

    const dager = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

    const ukedag = dager[d.day()]
    // const ukedag = "Onsdag"

    const timeplanDag = klasseData.Timeplan[ukedag]

    console.log(timeplanDag)



    const nesteID = loopTilNeste(timeplanDag, d)
    let nesteTime = timeplanDag[nesteID]

    if (!nesteTime) {

        document.querySelector("#timerTekst").innerHTML = `Ingen time`
        return (null)
    }

    nesteTime = oddetallsUke(nesteTime, d)

    const startTid = dayjs(nesteTime.Start, "HH:mm");
    if (startTid.isAfter(d)) {
        //I et Friminutt

        document.body.classList.add("friminutt")

        render(nesteTime, false)
        // counterTo("09:50", "10:09")

        if (nesteID == 0) {
            counterTo("00:00", nesteTime.Start, nesteTime.Navn)
            console.log("Counter:", "00:00", nesteTime.Start)
        } else {
            counterTo(timeplanDag[nesteID - 1].Slutt, nesteTime.Start, nesteTime.Navn)
            console.log("Counter:", timeplanDag[nesteID - 1].Slutt, nesteTime.Start)
        }


    } else {
        //I en Time

        document.body.classList.remove("friminutt")

        console.log("Counter:", nesteTime.Start, nesteTime.Slutt)

        // counterTo("08:55", "9:45")
        counterTo(nesteTime.Start, nesteTime.Slutt, nesteTime.Navn)

        render(nesteTime, true)
    }

}

gjørAlt()

window.gjørAlt = gjørAlt;