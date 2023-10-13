import { getCotizacionSolDb } from "../database/get-cotizacion-sol.db.js";

export const getCotizacionSolService = async (db, res) => {
  let result = [];
  let cotizacionSolData = await getCotizacionSolDb(db);
  try {
    for (let i = 0; i < cotizacionSolData?.length; i++) {
      result.push({
        idTipoSol: cotizacionSolData[i]["ID"],
        descripcion: cotizacionSolData[i]["DESCRIPCION"],
        transferible:
          cotizacionSolData[i]["TRANSFERIBLE"] === "S" ? true : false,
        cotizacion: cotizacionSolData[i]["COTIZACION"],
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getCotizacionSolService };
