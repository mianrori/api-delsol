import { procesarVentaSolObsequioService } from "../service/procesar-venta-sol-obsequio.service.js";

export const procesarVentaSolObsequioController = async (req, res) => {
  await procesarVentaSolObsequioService(req.db, req.body, res);
};

export default { procesarVentaSolObsequioController };
