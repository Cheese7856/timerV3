const response = await fetch('klasser/9E.json');
const klasseData = await response.json();



const d = dayjs("13:25", "HH:mm");

const dager = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

//const ukedag = dager[d.day()]
const ukedag = "Torsdag"

const timeplanDag = klasseData.Timeplan[ukedag]

console.log(timeplanDag)

function loopTilNeste(timeplanDag) {
    for (let i = 0; i < timeplanDag.length; i++) {
        const v = timeplanDag[i];
        console.log(v);

        const startDT = dayjs(v.Start, "HH:mm")
        const sluttDT = dayjs(v.Slutt, "HH:mm")

        console.log(sluttDT.isAfter(d), startDT.isAfter(d))

        if (sluttDT.isAfter(d)) {
            return (i);
        }
    }
}

const nesteID = loopTilNeste(timeplanDag)

