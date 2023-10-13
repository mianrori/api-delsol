import { getHistorialTransferenciaSolDb } from "../database/get-historial-transferencia-sol.db.js";
import moment from "moment";

export const getHistorialTransferenciaSolService = async (db, dni, res) => {
  let result = [];
  let historialTransferenciaSolData = await getHistorialTransferenciaSolDb(
    db,
    dni
  );
  try {
    for (let i = 0; i < historialTransferenciaSolData?.length; i++) {
      result.push({
        fecha: moment(historialTransferenciaSolData[i]["FECHA"]).format(
          "DD/MM/YYYY HH:mm:ss"
        ),
        aDni: historialTransferenciaSolData[i]["A_DNI"] || "",
        aNombre: historialTransferenciaSolData[i]["A_NOMBRE"],
        aApellido: historialTransferenciaSolData[i]["A_APELLIDO"] || "",
        tipoSol: historialTransferenciaSolData[i]["TIPO_SOL"],
        cantidad: historialTransferenciaSolData[i]["CANTIDAD"],
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getHistorialTransferenciaSolService };
