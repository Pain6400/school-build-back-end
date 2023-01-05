import { Storage } from "@google-cloud/storage";
import { Multer } from "multer";


let proyectId = process.env.PROYECT_ID;
let keyFileName = "";
const storage = new Storage({
    proyectId,
    keyFileName
});


export const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024
    }
});

export const buget  = storage.bucket("");