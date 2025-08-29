import { procesarConversionSolDb } from "../database/procesar-conversion-sol.db.js";

export const procesarConversionSolService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await procesarConversionSolDb(db, payload);
      res.status(result.status).json(result);
    }
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export default { procesarConversionSolService };
