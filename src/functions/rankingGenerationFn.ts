import { numberOfPlayersDispalyInTableLockedFn} from "./startFunctions.js";
import { setAllValuesrankingSortingStateToFalse} from "./sortByTotalPoints.js";

//  Remove all table rendered data
export function removeTableData(){
    const tableMain = document.querySelector(".palyer-data-table table");
    const tableArrows = document.querySelector(".palyer-data-table div.move-inside-ranking");
    tableMain.remove();
    tableArrows.remove();
}


//  Checking is origin values in input are correctly fill
export function isValueCorrect(playersValueInput, MAX_CHARACTERS_IN_INPUT_VALUE){
    
    let isValueNumber:boolean;
    let chainLenght: boolean;
    let convertPlayersAmount;
    let tempArray:(boolean|number)[] = [];
    isValueNumber = ( /^[0-9]*$/.test(playersValueInput.value) ) //true

    if(playersValueInput.value.length >= 1 && playersValueInput.value.length <= MAX_CHARACTERS_IN_INPUT_VALUE)
    {
        chainLenght =  true;
    }else chainLenght =false;
    
    if(isValueNumber == true && chainLenght == true){
        tempArray[0] = true;
    }else{
        tempArray[0] = false;
    }

    convertPlayersAmount = Number(playersValueInput.value);

    tempArray[1] = convertPlayersAmount;

    return tempArray;
    }


//  Randomly generate Players in object

