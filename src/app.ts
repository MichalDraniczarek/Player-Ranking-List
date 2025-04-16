
import { renderPlayerObArrayOnScreenAfterSelectHTMLElementChange,renderTablemovingBackward, renderTablemovingForward, removeTableData, fillPlayerObArrayWithRandomlyGeneratedObjects, isValueCorrect, checkObArray, renderPlayerObArrayOnScreen} from "./functions/rankingGenerationFn.js";
import { numberOfPlayersDispalyInTableLockedFn} from "./functions/startFunctions.js";
import { displayPopupWrongInitialData, closePopupWrongInitialData} from "./functions/popupWarnings.js";
import { jsSortingFunctionForplayerTotalPoints,jsSortingFunctionForplayerPlayerID} from "./functions/sortByTotalPoints.js";
import { jsSortingFunctionForplayerResearch} from "./functions/sortByResearch.js";
import { jsSortingFunctionForplayerFleet} from "./functions/sortByFleet.js";
import { jsSortingFunctionForplayerEconomy} from "./functions/sortByEconomy.js";
import { savePlayersInSlot} from "./functions/saveRankingData.js";


let playerOb: {
    id: string;
    playerID: string;
    playerResearchPoints: number;
    playerFleetPoints: number;
    playerEconomyPoints: number;
    playerTotalPoints: number;
}[] = [

];


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
let currentSaveLoadSlot:number = 0;
let currentDataSlotPath:string;
//tessting buttons
const pushData = document.querySelector("button.button-transfer");


const rankingListContainerEventHandler: HTMLBodyElement = document.querySelector(".ranking-list-container");
const generatePlayersBtn: HTMLButtonElement = document.querySelector(".confirm-players-value-active");
const playersValueInput: HTMLInputElement = document.querySelector("#players-value");
const closePopupInvalidPlayerNumber: HTMLButtonElement = document.querySelector(".close-popup-btn");
const baseValueForMaximumPlayersInRanking: HTMLSelectElement = document.querySelector(".players-on-ranking");
const saveDataButton: HTMLButtonElement = document.querySelector("button.save");
const saveSlotsContainer: HTMLSelectElement = document.querySelector("select.save-list");
const loadDataButton: HTMLButtonElement = document.querySelector("button.load");
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
        let tempAmountOfPlayersInRanking:number = Number(baseValueForMaximumPlayersInRanking.value);

        fillPlayerObArrayWithRandomlyGeneratedObjects(currentPlayerValue, playerOb);
        renderPlayerObArrayOnScreen(playerOb,tempAmountOfPlayersInRanking,currentPlayerValue, isTableRender, numberOfPlayersDispalyInTableLocked,isTableArrowsRendered,rankingSortingState);
        
        numberOfPlayersDispalyInTableLocked = false;
        numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);
        
        renderedTableColumnsCounter(tempAmountOfPlayersInRanking);
        
    }else if(!isInputVlaueCorrect){
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
        palyersArrayIndexInObject++;
        movingTableArrowBackwardIsLocked = false;
        removeTableData();
        let tempAmountOfPlayersInRanking:number = Number(baseValueForMaximumPlayersInRanking.value);
        movingTableArrowForwardIsLocked = renderTablemovingForward(tempAmountOfPlayersInRanking, palyersArrayIndexInObject, expectedAmoutOfTableColumns, playerOb, isTableRender, restOfDivisionOfPlayersForLastColumn, movingTableArrowForwardIsLocked);

    }

});

    //      event for moving players in table backward
rankingListContainerEventHandler.addEventListener("click", (e) => {
    if(e.target.classList.contains("move-table-backward") && (!movingTableArrowBackwardIsLocked)){
        palyersArrayIndexInObject--;
        movingTableArrowForwardIsLocked = false;
        removeTableData();
        let tempAmountOfPlayersInRanking:number = Number(baseValueForMaximumPlayersInRanking.value);
        movingTableArrowBackwardIsLocked = renderTablemovingBackward(tempAmountOfPlayersInRanking, palyersArrayIndexInObject, expectedAmoutOfTableColumns, playerOb, isTableRender, restOfDivisionOfPlayersForLastColumn,movingTableArrowBackwardIsLocked);

    }

});

