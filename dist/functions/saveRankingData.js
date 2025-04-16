var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function saveDataLoadPreviousDataLenght(currentDataSlotPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/${currentDataSlotPath}`);
            if (!response.ok) {
                throw new Error('Błąd sieciowy');
            }
            const data = yield response.json();
            let coscos = data.length;
            return coscos;
        }
        catch (error) {
            console.error('Wystąpił błąd: ', error);
        }
    });
}
function deleteSingleObject(currentDataSlotPath, id) {
    return __awaiter(this, void 0, void 0, function* () {
        //fetch(`http://localhost:3000/${currentDataSlotPath}/${id}`,{
        yield fetch(`http://localhost:3000/${currentDataSlotPath}/${id}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
            }
        })
            .catch(error => {
            console.error(error);
        });
    });
}
function saveDataRemoveAllDataFromFile(currentDataSlotPath, lengthOfPreviousData) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let id = 0; id < lengthOfPreviousData; id++) {
            yield deleteSingleObject(currentDataSlotPath, id);
        }
    });
}
function addSingleObject(currentDataSlotPath, id, playerOb) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`http://localhost:3000/${currentDataSlotPath}/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerOb[id])
        })
            .then(res => {
            console.log(res);
        })
            .catch(error => {
            console.error(error);
        });
    });
}
function saveDataInSlot(playerOb, currentDataSlotPath, lengthOfPreviousData) {
    return __awaiter(this, void 0, void 0, function* () {
        let newObLenght = playerOb.length;
        for (let id = 0; id < newObLenght; id++) {
            yield addSingleObject(currentDataSlotPath, id, playerOb);
        }
    });
}
export function savePlayersInSlot(currentDataSlotPath, playerOb) {
    return __awaiter(this, void 0, void 0, function* () {
        let lengthOfPreviousData;
        const lenghtDataToRemove = yield saveDataLoadPreviousDataLenght(currentDataSlotPath);
        lengthOfPreviousData = lenghtDataToRemove;
        yield saveDataRemoveAllDataFromFile(currentDataSlotPath, lengthOfPreviousData);
        yield saveDataInSlot(playerOb, currentDataSlotPath, lengthOfPreviousData);
    });
}
