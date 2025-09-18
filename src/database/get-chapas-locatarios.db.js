export const getChapasLocatariosDb = (db) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT TRIM(UPPER(d.nombre)) razon_social,
                TRIM(UPPER(c.nombre_fantasia)) local,
                (SELECT e.numero
                    FROM ident_personas e
                  WHERE e.cod_persona = c.cod_persona
                    AND e.cod_ident = 'RUC') ruc,
                a.matricula
            FROM ac_matriculas_locatario a
          INNER JOIN ac_contratos_cab b
              ON b.cod_empresa = a.cod_empresa
            AND b.cod_sucursal = a.cod_sucursal
            AND b.tip_comprobante = a.tip_comprobante
            AND b.ser_comprobante = a.ser_comprobante
            AND b.nro_comprobante = a.nro_comprobante
          INNER JOIN cc_clientes c
              ON c.cod_empresa = b.cod_empresa
            AND c.cod_cliente = b.cod_cliente
          INNER JOIN personas d
              ON d.cod_persona = c.cod_persona
          WHERE NVL(a.activo, 'N') = 'S'
            AND NVL(b.estado, 'I') = 'A'
          ORDER BY a.id`
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      reject(
        `Error en getChapasLocatariosDb: ${error.message.replace(/['"]+/g, "")}`
      );
    }
  });
};

export default {
  getChapasLocatariosDb,
};
