import { getExtractoSolDb } from "../database/get-extracto-sol.db.js";
import moment from "moment";

export const getExtractoSolService = async (db, dni, periodo, tipo) => {
  let result = [];
  let extractoSolData = await getExtractoSolDb(db, dni, periodo, tipo);
  try {
    for (let i = 0; i < extractoSolData?.length; i++) {
      result.push({
        nroTransaccion: extractoSolData[i]["NRO_TRANSACCION"],
        fecha: moment(extractoSolData[i]["FECHA"]).format(
          "DD/MM/YYYY HH:mm:ss"
        ),
        descripcion: extractoSolData[i]["DESCRIPCION"],
        nroComprobante: extractoSolData[i]["NRO_COMPROBANTE"],
        monto: extractoSolData[i]["MONTO"],
        cantidadSol: extractoSolData[i]["CANTIDAD_SOL"],
      });
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default { getExtractoSolService };
