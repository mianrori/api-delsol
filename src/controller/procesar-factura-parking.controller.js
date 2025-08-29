import { procesarFacturaParkingService } from "../service/procesar-factura-parking.service.js";

export const procesarFacturaParkingController = async (req, res) => {
  await procesarFacturaParkingService(req.db, req.body, res);
};

export default { procesarFacturaParkingController };
