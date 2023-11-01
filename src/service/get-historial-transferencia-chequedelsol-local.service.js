import { getHistorialTransferenciaChequeDelSolLocalDb } from "../database/get-historial-transferencia-chequedelsol-local.db.js";
import moment from "moment";

export const getHistorialTransferenciaChequeDelSolLocalService = async (
  db,
  codCliente,
  res
) => {
  let result = [];
  let historialTransferenciaChequeDelSolLocalData =
    await getHistorialTransferenciaChequeDelSolLocalDb(db, codCliente);
  try {
    for (
      let i = 0;
      i < historialTransferenciaChequeDelSolLocalData?.length;
      i++
    ) {
      result.push({
        id: historialTransferenciaChequeDelSolLocalData[i]["ID"],
        fecha: moment(
          historialTransferenciaChequeDelSolLocalData[i]["FECHA"]
        ).format("DD/MM/YYYY HH:mm:ss"),
        deDni: historialTransferenciaChequeDelSolLocalData[i]["DE_DNI"] || "",
        deNombre: historialTransferenciaChequeDelSolLocalData[i]["DE_NOMBRE"],
        deApellido:
          historialTransferenciaChequeDelSolLocalData[i]["DE_APELLIDO"] || "",
        importe: historialTransferenciaChequeDelSolLocalData[i]["IMPORTE"],
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getHistorialTransferenciaChequeDelSolLocalService };
