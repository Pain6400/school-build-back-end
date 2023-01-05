import { Storage } from "@google-cloud/storage";
import Multer from "multer";


let proyectId = process.env.PROYECT_ID;
let keyFileName = "escuelas-373715-769cffe73c71.json";
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

export const bucket  = storage.bucket("fileschool");