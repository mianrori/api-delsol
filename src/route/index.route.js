import express from "express";
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
import { getExtractoSolController } from "../controller/get-extracto-sol.controller.js";

export const router = express.Router();

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
router
  .route("/socio/sol/extracto/:dni/:periodo/:tipo")
  .get(getExtractoSolController);
