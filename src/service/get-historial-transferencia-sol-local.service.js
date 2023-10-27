import { getHistorialTransferenciaSolLocalDb } from "../database/get-historial-transferencia-sol-local.db.js";
import moment from "moment";

export const getHistorialTransferenciaSolLocalService = async (
  db,
  codCliente,
  res
) => {
  let result = [];
  let historialTransferenciaSolLocalData =
    await getHistorialTransferenciaSolLocalDb(db, codCliente);
  try {
    for (let i = 0; i < historialTransferenciaSolLocalData?.length; i++) {
      result.push({
        fecha: moment(historialTransferenciaSolLocalData[i]["FECHA"]).format(
          "DD/MM/YYYY HH:mm:ss"
        ),
        deDni: historialTransferenciaSolLocalData[i]["DE_DNI"] || "",
        deNombre: historialTransferenciaSolLocalData[i]["DE_NOMBRE"],
        deApellido: historialTransferenciaSolLocalData[i]["DE_APELLIDO"] || "",
        tipoSol: historialTransferenciaSolLocalData[i]["TIPO_SOL"],
        cantidad: historialTransferenciaSolLocalData[i]["CANTIDAD"],
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getHistorialTransferenciaSolLocalService };
