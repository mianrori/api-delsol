import { getHistorialTransferenciaSolLocalService } from "../service/get-historial-transferencia-sol-local.service.js";

export const getHistorialTransferenciaSolLocalController = async (req, res) => {
  await getHistorialTransferenciaSolLocalService(
    req.db,
    req.params.codCliente,
    res
  );
};

export default { getHistorialTransferenciaSolLocalController };
