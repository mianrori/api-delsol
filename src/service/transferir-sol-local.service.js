import { transferirSolLocalDb } from "../database/transferir-sol-local.db.js";

export const transferirSolLocalService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await transferirSolLocalDb(db, payload);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { transferirSolLocalService };
