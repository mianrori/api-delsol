import { transferirChequeSolLocalDb } from "../database/transferir-chequesol-local.db.js";

export const transferirChequeSolLocalService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await transferirChequeSolLocalDb(db, payload);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { transferirChequeSolLocalService };
