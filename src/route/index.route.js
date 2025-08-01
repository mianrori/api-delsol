import express from "express";
//import apicache from "apicache";
import { getDatoSocioController } from "../controller/get-dato-socio.controller.js";
import { addSocioController } from "../controller/add-socio.controller.js";
import { getExtractoChequeDelSolController } from "../controller/get-extracto-chequedelsol.controller.js";
import { processPaymentController } from "../controller/process-payment.controller.js";
import { transferirSolSocioController } from "../controller/transferir-sol-socio.controller.js";
import { transferirSolLocalController } from "../controller/transferir-sol-local.controller.js";
import { getHistorialTransferenciaSolController } from "../controller/get-historial-transferencia-sol.controller.js";
import { transferirChequeSolSocioController } from "../controller/transferir-chequesol-socio.controller.js";
import { transferirChequeSolLocalController } from "../controller/transferir-chequesol-local.controller.js";
import { getHistorialTransferenciaChequeSolController } from "../controller/get-historial-transferencia-chequesol.controller.js";
import { getCotizacionSolController } from "../controller/get-cotizacion-sol.controller.js";
import { updateSocioInformationController } from "../controller/update-socio-information.controller.js";
import { getHistorialTransferenciaSolLocalController } from "../controller/get-historial-transferencia-sol-local.controller.js";
import { getHistorialTransferenciaChequeDelSolLocalController } from "../controller/get-historial-transferencia-chequedelsol-local.controller.js";
import { procesarVentaSolObsequioController } from "../controller/procesar-venta-sol-obsequio.controller.js";
import { acreditarSolObsequioController } from "../controller/acreditar-sol-obsequio.controller.js";
import { getExtractoSolController } from "../controller/get-extracto-sol.controller.js";
//import { procesarFacturaParkingController } from "../controller/procesar-factura-parking.controller.js";
import { addVehiculoController } from "../controller/add-vehiculo.controller.js";
//import { downloadInvoiceController } from "../controller/download-invoice.controller.js";
//import { getFacturasController } from "../controller/get-facturas.controller.js";
//import { procesarVentaSolParkingController } from "../controller/procesar-venta-sol-parking.controller.js";
import { getVehiculosController } from "../controller/get-vehiculos.controller.js";
import { actualizaVehiculoActivoController } from "../controller/actualiza-vehiculo-activo.controller.js";
import { actualizaDatosVehiculoController } from "../controller/actualiza-datos-vehiculo.controller.js";
import { getDniByMatriculaController } from "../controller/get-dni-by-matricula.controller.js";
//import { procesarConversionSolController } from "../controller/procesar-conversion-sol.controller.js";
import { getTiposSolesController } from "../controller/get-tipos-soles.controller.js";

export const router = express.Router();
//const cache = apicache.middleware;

//router.route("/socio/:dni").get(cache("1 minutes"), getDatoSocioController);
router.route("/socio/:dni").get(getDatoSocioController);
router.route("/socio").post(addSocioController);
router
  .route("/socio/chequedelsol/extracto/:dni")
  .get(getExtractoChequeDelSolController);
router.route("/local/pago").post(processPaymentController);
router.route("/sol/transferencia/socio").post(transferirSolSocioController);
router.route("/sol/transferencia/local").post(transferirSolLocalController);
router
  .route("/sol/transferencia/historial/:dni")
  .get(getHistorialTransferenciaSolController);
router
  .route("/chequesol/transferencia/socio")
  .post(transferirChequeSolSocioController);
router
  .route("/chequesol/transferencia/local")
  .post(transferirChequeSolLocalController);
router
  .route("/chequesol/transferencia/historial/:dni")
  .get(getHistorialTransferenciaChequeSolController);
router.route("/sol/cotizacion").get(getCotizacionSolController);
router
  .route("/socio/informacion/actualizacion")
  .post(updateSocioInformationController);
router
  .route("/sol/transferencia/local/historial/:codCliente")
  .get(getHistorialTransferenciaSolLocalController);
router
  .route("/chequesol/transferencia/local/historial/:codCliente")
  .get(getHistorialTransferenciaChequeDelSolLocalController);
router.route("/sol/compra").post(procesarVentaSolObsequioController);
router.route("/sol/credito").post(acreditarSolObsequioController);
router
  .route("/socio/sol/extracto/:dni/:periodo/:tipo")
  .get(getExtractoSolController);
//router.route("/parking/factura").post(procesarFacturaParkingController);
router.route("/socio/vehiculo").post(addVehiculoController);
//router.route("/socio/factura/:filename").get(downloadInvoiceController);
//router.route("/socio/facturas/:dni").get(getFacturasController);
//router.route("/parking/sol/compra").post(procesarVentaSolParkingController);
router.route("/socio/vehiculos/:dni").get(getVehiculosController);
router.route("/socio/vehiculo/:id").patch(actualizaVehiculoActivoController);
router.route("/socio/vehiculo/:id").put(actualizaDatosVehiculoController);
router.route("/socio/vehiculo/:matricula").get(getDniByMatriculaController);
//router.route("/parking/sol/conversion").post(procesarConversionSolController);
router.route("/sol/tipos").get(getTiposSolesController);
