export const getSolDb = (db, dni) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT dato.saldo,
        dato.transferible,
        dato.id_tipo_sol,
        dato.descripcion_tipo_sol,
        dato.cotizacion_sol,
        dato.orden_uso
   FROM (SELECT TRUNC(SUM(a.saldo_soles)) saldo,
                NVL(b.transferible, 'N') transferible,
                a.id_tipo_sol,
                b.descripcion descripcion_tipo_sol,
                (CASE
                  WHEN NVL((SELECT COUNT(e.id)
                             FROM cf_promo_cotiza_sol e, cf_promociones_det f
                            WHERE e.cod_empresa = f.cod_empresa
                              AND e.cod_promocion = f.cod_promocion
                              AND e.nro_item = f.nro_item
                              AND nvl(f.estado, 'I') = 'A'
                              AND e.id_tipo_sol = a.id_tipo_sol
                              AND sysdate BETWEEN f.fecha_desde AND
                                  f.fecha_hasta),
                           0) > 0 THEN
                   (SELECT e.cot_shopping
                      FROM cf_promo_cotiza_sol e, cf_promociones_det f
                     WHERE e.cod_empresa = f.cod_empresa
                       AND e.cod_promocion = f.cod_promocion
                       AND e.nro_item = f.nro_item
                       AND nvl(f.estado, 'I') = 'A'
                       AND e.id_tipo_sol = a.id_tipo_sol
                       AND sysdate BETWEEN f.fecha_desde AND f.fecha_hasta)
                  ELSE
                   NVL((SELECT c.valor_compra
                         FROM cf_tasacion_soles c
                        WHERE c.fecha =
                              (SELECT MAX(d.fecha) FROM cf_tasacion_soles d)),
                       0)
                END) cotizacion_sol,
                b.orden_uso
           FROM cf_soles_generados a, cf_tipo_sol b
          WHERE a.id_tipo_sol = b.id
            and TRUNC(a.vencimiento) >= TRUNC(SYSDATE)
            AND NVL(a.saldo_soles, 0) > 0
            AND NVL(a.anulado, 'N') = 'N'
            AND NOT EXISTS
          (SELECT *
                   FROM cf_transacciones_cab c
                  WHERE c.nro_transaccion = a.nro_transaccion_ref
                    AND c.token_banco IS NOT NULL)
            AND a.cod_comprador = :dni
          GROUP BY NVL(b.transferible, 'N'),
                   a.id_tipo_sol,
                   b.descripcion,
                   b.orden_uso
         UNION ALL
         SELECT TRUNC(SUM(e.saldo)),
                NVL(f.transferible, 'N'),
                d.id_tipo_sol,
                f.descripcion,
                (CASE
                  WHEN NVL((SELECT COUNT(e.id)
                             FROM cf_promo_cotiza_sol e, cf_promociones_det f
                            WHERE e.cod_empresa = f.cod_empresa
                              AND e.cod_promocion = f.cod_promocion
                              AND e.nro_item = f.nro_item
                              AND e.id_tipo_sol_banco = d.id_tipo_sol
                              AND nvl(f.estado, 'I') = 'A'
                              AND sysdate BETWEEN f.fecha_desde AND
                                  f.fecha_hasta),
                           0) > 0 THEN
                   (SELECT e.cot_banco
                      FROM cf_promo_cotiza_sol e, cf_promociones_det f
                     WHERE e.cod_empresa = f.cod_empresa
                       AND e.cod_promocion = f.cod_promocion
                       AND e.nro_item = f.nro_item
                       AND nvl(f.estado, 'I') = 'A'
                       AND e.id_tipo_sol_banco = d.id_tipo_sol
                       AND sysdate between f.fecha_desde AND f.fecha_hasta)
                  ELSE
                   NVL((SELECT c.valor_compra
                         FROM cf_tasacion_soles c
                        WHERE c.fecha =
                              (SELECT MAX(d.fecha) FROM cf_tasacion_soles d)),
                       0)
                END),
                f.orden_uso
           FROM cf_banco_saldo_sol d, cf_banco_saldo_sol_vto e, cf_tipo_sol f
          WHERE d.dni = e.dni
            AND d.id_tipo_sol = f.id
            AND TRUNC(e.vencimiento) >= TRUNC(sysdate)
            AND d.dni = :dni
          GROUP BY NVL(f.transferible, 'N'),
                   d.id_tipo_sol,
                   f.descripcion,
                   f.orden_uso) dato
  WHERE dato.saldo > 0
  ORDER BY 6`,
        [dni]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      reject(`Error en getSolDb: ${error.message.replace(/['"]+/g, "")}`);
    }
  });
};

export default {
  getSolDb,
};
