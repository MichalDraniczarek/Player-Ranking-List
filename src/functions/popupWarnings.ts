
//      popup for ivalid initial data for number of players 
export function displayPopupWrongInitialData()
{
     const popupWrongData = document.querySelector(".invalid-data-popup");

     popupWrongData.classList.remove("display-hidden");

     console.log("czy ja się kiedyś wywoałam????");
}

export function closePopupWrongInitialData()
{
 const popupWrongData = document.querySelector(".invalid-data-popup");

 popupWrongData.classList.add("display-hidden"); 
 console.log("znowu nie mogie się wywołać");
}