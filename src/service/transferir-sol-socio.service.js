import { transferirSolSocioDb } from "../database/transferir-sol-socio.db.js";

export const transferirSolSocioService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await transferirSolSocioDb(db, payload);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { transferirSolSocioService };
