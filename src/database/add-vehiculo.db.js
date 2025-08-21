import oracledb from "oracledb";

export const addVehiculoDb = (db, payload) => {
  return new Promise(async (resolve, reject) => {
    const { dni, matricula, marca, modelo, color } = payload;
    try {
      const result = await db.execute(
        `BEGIN
            pro_insertar_vehiculo_socio(:dni,:matricula,:marca,:modelo,:color,:solesGift);
         END;`,
        {
          dni: {
            dir: oracledb.BIND_IN,
            val: dni,
            type: oracledb.STRING,
          },
          matricula: {
            dir: oracledb.BIND_IN,
            val: matricula,
            type: oracledb.STRING,
          },
          marca: {
            dir: oracledb.BIND_IN,
            val: marca,
            type: oracledb.STRING,
          },
          modelo: {
            dir: oracledb.BIND_IN,
            val: modelo,
            type: oracledb.STRING,
          },
          color: {
            dir: oracledb.BIND_IN,
            val: color,
            type: oracledb.STRING,
          },
          solesGift: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        }
      );
      resolve({
        status: 200,
        solesGift: result.outBinds.solesGift,
        success: true,
        message: "Vehículo creado exitosamente.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en addVehiculoDb: ${error.message}`);
      let status = 500;
      if (error.message.includes("20002")) {
        status = 409;
      }
      reject({
        status,
        success: false,
        message,
      });
    }
  });
};

export default { addVehiculoDb };
