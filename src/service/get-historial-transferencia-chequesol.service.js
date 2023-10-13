import { getHistorialTransferenciaChequeSolDb } from "../database/get-historial-transferencia-chequesol.db.js";
import moment from "moment";

export const getHistorialTransferenciaChequeSolService = async (
  db,
  dni,
  res
) => {
  let result = [];
  let historialTransferenciaChequeSolData =
    await getHistorialTransferenciaChequeSolDb(db, dni);
  try {
    for (let i = 0; i < historialTransferenciaChequeSolData?.length; i++) {
      result.push({
        fecha: moment(historialTransferenciaChequeSolData[i]["FECHA"]).format(
          "DD/MM/YYYY HH:mm:ss"
        ),
        aDni: historialTransferenciaChequeSolData[i]["A_DNI"] || "",
        aNombre: historialTransferenciaChequeSolData[i]["A_NOMBRE"],
        aApellido: historialTransferenciaChequeSolData[i]["A_APELLIDO"] || "",
        importe: historialTransferenciaChequeSolData[i]["IMPORTE"],
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getHistorialTransferenciaChequeSolService };
