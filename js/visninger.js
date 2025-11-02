let visning = localStorage.getItem("timerVisning") || 0

function byttVisning() {
    visning += 1
    visning = visning % 3

    localStorage.setItem("timerVisning", visning)

    opdaterVisning()

    opdater()
}

function opdaterVisning() {
    if (visning == 0) {
        document.body.classList.add("visning1")
        document.body.classList.remove("visning2", "visning3")
    }
    if (visning == 1) {
        document.body.classList.add("visning2")
        document.body.classList.remove("visning1", "visning3")
    }
    if (visning == 2) {
        document.body.classList.add("visning3")
        document.body.classList.remove("visning2", "visning1")
    }
}

opdaterVisning()