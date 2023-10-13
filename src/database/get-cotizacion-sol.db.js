export const getCotizacionSolDb = (db) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT a.id,
        LOWER(a.descripcion) descripcion,
        NVL(a.transferible, 'N') transferible,
        (CASE
          WHEN NVL((SELECT COUNT(e.id)
                     FROM cf_promo_cotiza_sol e, cf_promociones_det f
                    WHERE e.cod_empresa = f.cod_empresa
                      AND e.cod_promocion = f.cod_promocion
                      AND e.nro_item = f.nro_item
                      AND nvl(f.estado, 'I') = 'A'
                      AND (e.id_tipo_sol = a.id OR e.id_tipo_sol_banco = a.id)
                      AND sysdate BETWEEN f.fecha_desde AND f.fecha_hasta),
                   0) > 0 THEN
           NVL((SELECT e.cot_shopping
                 FROM cf_promo_cotiza_sol e, cf_promociones_det f
                WHERE e.cod_empresa = f.cod_empresa
                  AND e.cod_promocion = f.cod_promocion
                  AND e.nro_item = f.nro_item
                  AND nvl(f.estado, 'I') = 'A'
                  AND e.id_tipo_sol = a.id
                  AND sysdate BETWEEN f.fecha_desde AND f.fecha_hasta),
               (SELECT e.cot_banco
                  FROM cf_promo_cotiza_sol e, cf_promociones_det f
                 WHERE e.cod_empresa = f.cod_empresa
                   AND e.cod_promocion = f.cod_promocion
                   AND e.nro_item = f.nro_item
                   AND nvl(f.estado, 'I') = 'A'
                   AND e.id_tipo_sol_banco = a.id
                   AND sysdate BETWEEN f.fecha_desde AND f.fecha_hasta))
          ELSE
           NVL((SELECT c.valor_compra
                 FROM cf_tasacion_soles c
                WHERE c.fecha =
                      (SELECT MAX(d.fecha) FROM cf_tasacion_soles d)),
               0)
        END) cotizacion
   FROM cf_tipo_sol a
  ORDER BY a.id`
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en getCotizacionSolDb: ${error.message}`);
      reject({
        success: false,
        message,
      });
    }
  });
};

export default {
  getCotizacionSolDb,
};
