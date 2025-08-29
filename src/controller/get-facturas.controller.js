import { getFacturasService } from "../service/get-facturas.service.js";

export const getFacturasController = async (req, res) => {
  await getFacturasService(req, res);
};

export default { getFacturasController };
