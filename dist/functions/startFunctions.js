export function numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked) {
    const locked = document.querySelector(".players-on-ranking");
    if (numberOfPlayersDispalyInTableLocked) {
        locked.setAttribute("disabled", "");
    }
    else {
        locked.removeAttribute("disabled");
    }
}
