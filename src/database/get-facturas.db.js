export const getFacturasDb = (db, dni) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT TO_CHAR(a.fec_comprobante,'dd/mm/yyyy') fecha,
       c.establecimiento || '-' || c.punto_expedicion || '-' ||
       lPAD(a.nro_comprobante, 7, '0') numero,
       a.ruc,
       UPPER(a.nom_cliente) nombre,
       d.siglas || ' ' || a.tot_comprobante monto,
       DECODE(a.cdc, NULL, NULL, a.cdc || '.pdf') nombre_archivo
  FROM vt_comprobantes_cabecera a,
       cf_dato_parking          b,
       talonarios               c,
       monedas                  d
 WHERE b.tip_comprobante = a.tip_comprobante
   AND b.ser_comprobante = a.ser_comprobante
   AND b.nro_comprobante = a.nro_comprobante
   AND c.tip_talonario = a.tip_comprobante
   AND c.serie = a.ser_comprobante
   AND b.nro_comprobante BETWEEN c.numero_inicial AND c.numero_final
   AND d.cod_moneda = a.cod_moneda
   AND b.dni = :dni
 ORDER BY b.id DESC
`,
        [dni]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      console.log(error);
      reject(`Error en getFacturasDb: ${error.message.replace(/['"]+/g, "")}`);
    }
  });
};

export default {
  getFacturasDb,
};
