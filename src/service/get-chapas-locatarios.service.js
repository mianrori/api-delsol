import { getChapasLocatariosDb } from "../database/get-chapas-locatarios.db.js";

export const getChapasLocatariosService = async (req, res) => {
  let result = [];
  let chapasLocatariosData = await getChapasLocatariosDb(req.db);
  try {
    for (let i = 0; i < chapasLocatariosData?.length; i++) {
      result.push({
        razonSocial: chapasLocatariosData[i]["RAZON_SOCIAL"],
        local: chapasLocatariosData[i]["LOCAL"],
        ruc: chapasLocatariosData[i]["RUC"],
        matricula: chapasLocatariosData[i]["MATRICULA"],
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

export default { getChapasLocatariosService };