//      is event "change amount of players in select element" occur
rankingListContainerEventHandler.addEventListener("click", (e) => {

    playerMaxInRankingValue = Number(baseValueForMaximumPlayersInRanking.selectedIndex);   

    if(e.target.classList.contains("players-on-ranking")){
        tempForMaximumPlayersInRanking = baseValueForMaximumPlayersInRanking.selectedIndex;
    }

    if(tempForMaximumPlayersInRanking != playerMaxInRankingValue){
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


//      Sort "player name" value in table
sortPlayerIDBtn.addEventListener("click", (e) => {

    jsSortingFunctionForplayerPlayerID(playerOb,rankingSortingState);

});

//  Save your data in JSON format

saveDataButton.addEventListener("click",(e) => {

    currentSaveLoadSlot = Number(saveSlotsContainer.selectedIndex);

    if(currentSaveLoadSlot == 0){
        currentDataSlotPath = `data01`;
    }else if(currentSaveLoadSlot == 1){
        currentDataSlotPath = `data02`;
    }else if(currentSaveLoadSlot == 2){
        currentDataSlotPath = `data03`;
    }else if(currentSaveLoadSlot == 3){
        currentDataSlotPath = `data04`;
    }else if(currentSaveLoadSlot == 4){
        currentDataSlotPath = `data05`;
    }


    savePlayersInSlot(currentDataSlotPath,playerOb);

})


    async function gatherDataFn(currentDataSlotPath){
        try {
            const response = await fetch(`http://localhost:3000/${currentDataSlotPath}`); 
            if (!response.ok) {
              throw new Error(`Błąd sieci: ${response.status}`);
            }
        
            const data = await response.json(); 
            return data; 
        
          } catch (error) {
            console.error('Wystąpił błąd:', error);
            return null; 
          }
        }




        async function loadPlayersfromSlot(currentDataSlotPath, playerOb) {


            try {
                const dane = await gatherDataFn(currentDataSlotPath);
                
                if (dane) {
                    dane.forEach(obiekt => console.log(obiekt));
        
                    playerOb.length = 0;
                    playerOb.push(...dane);
        
                    console.log("Zawartość playerOb po przypisaniu:", playerOb[0]);
                } else {
                    console.log('Nie udało się pobrać danych.');
                }
            } catch (error) {
                console.error('Błąd podczas ładowania:', error);
            }
           
            palyersArrayIndexInObject = 0;
            removeTableData();
            let tempAmountOfPlayersInRanking:number = Number(baseValueForMaximumPlayersInRanking.value);
            renderedTableColumnsCounter(tempAmountOfPlayersInRanking);
            renderPlayerObArrayOnScreenAfterSelectHTMLElementChange(playerOb,tempAmountOfPlayersInRanking,currentPlayerValue, isTableRender, numberOfPlayersDispalyInTableLocked,isTableArrowsRendered);
            
            numberOfPlayersDispalyInTableLocked = false;
            numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);
            
    }
    



//  Save your data in JSON format

loadDataButton.addEventListener("click",(e) => {

    currentSaveLoadSlot = Number(saveSlotsContainer.selectedIndex);

    if(currentSaveLoadSlot == 0){
        currentDataSlotPath = `data01`;
    }else if(currentSaveLoadSlot == 1){
        currentDataSlotPath = `data02`;
    }else if(currentSaveLoadSlot == 2){
        currentDataSlotPath = `data03`;
    }else if(currentSaveLoadSlot == 3){
        currentDataSlotPath = `data04`;
    }else if(currentSaveLoadSlot == 4){
        currentDataSlotPath = `data05`;
    }


    loadPlayersfromSlot(currentDataSlotPath,playerOb);

})






