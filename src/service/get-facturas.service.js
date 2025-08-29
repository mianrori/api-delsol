import { getFacturasDb } from "../database/get-facturas.db.js";

export const getFacturasService = async (req, res) => {
  let result = [];
  let facturasData = await getFacturasDb(req.db, req.params.dni);
  try {
    for (let i = 0; i < facturasData?.length; i++) {
      result.push({
        fecha: facturasData[i]["FECHA"],
        numero: facturasData[i]["NUMERO"],
        ruc: facturasData[i]["RUC"],
        nombre: facturasData[i]["NOMBRE"],
        monto: facturasData[i]["MONTO"],
        nombreArchivo: facturasData[i]["NOMBRE_ARCHIVO"],
      });
    }
    let status = 200;
    if (result.length === 0) {
      status = 404;
    }
    res
      .status(status)
      .json({ status, success: status === 200 ? true : false, data: result });
  } catch (error) {
    res.status(500).json({ status: 500, success: false, message: error });
  }
};

export default { getFacturasService };
