
//      popup for ivalid initial data for number of players 
export function displayPopupWrongInitialData()
{
     const popupWrongData = document.querySelector(".invalid-data-popup");

     popupWrongData.classList.remove("display-hidden");

}

export function closePopupWrongInitialData()
{
 const popupWrongData = document.querySelector(".invalid-data-popup");

 popupWrongData.classList.add("display-hidden"); 
}