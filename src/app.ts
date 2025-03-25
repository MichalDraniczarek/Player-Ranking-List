
import { renderPlayerObArrayOnScreenAfterSelectHTMLElementChange,renderTablemovingBackward, renderTablemovingForward, removeTableData, fillPlayerObArrayWithRandomlyGeneratedObjects, isValueCorrect, checkObArray, renderPlayerObArrayOnScreen} from "./functions/rankingGenerationFn.js";
import { numberOfPlayersDispalyInTableLockedFn} from "./functions/startFunctions.js";
import { displayPopupWrongInitialData, closePopupWrongInitialData} from "./functions/popupWarnings.js";
import { jsSortingFunctionForplayerTotalPoints,jsSortingFunctionForplayerPlayerID} from "./functions/sortByTotalPoints.js";
import { jsSortingFunctionForplayerResearch} from "./functions/sortByResearch.js";
import { jsSortingFunctionForplayerFleet} from "./functions/sortByFleet.js";
import { jsSortingFunctionForplayerEconomy} from "./functions/sortByEconomy.js";



let playerOb: {
    playerID: string;
    playerResearchPoints: number;
    playerFleetPoints: number;
    playerEconomyPoints: number;
    playerTotalPoints: number;
}[] = [

];

console.log(playerOb);
const MAX_CHARACTERS_IN_INPUT_VALUE:Number = 4;

let basicDataFromInput = [];
let rankingSortingState:[boolean,boolean,boolean,boolean,boolean,]  = [false,false,false,false,false];

let currentPlayerValue:number;
let isInputVlaueCorrect:boolean;
let isTableRender: boolean = false;
let numberOfPlayersDispalyInTableLocked: boolean = true;
let isTableArrowsRendered = false;
let movingTableArrowForwardIsLocked = false;
let movingTableArrowBackwardIsLocked = true;
let palyersArrayIndexInObject: number = 0;
let expectedAmoutOfTableColumns:number = 1;
let restOfDivisionOfPlayersForLastColumn: number = 0;
let tempForMaximumPlayersInRanking:number = 0;
let sortingData;
let selectSortingMethodHTML: HTMLSelectElement = document.querySelector(".sorting-type");
let valueOfSortingCalculations: HTMLParagraphElement = document.querySelector(".render-time-value")


const rankingListContainerEventHandler: HTMLBodyElement = document.querySelector(".ranking-list-container");
const generatePlayersBtn: HTMLButtonElement = document.querySelector(".confirm-players-value-active");
const playersValueInput: HTMLInputElement = document.querySelector("#players-value");
const closePopupInvalidPlayerNumber: HTMLButtonElement = document.querySelector(".close-popup-btn");
const baseValueForMaximumPlayersInRanking: HTMLSelectElement = document.querySelector(".players-on-ranking");
baseValueForMaximumPlayersInRanking.selectedIndex = 0;
//all sorting cols
const sortTotalPointsBtn = document.querySelector("#total-points");
const sortResearchBtn = document.querySelector("#reasearch");
const sortFleetBtn = document.querySelector("#fleet");
const sortEconomyBtn = document.querySelector("#economy");
const sortPlayerIDBtn = document.querySelector("#palyer-id");



let playerMaxInRankingValue:number = Number(baseValueForMaximumPlayersInRanking.selectedIndex);

// Functions running on start
numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);


    function renderedTableColumnsCounter(tempAmountOfPlayersInRanking){

       expectedAmoutOfTableColumns = Math.floor(currentPlayerValue/tempAmountOfPlayersInRanking);
       restOfDivisionOfPlayersForLastColumn = currentPlayerValue % tempAmountOfPlayersInRanking;
       console.log("columns " + expectedAmoutOfTableColumns); 
       console.log("rest " + restOfDivisionOfPlayersForLastColumn);
    }


   function removeAllTableData()
   {
    const tableContainer = document.querySelector(".ranking-list-container");
    const tableMian = document.querySelector(".ranking-list-container table");
    //tableContainer.removeChild(tableMian);
    console.log(tableContainer);
    console.log(tableMian);
   }







   //           ALL EVENTS IMPLEMENTATIONS

