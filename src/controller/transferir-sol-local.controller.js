import { transferirSolLocalService } from "../service/transferir-sol-local.service.js";

export const transferirSolLocalController = async (req, res) => {
  await transferirSolLocalService(req.db, req.body, res);
};

export default { transferirSolLocalController };
