import { bucket } from "../utils/storangeManager.js";

export const uploadDocumentToStorange = async(path, req) => {
      try {

          if(!path) {
            return({ status: false, message: "Debe de ingresar la ruta!" });
          }
          if (!req.file) {
            return({ status: false, message: "Debe de subir un archivo!" });
            }

            const blob = bucket.file(`${path}/${req.file.originalname}`);
            const blobStream = blob.createWriteStream({
              resumable: false,
            });

            blobStream.on("error", async(err) => {
              return ({ status: false, message: err.message });
            });

          blobStream.end(req.file.buffer);
          
          return({ status: true, message: "Debe de subir un archivo!", path: `https://storage.googleapis.com/${bucket.name}/${blob.name}` });
      } catch (error) {
          if (error.code == "LIMIT_FILE_SIZE") {
            return({
                status: false,
                message: "El archivo no debe de pesar mas de 50MB!",
              });
            }
        
            return({
            status: false,
            message: error.message,
          });
      }
  }