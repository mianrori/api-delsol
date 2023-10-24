export const getSocioDb = (db, dni) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT LOWER(a.name) nombre,
        LOWER(a.last_name) apellido,
        a.sexo,
        NVL(busca_email(a.cod_comprador), '') email,
        NVL(busca_celular(a.cod_comprador, null), '') celular,
        NVL(TO_CHAR(a.fec_nacimiento, 'dd/mm/yyyy'), '') fecha_nacimiento,
        NVL((SELECT SUM(dato.saldo)
              FROM (SELECT TRUNC(SUM(b.saldo_soles)) saldo
                      FROM cf_soles_generados b, cf_tipo_sol c
                     WHERE TRUNC(b.vencimiento) >= TRUNC(SYSDATE)
                       AND NVL(b.saldo_soles, 0) > 0
                       AND NVL(b.anulado, 'N') = 'N'
                       AND b.id_tipo_sol = c.id
                       AND NOT EXISTS
                     (SELECT *
                              FROM cf_transacciones_cab c
                             WHERE c.nro_transaccion = b.nro_transaccion_ref
                               AND c.token_banco IS NOT NULL)
                       AND b.cod_comprador = :dni
                     GROUP BY b.id_tipo_sol
                    UNION ALL
                    SELECT TRUNC(SUM(e.saldo))
                      FROM cf_banco_saldo_sol     d,
                           cf_banco_saldo_sol_vto e,
                           cf_tipo_sol            f
                     WHERE d.dni = e.dni
                       AND d.id_tipo_sol = f.id
                       AND TRUNC(e.vencimiento) >= TRUNC(sysdate)
                       AND d.dni = :dni) dato
             WHERE dato.saldo > 0),
            0) soles,
        NVL(a.activo, 'N') activo,
        LOWER(trim(a.direccion)) direccion,
        (SELECT b.estado FROM cf_banco_saldo_sol b WHERE b.dni = :dni) estado_banco,
        NVL(a.comentario, '') comentario
   FROM cf_compradores a
  WHERE a.cod_comprador = :dni`,
        [dni]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows[0]);
      }
    } catch (error) {
      reject(`Error en getSocioDb: ${error.message.replace(/['"]+/g, "")}`);
    }
  });
};

export default {
  getSocioDb,
};
