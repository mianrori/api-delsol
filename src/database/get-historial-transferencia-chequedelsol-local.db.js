export const getHistorialTransferenciaChequeDelSolLocalDb = (
  db,
  codCliente
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT a.id,
        a.fecha,
        a.doc_de de_dni,
        LOWER(b.name) de_nombre,
        LOWER(b.last_name) de_apellido,
        a.importe
   FROM cf_transf_chequesol_loc a, cf_compradores b
  WHERE a.doc_de = b.cod_comprador
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
        `Error en getHistorialTransferenciaChequeDelSolLocalDb: ${error.message}`
      );
      reject({
        success: false,
        message,
      });
    }
  });
};

export default {
  getHistorialTransferenciaChequeDelSolLocalDb,
};
