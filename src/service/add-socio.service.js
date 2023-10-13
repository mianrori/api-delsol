import { addSocioDb } from "../database/add-socio.db.js";

export const addSocioService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await addSocioDb(db, payload);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { addSocioService };
