import { getHistorialTransferenciaChequeSolService } from "../service/get-historial-transferencia-chequesol.service.js";

export const getHistorialTransferenciaChequeSolController = async (
  req,
  res
) => {
  await getHistorialTransferenciaChequeSolService(req.db, req.params.dni, res);
};

export default { getHistorialTransferenciaChequeSolController };
