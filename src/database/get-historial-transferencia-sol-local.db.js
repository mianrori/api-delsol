export const getHistorialTransferenciaSolLocalDb = (db, codCliente) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT a.id,
        a.fecha,
        a.doc_de de_dni,
        LOWER(b.name) de_nombre,
        LOWER(b.last_name) de_apellido,
        LOWER(c.descripcion) tipo_sol,
        a.cantidad,
        0 valor_sol,
        0 guaranies
   FROM cf_transf_sol_loc a, cf_compradores b, cf_tipo_sol c
  WHERE a.doc_de = b.cod_comprador
    AND c.id = a.id_tipo_sol
    AND nvl(a.anulado, 'N') = 'N'
    AND a.cod_cliente = :codCliente
  ORDER BY 1 DESC`,
        [codCliente]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(
        `Error en getHistorialTransferenciaSolLocalDb: ${error.message}`
      );
      reject({
        success: false,
        message,
      });
    }
  });
};

export default {
  getHistorialTransferenciaSolLocalDb,
};
