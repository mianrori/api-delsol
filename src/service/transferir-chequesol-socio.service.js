import { transferirChequeSolSocioDb } from "../database/transferir-chequesol-socio.db.js";

export const transferirChequeSolSocioService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await transferirChequeSolSocioDb(db, payload);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { transferirChequeSolSocioService };
