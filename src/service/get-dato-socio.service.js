import { getSocioDb } from "../database/get-socio.db.js";
import { getSolDb } from "../database/get-sol.db.js";
import { getCuponDb } from "../database/get-cupon.db.js";
import { getChequeDelSolDb } from "../database/get-cheque-delsol.db.js";
import { getPremioDb } from "../database/get-premio.db.js";
import { getSolBancoDb } from "../database/get-sol-banco.db.js";
import { getSolVencimientoDb } from "../database/get-sol-vencimiento.db.js";
import moment from "moment";

export const getDatoSocioService = async (db, dni) => {
  let result = {};
  let saldos = [];
  let chequeDelSol = {};
  let cupones = [];
  let premios = [];
  let vencimientos = [];
  const socioData = await getSocioDb(db, dni);
  const solData = await getSolDb(db, dni);
  const cuponData = await getCuponDb(db, dni);
  const chequeDelSolData = await getChequeDelSolDb(db, dni);
  const premioData = await getPremioDb(db, dni);
  const vencimientoData = await getSolVencimientoDb(db, dni);
  try {
    if (socioData) {
      await getSolBancoDb(db, dni);
      for (let i = 0; i < solData?.length; i++) {
        saldos.push({
          saldo: solData[i]["SALDO"],
          transferible: solData[i]["TRANSFERIBLE"] === "S" ? true : false,
          idTipoSol: solData[i]["ID_TIPO_SOL"],
          descripcionTipoSol: solData[i]["DESCRIPCION_TIPO_SOL"],
          cotizacionSol: solData[i]["COTIZACION_SOL"],
          guaranies: solData[i]["SALDO"] * solData[i]["COTIZACION_SOL"],
        });
      }
      for (let i = 0; i < cuponData?.length; i++) {
        cupones.push({
          descripcion: cuponData[i]["DESCRIPCION"],
          cantidad: cuponData[i]["CANTIDAD"],
        });
      }
      for (let i = 0; i < premioData?.length; i++) {
        premios.push({
          idReserva: premioData[i]["ID"],
          descripcion: premioData[i]["DESCRIPCION"],
          cantidad: premioData[i]["CANTIDAD"],
          codCliente: premioData[i]["COD_CLIENTE"],
          nroLocal: premioData[i]["COD_GRUPO_LOCAL"],
          codProducto: premioData[i]["COD_ARTICULO"],
          vigencia: premioData[i]["VIGENCIA"],
          vencimiento: premioData[i]["VENCIMIENTO"],
        });
      }
      if (chequeDelSolData) {
        chequeDelSol = {
          saldo: chequeDelSolData["SALDO"],
          vencimiento: chequeDelSolData["VENCIMIENTO"],
        };
      }
      for (let i = 0; i < vencimientoData?.length; i++) {
        vencimientos.push({
          saldo: vencimientoData[i]["SALDO"],
          vencimiento: moment(vencimientoData[i]["VENCIMIENTO"]).format(
            "DD/MM/YYYY"
          ),
          idTipoSol: vencimientoData[i]["ID_TIPO_SOL"],
          descripcionTipoSol: vencimientoData[i]["DESCRIPCION_TIPO_SOL"],
          cotizacionSol: vencimientoData[i]["COTIZACION_SOL"],
          guaranies:
            vencimientoData[i]["SALDO"] * vencimientoData[i]["COTIZACION_SOL"],
        });
      }
      result = {
        nombre: socioData["NOMBRE"],
        apellido: socioData["APELLIDO"],
        sexo: socioData["SEXO"],
        email: socioData["EMAIL"] || "",
        celular: socioData["CELULAR"] || "",
        fechaNacimiento: socioData["FECHA_NACIMIENTO"] || "",
        soles: socioData["SOLES"],
        activo: socioData["ACTIVO"],
        direccion: socioData["DIRECCION"] || "",
        estadoBanco: socioData["ESTADO_BANCO"],
        observacion: socioData["COMENTARIO"] || "",
        saldos,
        vencimientos,
        chequeDelSol,
        cupones,
        premios,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default { getDatoSocioService };
