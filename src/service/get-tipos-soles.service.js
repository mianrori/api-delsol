import { getTiposSolesDb } from "../database/get-tipos-soles.db.js";

export const getTiposSolesService = async (db, res) => {
  let result = [];
  let tiposSolesData = await getTiposSolesDb(db);
  try {
    for (let i = 0; i < tiposSolesData?.length; i++) {
      result.push({
        id: tiposSolesData[i]["ID"],
        descripcion: tiposSolesData[i]["DESCRIPCION"],
        activo: tiposSolesData[i]["ACTIVO"] === "S" ? true : false,
        porDefecto: tiposSolesData[i]["POR_DEFECTO"] === "S" ? true : false,
        transferible: tiposSolesData[i]["TRANSFERIBLE"] === "S" ? true : false,
        bancario: tiposSolesData[i]["BANCARIO"] === "S" ? true : false,
        validForParking:
          tiposSolesData[i]["VALID_FOR_PARKING"] === "S" ? true : false,
        validForStore:
          tiposSolesData[i]["VALID_FOR_STORE"] === "S" ? true : false,
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getTiposSolesService };
