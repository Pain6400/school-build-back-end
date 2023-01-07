import { bucket } from "../utils/storangeManager.js";
import { format } from "util";

export const uploadDocumentToStorange = (path, req) => {
  return new Promise(function (resolve, reject) {
    try {
      if(!path) {
        reject({ status: false, message: "Debe de ingresar la ruta!" });
      }
        if (!req.file) {
          reject({ status: false, message: "Debe de subir un archivo!" });
          }

          const blob = bucket.file(`${path}/${req.file.originalname}`);
          const blobStream = blob.createWriteStream({
            resumable: false,
          });

           blobStream.on("error", async(err) => {
            return { status: false, message: err.message };
          });

           blobStream.on("finish", async () => {
            const publicUrl = format(
              `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
      
           blobStream.end(req.file.buffer);
            
           resolve({
              status: true,
              message: `Archivo: ${req.file.originalname} subido correctamente`,
              url: publicUrl,
            });
          });

    } catch (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
          reject({
              status: false,
              message: "El archivo no debe de pesar mas de 50MB!",
            });
          }
      
        reject({
          status: false,
          message: error.message,
        });
    }
  });
  }