generatePlayersBtn.addEventListener("click", (e) => {

    if(!isTableRender){     //check Whether "Player ranking" is already created

    basicDataFromInput = isValueCorrect(playersValueInput, MAX_CHARACTERS_IN_INPUT_VALUE);
        //returning a value containing information whether the input data is correct
        // and the number of players value
    isInputVlaueCorrect = basicDataFromInput[0];
    currentPlayerValue = basicDataFromInput[1];


    console.log(isInputVlaueCorrect);
    console.log(currentPlayerValue);
        // if data is correct(isInputVlaueCorrect == true) generate object containing players data
        // and render table including generated data
    if(isInputVlaueCorrect){
        //removeAllTableData();
        console.log(baseValueForMaximumPlayersInRanking.value);
        let tempAmountOfPlayersInRanking:number = Number(baseValueForMaximumPlayersInRanking.value);
        console.log("wartość number sralalaal to: " + tempAmountOfPlayersInRanking);

        fillPlayerObArrayWithRandomlyGeneratedObjects(currentPlayerValue, playerOb);
        renderPlayerObArrayOnScreen(playerOb,tempAmountOfPlayersInRanking,currentPlayerValue, isTableRender, numberOfPlayersDispalyInTableLocked,isTableArrowsRendered,rankingSortingState);
        
        numberOfPlayersDispalyInTableLocked = false;
        numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);
        
        renderedTableColumnsCounter(tempAmountOfPlayersInRanking);
        
    }else if(!isInputVlaueCorrect){
        console.log("co za bzdury z czarnej dziury");
        displayPopupWrongInitialData();
    }

    }

});


closePopupInvalidPlayerNumber.addEventListener("click", (e) => {
    closePopupWrongInitialData();

});

    //      event for moving players in table forward
rankingListContainerEventHandler.addEventListener("click", (e) => {

    if(e.target.classList.contains("move-table-forward") && (!movingTableArrowForwardIsLocked)){
        console.log("MOVUNG FORWARD BEFOR: " + movingTableArrowForwardIsLocked);
        console.log("odpaliłem zdarzenie na strzałce");
        palyersArrayIndexInObject++;
        movingTableArrowBackwardIsLocked = false;
        removeTableData();
        let tempAmountOfPlayersInRanking:number = Number(baseValueForMaximumPlayersInRanking.value);
        movingTableArrowForwardIsLocked = renderTablemovingForward(tempAmountOfPlayersInRanking, palyersArrayIndexInObject, expectedAmoutOfTableColumns, playerOb, isTableRender, restOfDivisionOfPlayersForLastColumn, movingTableArrowForwardIsLocked);
        console.log("MOVUNG FORWARD AFTER: " + movingTableArrowForwardIsLocked);
    }

});

    //      event for moving players in table backward
rankingListContainerEventHandler.addEventListener("click", (e) => {
    console.log("movingTableArrowBackwardIsLocked w ciele zdarzenia wywołującego:" + movingTableArrowBackwardIsLocked);
    if(e.target.classList.contains("move-table-backward") && (!movingTableArrowBackwardIsLocked)){
        console.log("odpaliłem zdarzenie na strzałce");
        palyersArrayIndexInObject--;
        movingTableArrowForwardIsLocked = false;
        removeTableData();
        let tempAmountOfPlayersInRanking:number = Number(baseValueForMaximumPlayersInRanking.value);
        movingTableArrowBackwardIsLocked = renderTablemovingBackward(tempAmountOfPlayersInRanking, palyersArrayIndexInObject, expectedAmoutOfTableColumns, playerOb, isTableRender, restOfDivisionOfPlayersForLastColumn,movingTableArrowBackwardIsLocked);

        //palyersArrayIndexInObject = 
    }

});

