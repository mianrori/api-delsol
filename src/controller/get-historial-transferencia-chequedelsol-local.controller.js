import { getHistorialTransferenciaChequeDelSolLocalService } from "../service/get-historial-transferencia-chequedelsol-local.service.js";

export const getHistorialTransferenciaChequeDelSolLocalController = async (
  req,
  res
) => {
  await getHistorialTransferenciaChequeDelSolLocalService(
    req.db,
    req.params.codCliente,
    res
  );
};

export default { getHistorialTransferenciaChequeDelSolLocalController };
