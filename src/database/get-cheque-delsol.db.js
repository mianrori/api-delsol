export const getChequeDelSolDb = (db, dni) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT a.saldo_virtual saldo,
          TO_CHAR(a.vencimiento, 'dd/mm/yyyy') vencimiento
     FROM cf_cheque_sol_saldo a
    WHERE a.dni = :dni
      AND a.vencimiento >= TRUNC(sysdate)`,
        [dni]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows[0]);
      }
    } catch (error) {
      reject(
        `Error en getChequeDelSolDb: ${error.message.replace(/['"]+/g, "")}`
      );
    }
  });
};

export default {
  getChequeDelSolDb,
};
