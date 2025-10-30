let showMode = localStorage.getItem("showMode")
const showSwitch = document.getElementById("visningKnapp")

const enableshowMode = () => {
    document.body.classList.add("visning2")
    document.body.classList.remove("visning1")
    localStorage.setItem("showMode", "active")
}

const disableshowMode = () => {
    document.body.classList.add("visning1")
    document.body.classList.remove("visning2")
    localStorage.setItem("showMode", null)
}

if (showMode === "active") enableshowMode()

showSwitch.addEventListener("click", () => {
    showMode = localStorage.getItem("showMode")
    showMode !== "active" ? enableshowMode() : disableshowMode()
})