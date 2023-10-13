import oracledb from "oracledb";

export const addSocioDb = (db, payload) => {
  return new Promise(async (resolve, reject) => {
    const {
      dni,
      nombre,
      apellido,
      sexo,
      fechaNacimiento,
      telefono,
      celular,
      email,
      direccion,
    } = payload;
    try {
      const result = await db.execute(
        `BEGIN
            pro_crear_socio(:dni,:nombre,:apellido,:sexo,:fechaNacimiento,:telefono,:celular,:email,:direccion);
         END;`,
        {
          dni: {
            dir: oracledb.BIND_IN,
            val: dni,
            type: oracledb.STRING,
          },
          nombre: {
            dir: oracledb.BIND_IN,
            val: nombre,
            type: oracledb.STRING,
          },
          apellido: {
            dir: oracledb.BIND_IN,
            val: apellido,
            type: oracledb.STRING,
          },
          sexo: {
            dir: oracledb.BIND_IN,
            val: sexo,
            type: oracledb.STRING,
          },
          fechaNacimiento: {
            dir: oracledb.BIND_IN,
            val: fechaNacimiento,
            type: oracledb.STRING,
          },
          telefono: {
            dir: oracledb.BIND_IN,
            val: telefono,
            type: oracledb.STRING,
          },
          celular: {
            dir: oracledb.BIND_IN,
            val: celular,
            type: oracledb.STRING,
          },
          email: {
            dir: oracledb.BIND_IN,
            val: email,
            type: oracledb.STRING,
          },
          direccion: {
            dir: oracledb.BIND_IN,
            val: direccion,
            type: oracledb.STRING,
          },
        }
      );
      resolve({
        success: true,
        message: "Usuario creado exitosamente.",
      });
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en addSocioDb: ${error.message}`);
      reject({
        success: false,
        message,
      });
    }
  });
};

export default { addSocioDb };