export function fillPlayerObArrayWithRandomlyGeneratedObjects(currentPlayerValue, playerOb)//?????????????????? any
{

let convertedToString;
for(let i = 0; i < currentPlayerValue ; i++)
{


let tempOb: {
    id:number;
    playerID: string;
    playerResearchPoints: number;
    playerFleetPoints: number;
    playerEconomyPoints: number;
    playerTotalPoints: number;
} ={
    id:  0,
    playerID: "hehehe",
    playerResearchPoints: 1,
    playerFleetPoints: 2,
    playerEconomyPoints: 3,
    playerTotalPoints: 4
    }
    
    let minAvailablePointsValue = 10;
    let maxAvailablePointsValue = 100;

    convertedToString = i.toString();

    tempOb.id = convertedToString;

    if(i<10){
        tempOb.playerID = "Player0000" + i;
    }else if(i<100){
        tempOb.playerID = "Player000" + i;
    }else if(i<1000){
        tempOb.playerID = "Player00" + i;
    }else if(i<10000){
        tempOb.playerID = "Player0" + i;
    }else if(i<100000){
        tempOb.playerID = "Player" + i;
    }

    tempOb.playerResearchPoints = Math.floor(Math.random() * (maxAvailablePointsValue-minAvailablePointsValue+1) + minAvailablePointsValue);
    tempOb.playerFleetPoints = Math.floor(Math.random() * (maxAvailablePointsValue-minAvailablePointsValue+1) + minAvailablePointsValue);
    tempOb.playerEconomyPoints = Math.floor(Math.random() * (maxAvailablePointsValue-minAvailablePointsValue+1) + minAvailablePointsValue);

    tempOb.playerTotalPoints = tempOb.playerResearchPoints + tempOb.playerFleetPoints + tempOb.playerEconomyPoints;

    playerOb.push(tempOb);
    
}

};




    // Create table with players scores
   export function renderPlayerObArrayOnScreen(playerOb,tempAmountOfPlayersInRanking,currentPlayerValue, isTableRender, numberOfPlayersDispalyInTableLocked,isTableArrowsRendered,rankingSortingState)
   {

    //create table and activate and deactivate buttons "potierdź" and "Usuń wszystko"
    const tableContainer = document.querySelector(".palyer-data-table");
    const TableWitgPlayers = document.createElement("table");
    const deleteTableBtn: HTMLButtonElement = document.querySelector(".delete-values-unactive");
    const confirmTableRollBtn: HTMLButtonElement = document.querySelector(".confirm-players-value-active");

    deleteTableBtn.classList.remove("delete-values-unactive");
    deleteTableBtn.classList.add("delete-values-active");

    confirmTableRollBtn.classList.remove("confirm-players-value-active");
    confirmTableRollBtn.classList.add("confirm-players-value-unactive");

    tableContainer.appendChild(TableWitgPlayers);

    //create event for a button to delete created table

    deleteTableBtn.addEventListener("click", (e) => {
        const deleteTableBtn: HTMLButtonElement = document.querySelector(".delete-values-active");
        const confirmTableRollBtn: HTMLButtonElement = document.querySelector(".confirm-players-value-unactive");
        const tableMain = document.querySelector(".palyer-data-table table");
        const tableArrows = document.querySelector(".palyer-data-table div.move-inside-ranking");
        const lenghtForCurrentObjectsArray:number = playerOb.length;
        let inputPlayerValue = document.querySelector("#players-value");

    
        inputPlayerValue.value = '';

        tableArrows.remove();
        tableMain.remove();
        

        playerOb.splice(0,lenghtForCurrentObjectsArray);

        isTableRender = false;
            // add and remove classes for buttons "usuń wszystko" and "potwierdź"
        deleteTableBtn.classList.remove("delete-values-active");
        deleteTableBtn.classList.add("delete-values-unactive");

        confirmTableRollBtn.classList.remove("confirm-players-value-unactive");
        confirmTableRollBtn.classList.add("confirm-players-value-active");

        numberOfPlayersDispalyInTableLocked = true;
        numberOfPlayersDispalyInTableLockedFn(numberOfPlayersDispalyInTableLocked);

        setAllValuesrankingSortingStateToFalse(rankingSortingState);
        checkObArray(playerOb);
    });

        //creating arrows to move table backward and forward
    const arrowParentContainer = document.querySelector(".palyer-data-table");
    const arrowContainer = document.createElement("div");
    arrowContainer.classList.add("move-inside-ranking");
    
    const shiftRankingPositionWithArrowLeft = document.createElement("div");
    shiftRankingPositionWithArrowLeft.classList.add("move-table-backward");
    shiftRankingPositionWithArrowLeft.innerHTML = 
    `
        <
    `;

    const shiftRankingPositionWithArrowRight = document.createElement("div");
    shiftRankingPositionWithArrowRight.classList.add("move-table-forward");
    shiftRankingPositionWithArrowRight.innerHTML = 
    `
        >
    `;
    arrowParentContainer.append(arrowContainer);
    arrowContainer.append(shiftRankingPositionWithArrowLeft);
    arrowContainer.append(shiftRankingPositionWithArrowRight);

    // if players is less than players to show hide arrows
    if(currentPlayerValue < tempAmountOfPlayersInRanking)
    {
        arrowContainer.classList.add("hidden-class-for-arrows");
    }



        //what if amount of palyers is lower then number of players displaying in table after first call
            if(currentPlayerValue < tempAmountOfPlayersInRanking){
                tempAmountOfPlayersInRanking = currentPlayerValue;
            }

        // create rest of "table data <td>" contained in object "playerOb"
    for(let i = 0; i < tempAmountOfPlayersInRanking ; i++){
    const rankingTableRowWithData = document.createElement("tr");
    rankingTableRowWithData.innerHTML =
    `
        <td>${i + 1}</td> 
        <td>${playerOb[i].playerID}</td> 
        <td>${playerOb[i].playerEconomyPoints}</td> 
        <td>${playerOb[i].playerFleetPoints}</td> 
        <td>${playerOb[i].playerResearchPoints}</td> 
        <td>${playerOb[i].playerTotalPoints}</td> 
     
    `;
    TableWitgPlayers.append(rankingTableRowWithData);
    isTableRender = true;
   }

   }

