import { transferirChequeSolSocioService } from "../service/transferir-chequesol-socio.service.js";

export const transferirChequeSolSocioController = async (req, res) => {
  await transferirChequeSolSocioService(req.db, req.body, res);
};

export default { transferirChequeSolSocioController };
