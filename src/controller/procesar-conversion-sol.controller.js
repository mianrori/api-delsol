import { procesarConversionSolService } from "../service/procesar-conversion-sol.service.js";

export const procesarConversionSolController = async (req, res) => {
  await procesarConversionSolService(req.db, req.body, res);
};

export default { procesarConversionSolController };
