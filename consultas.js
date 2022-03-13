const { Pool } = require ( "pg" );

const config={
    user: "fidonoso_desafiolatam" ,
    host: "postgresql-fidonoso.alwaysdata.net" ,
    password: "desafio1234" ,
    database: "fidonoso_likeme",
    port: 5432 ,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
}
const pool = new Pool(config);

// funcion para agregar un nuevo post a la BD
const insertar = async (datos) => {
 datos.push(0)
    const consulta={
        text: "INSERT INTO post (usuario, url, descripcion, likes) values( $1, $2, $3, $4)",
        values: datos
    };
    try{
    const result = await pool.query( consulta );
    return result;
    }catch(e){
        console.log(e.code)
        console.log('Error en la función INSERTAR')
        return e
    }
};

//funcion para consultar todas las imagenes en la BD y pintarlas en el HTML
const consultar=async ()=>{
    try {
        const result = await pool.query( "SELECT * FROM post;" );
        return result.rows;
        } catch (error) {
        console.log(error.code);
        console.log('Error en la función CONSULTAR')
        return error
        }
};
//funcion para agrgar un like por id
const likes = async (datos) => {
    let id=[datos]
    const consulta = {
        text: `UPDATE post SET likes = likes +1  WHERE id = $1  RETURNING *` ,
        values: id,
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        console .log(error);
        console.log('Error en la función LIKES')
        return error;
    }
};


module.exports={insertar, consultar, likes}