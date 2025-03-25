import { restartRankingSetStartingPositionToZero} from "./../app.js";

//  bubble sort V1 for players total points
function bubbleSortV1playerTotalPoints(playerOb, tempPlayerCell){

    let operationCounter:number = 0;

    for(let j = 0; j < playerOb.length; j++){
        for(let i = 0; i < playerOb.length - 1; i++){
            if(playerOb[i].playerFleetPoints > playerOb[i + 1].playerFleetPoints){
                tempPlayerCell  = playerOb[i];
                playerOb[i] = playerOb[i+1];
                playerOb[i+1] = tempPlayerCell;
            }
            operationCounter++;
        }
    }
    
    console.log(`operationCounter ma wartość: ${operationCounter}`);
}

//  bubble sort V2 for players total points
function bubbleSortV2playerTotalPoints(playerOb, tempPlayerCell){
    
    let operationCounter:number = 0;

    for(let j = playerOb.length -1; j > 0; j--){
        for(let i = 0; i < j; i++){
            if(playerOb[i].playerFleetPoints > playerOb[i + 1].playerFleetPoints){
                tempPlayerCell  = playerOb[i];
                playerOb[i] = playerOb[i+1];
                playerOb[i+1] = tempPlayerCell;
            }
            operationCounter++;
        }
    }
    
    console.log(`operationCounter ma wartość: ${operationCounter}`);
}

function selectionSortMethod(playerOb){
    
    let operationCounter:number = 0;
    let index: number;
    let tempMax:number;

    for(let j = 0; j < playerOb.length - 1; j++){
        index = j;
        for(let i = j + 1; i < playerOb.length; i++){
            if(playerOb[i].playerFleetPoints < playerOb[index].playerFleetPoints){
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

function insertionSortMethod(playerOb){

    let operationCounter:number = 0;

        for(let j = playerOb.length - 2; j >= 0; j--)
        {
          let tempSortingElement = playerOb[j].playerFleetPoints;
          let tempObjectStore = playerOb[j];
          let i = j + 1;
          while((i < playerOb.length) && (tempSortingElement > playerOb[i].playerFleetPoints))
          {
            playerOb[i - 1] = playerOb[i];
            i++;
            operationCounter++;
          }
          playerOb[i - 1] =  tempObjectStore;
        }

        console.log(`operationCounter ma wartość dla INSERTION sort: ${operationCounter}`);

}

function quickSortFnMethod(playerOb){

    let arrayLenght:number = playerOb.length-1;
    let counter = 0;

    function quickSort(lewy, prawy){
        let i,j,piwot;
        let x;
        let tempObI;
        
        i = Math.floor((lewy + prawy) / 2);

        piwot = playerOb[i].playerFleetPoints;
        tempObI  = playerOb[i];
        playerOb[i] = playerOb[prawy];
        for(j = i = lewy; i < prawy; i++)
        if(playerOb[i].playerFleetPoints < piwot)
        {
            x = playerOb[i]; 
            playerOb[i] = playerOb[j];
            playerOb[j] = x;
            j++;
            counter++;
        }
        playerOb[prawy] = playerOb[j]; 
        playerOb[j] = tempObI;
        if(lewy < j - 1){
             quickSort(lewy, j - 1);
        }
        if(j + 1 < prawy){
            quickSort(j + 1, prawy);
        }
      }

    quickSort(0, arrayLenght);
      console.log(`licznik dla quciksort wyniósł ${counter}`);
}

export function setAllValuesrankingSortingStateToFalse(rankingSortingState)
{
    for(let i = 0; i < rankingSortingState.length; i++){
        rankingSortingState[i] = false;
    }
}

export function jsSortingFunctionForplayerFleet(playerOb,selectSortingMethodHTML,rankingSortingState,valueOfSortingCalculations){

    let totalTimeForCalculations;
    let tempPlayerCell:number;
    let selectSortingMethodHTMLToNumber;
    selectSortingMethodHTMLToNumber = Number(selectSortingMethodHTML.selectedIndex);

    if(rankingSortingState[2] == false){

    if(selectSortingMethodHTMLToNumber== 0){

        const startTime = performance.now();
        bubbleSortV1playerTotalPoints(playerOb, tempPlayerCell);
        const endTime = performance.now();
        totalTimeForCalculations = endTime - startTime;
        console.log(`Czas obliczeń wyniósł dla V1 :  ${totalTimeForCalculations} ${endTime} ${startTime}`);
        valueOfSortingCalculations.innerHTML = '';
        valueOfSortingCalculations.innerHTML = totalTimeForCalculations + "ms";
    }else if(selectSortingMethodHTMLToNumber == 1){
        const startTime = performance.now();
        bubbleSortV2playerTotalPoints(playerOb, tempPlayerCell);
        const endTime = performance.now();
        totalTimeForCalculations = endTime - startTime;
        console.log(`Czas obliczeń wyniósł dla V2 :  ${totalTimeForCalculations} ${endTime} ${startTime}`);
        valueOfSortingCalculations.innerHTML = '';
        valueOfSortingCalculations.innerHTML = totalTimeForCalculations + "ms";
    }else if(selectSortingMethodHTMLToNumber == 2){
        const startTime = performance.now();
        selectionSortMethod(playerOb);
        const endTime = performance.now();
        totalTimeForCalculations = endTime - startTime;
        console.log(`Czas obliczeń wyniósł selection sort :  ${totalTimeForCalculations} ${endTime} ${startTime}`);
        valueOfSortingCalculations.innerHTML = '';
        valueOfSortingCalculations.innerHTML = totalTimeForCalculations + "ms";
    }else if(selectSortingMethodHTMLToNumber == 3){
        const startTime = performance.now();
        insertionSortMethod(playerOb);
        const endTime = performance.now();
        totalTimeForCalculations = endTime - startTime;
        console.log(`Czas obliczeń wyniósł insertion sort :  ${totalTimeForCalculations} ${endTime} ${startTime}`);
        valueOfSortingCalculations.innerHTML = '';
        valueOfSortingCalculations.innerHTML = totalTimeForCalculations + "ms";
    }else if(selectSortingMethodHTMLToNumber == 4){
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

    rankingSortingState[2] = true;
    }else{
        playerOb.reverse();

        restartRankingSetStartingPositionToZero();
        rankingSortingState[2] = false;
    }
   
}

