import { getExtractoChequeDelSolDb } from "../database/get-extracto-chequedelsol.db.js";
import moment from "moment";

export const getExtractoChequeDelSolService = async (db, dni) => {
  let result = [];
  let extractoChequeDelSolData = await getExtractoChequeDelSolDb(db, dni);
  try {
    for (let i = 0; i < extractoChequeDelSolData?.length; i++) {
      result.push({
        fecha: moment(extractoChequeDelSolData[i]["FECHA"]).format(
          "DD/MM/YYYY HH:mm:ss"
        ),
        tipo: extractoChequeDelSolData[i]["TIPO"],
        monto: extractoChequeDelSolData[i]["MONTO"],
        saldo: extractoChequeDelSolData[i]["SALDO"],
      });
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default { getExtractoChequeDelSolService };
