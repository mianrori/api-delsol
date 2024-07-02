import { acreditarSolObsequioDb } from "../database/acreditar-sol-obsequio.db.js";

export const acreditarSolObsequioService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await acreditarSolObsequioDb(db, payload);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { acreditarSolObsequioService };
