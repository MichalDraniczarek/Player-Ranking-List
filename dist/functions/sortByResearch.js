import { restartRankingSetStartingPositionToZero } from "./../app.js";
//  bubble sort V1 for players total points
function bubbleSortV1playerTotalPoints(playerOb, tempPlayerCell) {
    let operationCounter = 0;
    for (let j = 0; j < playerOb.length; j++) {
        for (let i = 0; i < playerOb.length - 1; i++) {
            if (playerOb[i].playerResearchPoints > playerOb[i + 1].playerResearchPoints) {
                tempPlayerCell = playerOb[i];
                playerOb[i] = playerOb[i + 1];
                playerOb[i + 1] = tempPlayerCell;
            }
            operationCounter++;
        }
    }
    console.log(`operationCounter ma wartość: ${operationCounter}`);
}
//  bubble sort V2 for players total points
function bubbleSortV2playerTotalPoints(playerOb, tempPlayerCell) {
    let operationCounter = 0;
    for (let j = playerOb.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (playerOb[i].playerResearchPoints > playerOb[i + 1].playerResearchPoints) {
                tempPlayerCell = playerOb[i];
                playerOb[i] = playerOb[i + 1];
                playerOb[i + 1] = tempPlayerCell;
            }
            operationCounter++;
        }
    }
    console.log(`operationCounter ma wartość: ${operationCounter}`);
}
function selectionSortMethod(playerOb) {
    let operationCounter = 0;
    let index;
    let tempMax;
    for (let j = 0; j < playerOb.length - 1; j++) {
        index = j;
        for (let i = j + 1; i < playerOb.length; i++) {
            if (playerOb[i].playerResearchPoints < playerOb[index].playerResearchPoints) {
                index = i;
            }
            operationCounter++;
        }
        tempMax = playerOb[index];
        playerOb[index] = playerOb[j];
        playerOb[j] = tempMax;
    }
    console.log(`operationCounter ma wartość dla selection sort: ${operationCounter}`);
}
function insertionSortMethod(playerOb) {
    let operationCounter = 0;
    for (let j = playerOb.length - 2; j >= 0; j--) {
        let tempSortingElement = playerOb[j].playerResearchPoints;
        let tempObjectStore = playerOb[j];
        let i = j + 1;
        while ((i < playerOb.length) && (tempSortingElement > playerOb[i].playerResearchPoints)) {
            playerOb[i - 1] = playerOb[i];
            i++;
            operationCounter++;
        }
        playerOb[i - 1] = tempObjectStore;
    }
    console.log(`operationCounter ma wartość dla INSERTION sort: ${operationCounter}`);
}
function quickSortFnMethod(playerOb) {
    let arrayLenght = playerOb.length - 1;
    let counter = 0;
    function quickSort(lewy, prawy) {
        let i, j, piwot;
        let x;
        let tempObI;
        i = Math.floor((lewy + prawy) / 2);
        piwot = playerOb[i].playerResearchPoints;
        tempObI = playerOb[i];
        playerOb[i] = playerOb[prawy];
        for (j = i = lewy; i < prawy; i++)
            if (playerOb[i].playerResearchPoints < piwot) {
                x = playerOb[i];
                playerOb[i] = playerOb[j];
                playerOb[j] = x;
                j++;
                counter++;
            }
        playerOb[prawy] = playerOb[j];
        playerOb[j] = tempObI;
        if (lewy < j - 1) {
            quickSort(lewy, j - 1);
        }
        if (j + 1 < prawy) {
            quickSort(j + 1, prawy);
        }
    }
    quickSort(0, arrayLenght);
    console.log(`licznik dla quciksort wyniósł ${counter}`);
}
export function setAllValuesrankingSortingStateToFalse(rankingSortingState) {
    for (let i = 0; i < rankingSortingState.length; i++) {
        rankingSortingState[i] = false;
    }
}
export function jsSortingFunctionForplayerResearch(playerOb, selectSortingMethodHTML, rankingSortingState, valueOfSortingCalculations) {
    let totalTimeForCalculations;
    let tempPlayerCell;
    let selectSortingMethodHTMLToNumber;
    selectSortingMethodHTMLToNumber = Number(selectSortingMethodHTML.selectedIndex);
    if (rankingSortingState[3] == false) {
        if (selectSortingMethodHTMLToNumber == 0) {
            const startTime = performance.now();
            bubbleSortV1playerTotalPoints(playerOb, tempPlayerCell);
            const endTime = performance.now();
            totalTimeForCalculations = endTime - startTime;
            console.log(`Czas obliczeń wyniósł dla V1 :  ${totalTimeForCalculations} ${endTime} ${startTime}`);
            valueOfSortingCalculations.innerHTML = '';
            valueOfSortingCalculations.innerHTML = totalTimeForCalculations + "ms";
        }
        else if (selectSortingMethodHTMLToNumber == 1) {
            const startTime = performance.now();
            bubbleSortV2playerTotalPoints(playerOb, tempPlayerCell);
            const endTime = performance.now();
            totalTimeForCalculations = endTime - startTime;
            console.log(`Czas obliczeń wyniósł dla V2 :  ${totalTimeForCalculations} ${endTime} ${startTime}`);
            valueOfSortingCalculations.innerHTML = '';
            valueOfSortingCalculations.innerHTML = totalTimeForCalculations + "ms";
        }
        else if (selectSortingMethodHTMLToNumber == 2) {
            const startTime = performance.now();
            selectionSortMethod(playerOb);
            const endTime = performance.now();
            totalTimeForCalculations = endTime - startTime;
            console.log(`Czas obliczeń wyniósł selection sort :  ${totalTimeForCalculations} ${endTime} ${startTime}`);
            valueOfSortingCalculations.innerHTML = '';
            valueOfSortingCalculations.innerHTML = totalTimeForCalculations + "ms";
        }
        else if (selectSortingMethodHTMLToNumber == 3) {
            const startTime = performance.now();
            insertionSortMethod(playerOb);
            const endTime = performance.now();
            totalTimeForCalculations = endTime - startTime;
            console.log(`Czas obliczeń wyniósł insertion sort :  ${totalTimeForCalculations} ${endTime} ${startTime}`);
            valueOfSortingCalculations.innerHTML = '';
            valueOfSortingCalculations.innerHTML = totalTimeForCalculations + "ms";
        }
        else if (selectSortingMethodHTMLToNumber == 4) {
            const startTime = performance.now();
            quickSortFnMethod(playerOb);
            const endTime = performance.now();
            totalTimeForCalculations = endTime - startTime;
            console.log(`Czas obliczeń wyniósł quick sort :  ${totalTimeForCalculations} ${endTime} ${startTime}`);
            valueOfSortingCalculations.innerHTML = '';
            valueOfSortingCalculations.innerHTML = totalTimeForCalculations + "ms";
        }
        setAllValuesrankingSortingStateToFalse(rankingSortingState);
        playerOb.reverse();
        restartRankingSetStartingPositionToZero();
        rankingSortingState[3] = true;
    }
    else {
        playerOb.reverse();
        restartRankingSetStartingPositionToZero();
        rankingSortingState[3] = false;
    }
}
