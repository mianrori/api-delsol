import { transferirChequeSolLocalService } from "../service/transferir-chequesol-local.service.js";

export const transferirChequeSolLocalController = async (req, res) => {
  await transferirChequeSolLocalService(req.db, req.body, res);
};

export default { transferirChequeSolLocalController };
