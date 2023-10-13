import { getHistorialTransferenciaSolService } from "../service/get-historial-transferencia-sol.service.js";

export const getHistorialTransferenciaSolController = async (req, res) => {
  await getHistorialTransferenciaSolService(req.db, req.params.dni, res);
};

export default { getHistorialTransferenciaSolController };
