export function numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked)
{
    const locked:HTMLButtonElement = document.querySelector(".players-on-ranking");
    if(numberOfPlayersDispalyInTableLocked){
        locked.setAttribute("disabled","");

    }else{
        locked.removeAttribute("disabled");
    }

}