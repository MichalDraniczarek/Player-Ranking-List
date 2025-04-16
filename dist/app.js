var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderPlayerObArrayOnScreenAfterSelectHTMLElementChange, renderTablemovingBackward, renderTablemovingForward, removeTableData, fillPlayerObArrayWithRandomlyGeneratedObjects, isValueCorrect, renderPlayerObArrayOnScreen } from "./functions/rankingGenerationFn.js";
import { numberOfPlayersDispalyInTableLockedFn } from "./functions/startFunctions.js";
import { displayPopupWrongInitialData, closePopupWrongInitialData } from "./functions/popupWarnings.js";
import { jsSortingFunctionForplayerTotalPoints, jsSortingFunctionForplayerPlayerID } from "./functions/sortByTotalPoints.js";
import { jsSortingFunctionForplayerResearch } from "./functions/sortByResearch.js";
import { jsSortingFunctionForplayerFleet } from "./functions/sortByFleet.js";
import { jsSortingFunctionForplayerEconomy } from "./functions/sortByEconomy.js";
import { savePlayersInSlot } from "./functions/saveRankingData.js";
let playerOb = [];
const MAX_CHARACTERS_IN_INPUT_VALUE = 4;
let basicDataFromInput = [];
let rankingSortingState = [false, false, false, false, false];
let currentPlayerValue;
let isInputVlaueCorrect;
let isTableRender = false;
let numberOfPlayersDispalyInTableLocked = true;
let isTableArrowsRendered = false;
let movingTableArrowForwardIsLocked = false;
let movingTableArrowBackwardIsLocked = true;
let palyersArrayIndexInObject = 0;
let expectedAmoutOfTableColumns = 1;
let restOfDivisionOfPlayersForLastColumn = 0;
let tempForMaximumPlayersInRanking = 0;
let sortingData;
let selectSortingMethodHTML = document.querySelector(".sorting-type");
let valueOfSortingCalculations = document.querySelector(".render-time-value");
let currentSaveLoadSlot = 0;
let currentDataSlotPath;
//tessting buttons
const pushData = document.querySelector("button.button-transfer");
const rankingListContainerEventHandler = document.querySelector(".ranking-list-container");
const generatePlayersBtn = document.querySelector(".confirm-players-value-active");
const playersValueInput = document.querySelector("#players-value");
const closePopupInvalidPlayerNumber = document.querySelector(".close-popup-btn");
const baseValueForMaximumPlayersInRanking = document.querySelector(".players-on-ranking");
const saveDataButton = document.querySelector("button.save");
const saveSlotsContainer = document.querySelector("select.save-list");
const loadDataButton = document.querySelector("button.load");
baseValueForMaximumPlayersInRanking.selectedIndex = 0;
//all sorting cols
const sortTotalPointsBtn = document.querySelector("#total-points");
const sortResearchBtn = document.querySelector("#reasearch");
const sortFleetBtn = document.querySelector("#fleet");
const sortEconomyBtn = document.querySelector("#economy");
const sortPlayerIDBtn = document.querySelector("#palyer-id");
let playerMaxInRankingValue = Number(baseValueForMaximumPlayersInRanking.selectedIndex);
// Functions running on start
numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);
function renderedTableColumnsCounter(tempAmountOfPlayersInRanking) {
    expectedAmoutOfTableColumns = Math.floor(currentPlayerValue / tempAmountOfPlayersInRanking);
    restOfDivisionOfPlayersForLastColumn = currentPlayerValue % tempAmountOfPlayersInRanking;
    console.log("columns " + expectedAmoutOfTableColumns);
    console.log("rest " + restOfDivisionOfPlayersForLastColumn);
}
function removeAllTableData() {
    const tableContainer = document.querySelector(".ranking-list-container");
    const tableMian = document.querySelector(".ranking-list-container table");
}
//           ALL EVENTS IMPLEMENTATIONS
generatePlayersBtn.addEventListener("click", (e) => {
    if (!isTableRender) { //check Whether "Player ranking" is already created
        basicDataFromInput = isValueCorrect(playersValueInput, MAX_CHARACTERS_IN_INPUT_VALUE);
        //returning a value containing information whether the input data is correct
        // and the number of players value
        isInputVlaueCorrect = basicDataFromInput[0];
        currentPlayerValue = basicDataFromInput[1];
        console.log(isInputVlaueCorrect);
        console.log(currentPlayerValue);
        // if data is correct(isInputVlaueCorrect == true) generate object containing players data
        // and render table including generated data
        if (isInputVlaueCorrect) {
            //removeAllTableData();
            let tempAmountOfPlayersInRanking = Number(baseValueForMaximumPlayersInRanking.value);
            fillPlayerObArrayWithRandomlyGeneratedObjects(currentPlayerValue, playerOb);
            renderPlayerObArrayOnScreen(playerOb, tempAmountOfPlayersInRanking, currentPlayerValue, isTableRender, numberOfPlayersDispalyInTableLocked, isTableArrowsRendered, rankingSortingState);
            numberOfPlayersDispalyInTableLocked = false;
            numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);
            renderedTableColumnsCounter(tempAmountOfPlayersInRanking);
        }
        else if (!isInputVlaueCorrect) {
            displayPopupWrongInitialData();
        }
    }
});
closePopupInvalidPlayerNumber.addEventListener("click", (e) => {
    closePopupWrongInitialData();
});
//      event for moving players in table forward
rankingListContainerEventHandler.addEventListener("click", (e) => {
    if (e.target.classList.contains("move-table-forward") && (!movingTableArrowForwardIsLocked)) {
        palyersArrayIndexInObject++;
        movingTableArrowBackwardIsLocked = false;
        removeTableData();
        let tempAmountOfPlayersInRanking = Number(baseValueForMaximumPlayersInRanking.value);
        movingTableArrowForwardIsLocked = renderTablemovingForward(tempAmountOfPlayersInRanking, palyersArrayIndexInObject, expectedAmoutOfTableColumns, playerOb, isTableRender, restOfDivisionOfPlayersForLastColumn, movingTableArrowForwardIsLocked);
    }
});
//      event for moving players in table backward
rankingListContainerEventHandler.addEventListener("click", (e) => {
    if (e.target.classList.contains("move-table-backward") && (!movingTableArrowBackwardIsLocked)) {
        palyersArrayIndexInObject--;
        movingTableArrowForwardIsLocked = false;
        removeTableData();
        let tempAmountOfPlayersInRanking = Number(baseValueForMaximumPlayersInRanking.value);
        movingTableArrowBackwardIsLocked = renderTablemovingBackward(tempAmountOfPlayersInRanking, palyersArrayIndexInObject, expectedAmoutOfTableColumns, playerOb, isTableRender, restOfDivisionOfPlayersForLastColumn, movingTableArrowBackwardIsLocked);
    }
});
//      is event "change amount of players in select element" occur
rankingListContainerEventHandler.addEventListener("click", (e) => {
    playerMaxInRankingValue = Number(baseValueForMaximumPlayersInRanking.selectedIndex);
    if (e.target.classList.contains("players-on-ranking")) {
        tempForMaximumPlayersInRanking = baseValueForMaximumPlayersInRanking.selectedIndex;
    }
    if (tempForMaximumPlayersInRanking != playerMaxInRankingValue) {
        palyersArrayIndexInObject = 0;
        removeTableData();
        let tempAmountOfPlayersInRanking = Number(baseValueForMaximumPlayersInRanking.value);
        renderPlayerObArrayOnScreenAfterSelectHTMLElementChange(playerOb, tempAmountOfPlayersInRanking, currentPlayerValue, isTableRender, numberOfPlayersDispalyInTableLocked, isTableArrowsRendered);
        numberOfPlayersDispalyInTableLocked = false;
        numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);
        renderedTableColumnsCounter(tempAmountOfPlayersInRanking);
    }
    tempForMaximumPlayersInRanking = playerMaxInRankingValue;
});
//      Remove rendered table,set render starting position at "0" and render new table
export function restartRankingSetStartingPositionToZero() {
    palyersArrayIndexInObject = 0;
    removeTableData();
    let tempAmountOfPlayersInRanking = Number(baseValueForMaximumPlayersInRanking.value);
    renderPlayerObArrayOnScreenAfterSelectHTMLElementChange(playerOb, tempAmountOfPlayersInRanking, currentPlayerValue, isTableRender, numberOfPlayersDispalyInTableLocked, isTableArrowsRendered);
    numberOfPlayersDispalyInTableLocked = false;
    numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);
    renderedTableColumnsCounter(tempAmountOfPlayersInRanking);
}
//      Sort "total points" value in table
sortTotalPointsBtn.addEventListener("click", (e) => {
    jsSortingFunctionForplayerTotalPoints(playerOb, selectSortingMethodHTML, rankingSortingState, valueOfSortingCalculations);
});
//      Sort "research" value in table
sortResearchBtn.addEventListener("click", (e) => {
    jsSortingFunctionForplayerResearch(playerOb, selectSortingMethodHTML, rankingSortingState, valueOfSortingCalculations);
});
//      Sort "fleet strengt" value in table
sortFleetBtn.addEventListener("click", (e) => {
    jsSortingFunctionForplayerFleet(playerOb, selectSortingMethodHTML, rankingSortingState, valueOfSortingCalculations);
});
//      Sort "economy" value in table
sortEconomyBtn.addEventListener("click", (e) => {
    jsSortingFunctionForplayerEconomy(playerOb, selectSortingMethodHTML, rankingSortingState, valueOfSortingCalculations);
});
//      Sort "player name" value in table
sortPlayerIDBtn.addEventListener("click", (e) => {
    jsSortingFunctionForplayerPlayerID(playerOb, rankingSortingState);
});
//  Save your data in JSON format
saveDataButton.addEventListener("click", (e) => {
    currentSaveLoadSlot = Number(saveSlotsContainer.selectedIndex);
    if (currentSaveLoadSlot == 0) {
        currentDataSlotPath = `data01`;
    }
    else if (currentSaveLoadSlot == 1) {
        currentDataSlotPath = `data02`;
    }
    else if (currentSaveLoadSlot == 2) {
        currentDataSlotPath = `data03`;
    }
    else if (currentSaveLoadSlot == 3) {
        currentDataSlotPath = `data04`;
    }
    else if (currentSaveLoadSlot == 4) {
        currentDataSlotPath = `data05`;
    }
    savePlayersInSlot(currentDataSlotPath, playerOb);
});
function gatherDataFn(currentDataSlotPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/${currentDataSlotPath}`);
            if (!response.ok) {
                throw new Error(`Błąd sieci: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Wystąpił błąd:', error);
            return null;
        }
    });
}
function loadPlayersfromSlot(currentDataSlotPath, playerOb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dane = yield gatherDataFn(currentDataSlotPath);
            if (dane) {
                dane.forEach(obiekt => console.log(obiekt));
                playerOb.length = 0;
                playerOb.push(...dane);
                console.log("Zawartość playerOb po przypisaniu:", playerOb[0]);
            }
            else {
                console.log('Nie udało się pobrać danych.');
            }
        }
        catch (error) {
            console.error('Błąd podczas ładowania:', error);
        }
        palyersArrayIndexInObject = 0;
        removeTableData();
        let tempAmountOfPlayersInRanking = Number(baseValueForMaximumPlayersInRanking.value);
        renderedTableColumnsCounter(tempAmountOfPlayersInRanking);
        renderPlayerObArrayOnScreenAfterSelectHTMLElementChange(playerOb, tempAmountOfPlayersInRanking, currentPlayerValue, isTableRender, numberOfPlayersDispalyInTableLocked, isTableArrowsRendered);
        numberOfPlayersDispalyInTableLocked = false;
        numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);
    });
}
//  Save your data in JSON format
loadDataButton.addEventListener("click", (e) => {
    currentSaveLoadSlot = Number(saveSlotsContainer.selectedIndex);
    if (currentSaveLoadSlot == 0) {
        currentDataSlotPath = `data01`;
    }
    else if (currentSaveLoadSlot == 1) {
        currentDataSlotPath = `data02`;
    }
    else if (currentSaveLoadSlot == 2) {
        currentDataSlotPath = `data03`;
    }
    else if (currentSaveLoadSlot == 3) {
        currentDataSlotPath = `data04`;
    }
    else if (currentSaveLoadSlot == 4) {
        currentDataSlotPath = `data05`;
    }
    loadPlayersfromSlot(currentDataSlotPath, playerOb);
});
