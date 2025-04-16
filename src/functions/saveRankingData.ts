
async function saveDataLoadPreviousDataLenght(currentDataSlotPath){
    try {
        const response = await fetch(`http://localhost:3000/${currentDataSlotPath}`)
        if (!response.ok) {
            throw new Error('Błąd sieciowy');
        }
        const data = await response.json();
        let coscos = data.length;
        return coscos;
    } catch (error) {
        console.error('Wystąpił błąd: ', error);
    }

}


async function deleteSingleObject(currentDataSlotPath, id){
        //fetch(`http://localhost:3000/${currentDataSlotPath}/${id}`,{
            await fetch(`http://localhost:3000/${currentDataSlotPath}/${id}`,{
                method: `DELETE`,
                headers:{
                    'Content-Type' : 'application/json'
                },
            })
            .then(res => {
                if(res.ok){

        
                    return res.json();
                } else {

                }
            })
            .catch(error => {
                console.error(error)
            });

}


async function saveDataRemoveAllDataFromFile(currentDataSlotPath, lengthOfPreviousData){

    for(let id = 0; id < lengthOfPreviousData; id++){

    await deleteSingleObject(currentDataSlotPath, id);

    }

}


async function addSingleObject(currentDataSlotPath, id, playerOb){
    await fetch(`http://localhost:3000/${currentDataSlotPath}/`, {
        method: "POST",
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(playerOb[id])
    })
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    });
}


async function saveDataInSlot(playerOb,currentDataSlotPath,lengthOfPreviousData){

    let newObLenght = playerOb.length;

    for(let id = 0; id < newObLenght; id++){

    await addSingleObject(currentDataSlotPath, id, playerOb)
    }

    }

    export async function savePlayersInSlot(currentDataSlotPath,playerOb){
        let lengthOfPreviousData:number;

        const lenghtDataToRemove = await saveDataLoadPreviousDataLenght(currentDataSlotPath);

        lengthOfPreviousData = lenghtDataToRemove;


        await saveDataRemoveAllDataFromFile(currentDataSlotPath, lengthOfPreviousData);
        
        await saveDataInSlot(playerOb,currentDataSlotPath,lengthOfPreviousData);

    }