//      Render table using "arrow forward"

   export function renderTablemovingForward(tempAmountOfPlayersInRanking, palyersArrayIndexInObject, expectedAmoutOfTableColumns, playerOb, isTableRender, restOfDivisionOfPlayersForLastColumn, movingTableArrowForwardIsLocked){
    const tableContainer = document.querySelector(".palyer-data-table");
    const TableWitgPlayers = document.createElement("table");
    tableContainer.appendChild(TableWitgPlayers);


//  iteration counter
    let currentPosition: number = palyersArrayIndexInObject*tempAmountOfPlayersInRanking;
    let lastPositionInRanking:number;

//  check wheather currentPosition is last column
    if(palyersArrayIndexInObject < expectedAmoutOfTableColumns){
        lastPositionInRanking = currentPosition + tempAmountOfPlayersInRanking;
    }else if(palyersArrayIndexInObject >= expectedAmoutOfTableColumns){
        lastPositionInRanking = currentPosition + restOfDivisionOfPlayersForLastColumn;
        movingTableArrowForwardIsLocked = true;
    }
// create rest of "table data <td>" contained in object "playerOb"
for(let i = currentPosition; i < lastPositionInRanking ; i++){
    const rankingTableRowWithData = document.createElement("tr");
    rankingTableRowWithData.innerHTML =
    `
        <td>${i + 1}</td> 
        <td>${playerOb[i].playerID}</td> 
        <td>${playerOb[i].playerEconomyPoints}</td> 
        <td>${playerOb[i].playerFleetPoints}</td> 
        <td>${playerOb[i].playerResearchPoints}</td> 
        <td>${playerOb[i].playerTotalPoints}</td> 
     
    `;
    TableWitgPlayers.append(rankingTableRowWithData);
    isTableRender = true;
   }


//creating arrows to move table backward and forward
const arrowParentContainer = document.querySelector(".palyer-data-table");
const arrowContainer = document.createElement("div");
arrowContainer.classList.add("move-inside-ranking");

const shiftRankingPositionWithArrowLeft = document.createElement("div");
shiftRankingPositionWithArrowLeft.classList.add("move-table-backward");
shiftRankingPositionWithArrowLeft.innerHTML = 
`
    <
`;

const shiftRankingPositionWithArrowRight = document.createElement("div");
shiftRankingPositionWithArrowRight.classList.add("move-table-forward");
shiftRankingPositionWithArrowRight.innerHTML = 
`
    >
`;
arrowParentContainer.append(arrowContainer);
arrowContainer.append(shiftRankingPositionWithArrowLeft);
arrowContainer.append(shiftRankingPositionWithArrowRight);


return movingTableArrowForwardIsLocked;

}

//      Render table using "arrow backward"

