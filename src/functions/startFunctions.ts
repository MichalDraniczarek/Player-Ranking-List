export function numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked)
{
    const locked:HTMLButtonElement = document.querySelector(".players-on-ranking");
    if(numberOfPlayersDispalyInTableLocked){
        locked.setAttribute("disabled","");
        //numberOfPlayersDispalyInTableLocked = true;
    }else{
        locked.removeAttribute("disabled");
        //numberOfPlayersDispalyInTableLocked = false;
    }

    //return numberOfPlayersDispalyInTableLocked;
}