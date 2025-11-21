let innstillinger = localStorage.getItem("timerinnstillinger")

const deafult = {
    "darkMode": { "verdi": false, "type": "switch" },
    "blinkingPip": { "verdi": true, "type": "switch" },
    "version": 1
}



if (innstillinger) {
    innstillinger = JSON.parse(innstillinger);


    if (innstillinger.version != deafult.version) {
        for (let i in deafult) {
            if (!innstillinger[i]) {
                innstillinger[i] = deafult[i]
            }
        }
    }
} else {
    innstillinger = deafult
}



for (let i in innstillinger) {
    v = innstillinger[i]

    if (v.type == "switch") {
        document.getElementById(`switch-${i}`).checked = v.verdi

        endre(i, v.verdi)
    }
}



function handleSwitch(switchID) {
    let isChecked = document.getElementById(`switch-${switchID}`).checked;

    innstillinger[switchID].verdi = isChecked

    endre(switchID, isChecked)

    localStorage.setItem("timerinnstillinger", JSON.stringify(innstillinger))
}

function endre(ID, verdi) {
    if (ID == "darkMode") {
        if (verdi) {
            document.body.classList.add("darkMode")
        } else {
            document.body.classList.remove("darkMode")
        }
    }

    if (ID == "blinkingPip") {
        if (verdi) {
            document.getElementById("pipCanvas").classList.add("blinking")
        } else {
            document.getElementById("pipCanvas").classList.remove("blinking")
        }
    }
}

function innstillingerPopup() {
    document.getElementById("innstilingerMeny").classList.toggle("lukketInnstilinger")
}