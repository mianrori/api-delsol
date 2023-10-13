import { getCotizacionSolService } from "../service/get-cotizacion-sol.service.js";

export const getCotizacionSolController = async (req, res) => {
  await getCotizacionSolService(req.db, res);
};

export default { getCotizacionSolController };
