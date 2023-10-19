var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.NEXT_PUBLIC_HOST,
    user     : process.env.NEXT_PUBLIC_USER,
    password : process.env.NEXT_PUBLIC_PASS,
    database : process.env.NEXT_PUBLIC_DB,
    port:'3306'
});

  connection.connect();

export async function qe(str){
  let data =  await new Promise((resolve, reject)=>{
    connection.query(str, function (error, results) {
      resolve(results);
    });
  });
  return data;
}