export function renderTablemovingBackward(tempAmountOfPlayersInRanking, palyersArrayIndexInObject, expectedAmoutOfTableColumns, playerOb, isTableRender, restOfDivisionOfPlayersForLastColumn,movingTableArrowBackwardIsLocked){
        const tableContainer = document.querySelector(".palyer-data-table");
        const TableWitgPlayers = document.createElement("table");
        tableContainer.appendChild(TableWitgPlayers);

    //  iteration counter
        let currentPosition: number = palyersArrayIndexInObject*tempAmountOfPlayersInRanking;
        let lastPositionInRanking:number;

    //  check wheather currentPosition is last column
        if(!(palyersArrayIndexInObject == expectedAmoutOfTableColumns)){

            lastPositionInRanking = currentPosition + tempAmountOfPlayersInRanking;
        }else{
            //lastPositionInRanking = currentPosition + restOfDivisionOfPlayersForLastColumn;
            //movingTableArrowForwardIsLocked = true;
        }
        
        if(currentPosition == 0 && palyersArrayIndexInObject == 0){
            movingTableArrowBackwardIsLocked = true;
        }else{
            movingTableArrowBackwardIsLocked = false;
        }

    // create rest of "table data <td>" contained in object "playerOb"
    for(let i = currentPosition; i < lastPositionInRanking ; i++){
        const rankingTableRowWithData = document.createElement("tr");
        rankingTableRowWithData.innerHTML =
        `
            <td>${i + 1}</td> 
            <td>${playerOb[i].playerID}</td> 
            <td>${playerOb[i].playerEconomyPoints}</td> 
            <td>${playerOb[i].playerFleetPoints}</td> 
            <td>${playerOb[i].playerResearchPoints}</td> 
            <td>${playerOb[i].playerTotalPoints}</td> 
         
        `;
        TableWitgPlayers.append(rankingTableRowWithData);
        isTableRender = true;
       }

    //creating arrows to move table backward and forward
    const arrowParentContainer = document.querySelector(".palyer-data-table");
    const arrowContainer = document.createElement("div");
    arrowContainer.classList.add("move-inside-ranking");
    
    const shiftRankingPositionWithArrowLeft = document.createElement("div");
    shiftRankingPositionWithArrowLeft.classList.add("move-table-backward");
    shiftRankingPositionWithArrowLeft.innerHTML = 
    `
        <
    `;

    const shiftRankingPositionWithArrowRight = document.createElement("div");
    shiftRankingPositionWithArrowRight.classList.add("move-table-forward");
    shiftRankingPositionWithArrowRight.innerHTML = 
    `
        >
    `;
    arrowParentContainer.append(arrowContainer);
    arrowContainer.append(shiftRankingPositionWithArrowLeft);
    arrowContainer.append(shiftRankingPositionWithArrowRight);

    return movingTableArrowBackwardIsLocked;
    
    }

    export function renderPlayerObArrayOnScreenAfterSelectHTMLElementChange(playerOb,tempAmountOfPlayersInRanking,currentPlayerValue, isTableRender, numberOfPlayersDispalyInTableLocked,isTableArrowsRendered)
    {
 
     //create table and activate and deactivate buttons "potierdź" and "Usuń wszystko"
     const tableContainer = document.querySelector(".palyer-data-table");
     const TableWitgPlayers = document.createElement("table");
 
     tableContainer.appendChild(TableWitgPlayers);
 
         //creating arrows to move table backward and forward
     const arrowParentContainer = document.querySelector(".palyer-data-table");
     const arrowContainer = document.createElement("div");
     arrowContainer.classList.add("move-inside-ranking");
     
     const shiftRankingPositionWithArrowLeft = document.createElement("div");
     shiftRankingPositionWithArrowLeft.classList.add("move-table-backward");
     shiftRankingPositionWithArrowLeft.innerHTML = 
     `
         <
     `;
 
     const shiftRankingPositionWithArrowRight = document.createElement("div");
     shiftRankingPositionWithArrowRight.classList.add("move-table-forward");
     shiftRankingPositionWithArrowRight.innerHTML = 
     `
         >
     `;
     arrowParentContainer.append(arrowContainer);
     arrowContainer.append(shiftRankingPositionWithArrowLeft);
     arrowContainer.append(shiftRankingPositionWithArrowRight);
 
     // if players is less than players to show hide arrows
     if(currentPlayerValue < tempAmountOfPlayersInRanking)
     {
         arrowContainer.classList.add("hidden-class-for-arrows");
     }
 
 
 
         //what if amount of palyers is lower then number of players displaying in table after first call
             if(currentPlayerValue < tempAmountOfPlayersInRanking){
                 tempAmountOfPlayersInRanking = currentPlayerValue;
             }
 
         // create rest of "table data <td>" contained in object "playerOb"
     for(let i = 0; i < tempAmountOfPlayersInRanking ; i++){
     const rankingTableRowWithData = document.createElement("tr");
     rankingTableRowWithData.innerHTML =
     `
         <td>${i + 1}</td> 
         <td>${playerOb[i].playerID}</td> 
         <td>${playerOb[i].playerEconomyPoints}</td> 
         <td>${playerOb[i].playerFleetPoints}</td> 
         <td>${playerOb[i].playerResearchPoints}</td> 
         <td>${playerOb[i].playerTotalPoints}</td> 
      
     `;
     TableWitgPlayers.append(rankingTableRowWithData);
     isTableRender = true;
    }


    }



















export function checkObArray(playerOb){

    for(let i = 0; i < playerOb.length ; i++){
        console.log(`jest: ${playerOb[i].id}`);
        console.log(`jest: ${playerOb[i].playerID}`);
        console.log(`jest: ${playerOb[i].playerResearchPoints}`);
        console.log(`jest: ${playerOb[i].playerFleetPoints}`);
        console.log(`jest: ${playerOb[i].playerEconomyPoints}`);
        console.log(`jest: ${playerOb[i].playerTotalPoints}`); 
    }

}




