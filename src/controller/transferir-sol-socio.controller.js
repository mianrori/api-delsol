import { transferirSolSocioService } from "../service/transferir-sol-socio.service.js";

export const transferirSolSocioController = async (req, res) => {
  await transferirSolSocioService(req.db, req.body, res);
};

export default { transferirSolSocioController };