//      is event "change amount of players in select element" occur
rankingListContainerEventHandler.addEventListener("click", (e) => {

    playerMaxInRankingValue = Number(baseValueForMaximumPlayersInRanking.selectedIndex);   

    console.log("event się odpalił");
    if(e.target.classList.contains("players-on-ranking")){
        console.log("jestem w rankingu");
        console.log(baseValueForMaximumPlayersInRanking.selectedIndex);
        console.log(baseValueForMaximumPlayersInRanking.value);
        tempForMaximumPlayersInRanking = baseValueForMaximumPlayersInRanking.selectedIndex;

        console.log("JAKI JEST NASZ STAN     " + tempForMaximumPlayersInRanking + "   " +   playerMaxInRankingValue);

    }

    if(tempForMaximumPlayersInRanking != playerMaxInRankingValue){
        console.log("zmieniłem się NA LEPSZE     " + tempForMaximumPlayersInRanking + "   " +   playerMaxInRankingValue);
        palyersArrayIndexInObject = 0;
        removeTableData();
        let tempAmountOfPlayersInRanking:number = Number(baseValueForMaximumPlayersInRanking.value);
        renderPlayerObArrayOnScreenAfterSelectHTMLElementChange(playerOb,tempAmountOfPlayersInRanking,currentPlayerValue, isTableRender, numberOfPlayersDispalyInTableLocked,isTableArrowsRendered);
        
        numberOfPlayersDispalyInTableLocked = false;
        numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);
        
        renderedTableColumnsCounter(tempAmountOfPlayersInRanking);
        
    }

    tempForMaximumPlayersInRanking = playerMaxInRankingValue;

});

//      Remove rendered table,set render starting position at "0" and render new table
export function restartRankingSetStartingPositionToZero(){

    palyersArrayIndexInObject = 0;
    removeTableData();
    let tempAmountOfPlayersInRanking:number = Number(baseValueForMaximumPlayersInRanking.value);
    renderPlayerObArrayOnScreenAfterSelectHTMLElementChange(playerOb,tempAmountOfPlayersInRanking,currentPlayerValue, isTableRender, numberOfPlayersDispalyInTableLocked,isTableArrowsRendered);
    
    numberOfPlayersDispalyInTableLocked = false;
    numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);
    
    renderedTableColumnsCounter(tempAmountOfPlayersInRanking);

}





//      Sort "total points" value in table
sortTotalPointsBtn.addEventListener("click", (e) => {

    jsSortingFunctionForplayerTotalPoints(playerOb,selectSortingMethodHTML,rankingSortingState,valueOfSortingCalculations);

});

//      Sort "research" value in table
sortResearchBtn.addEventListener("click", (e) => {

    jsSortingFunctionForplayerResearch(playerOb,selectSortingMethodHTML,rankingSortingState,valueOfSortingCalculations);

});


//      Sort "fleet strengt" value in table
sortFleetBtn.addEventListener("click", (e) => {

    jsSortingFunctionForplayerFleet(playerOb,selectSortingMethodHTML,rankingSortingState,valueOfSortingCalculations);

});

//      Sort "economy" value in table
sortEconomyBtn.addEventListener("click", (e) => {

    jsSortingFunctionForplayerEconomy(playerOb,selectSortingMethodHTML,rankingSortingState,valueOfSortingCalculations);

});


// function jsSortingFunctionForplayerPlayerID(playerOb){

//     if(rankingSortingState[0] == false){
//     playerOb.sort((a, b) => {
//         if (a.playerID.toLowerCase() > b.playerID.toLowerCase()) {
//           return -1;
//         }
//         if (a.playerID.toLowerCase() < b.playerID.toLowerCase()) {
//           return 1;
//         }
//         return 0;
//       });
      
    

//     setAllValuesrankingSortingStateToFalse(rankingSortingState);

//     playerOb.reverse();

//     restartRankingSetStartingPositionToZero();

//     rankingSortingState[0] = true;
//     }else{
//         playerOb.reverse();

//         restartRankingSetStartingPositionToZero();
//         rankingSortingState[0] = false;
//     }
   

// }


//      Sort "player name" value in table
sortPlayerIDBtn.addEventListener("click", (e) => {

    jsSortingFunctionForplayerPlayerID(playerOb,rankingSortingState);

});



// rankingListContainerEventHandler.addEventListener("click", (e) => {
//     if (e.target.classList.contains("delete")) {
//         console.log("udalo się kliknąć!!!!!");
//     }

// });





