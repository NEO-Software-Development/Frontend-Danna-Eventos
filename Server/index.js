const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"evento"
});
app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;
    const tipo = req.body.tipo;
    const fecha = req.body.fecha;

    db.query('INSERT INTO eventos(nombre,precio,descripcion,tipo,fecha) VALUES(?,?,?,?,?)',[nombre,precio,descripcion,tipo,fecha],
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
            res.send("EVENTO REGISTRADO CON EXITO")
        }
    });
});
app.get("/eventos",(req,res)=>{
    db.query('SELECT * FROM eventos',
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    });
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;
    const tipo = req.body.tipo;
    const fecha = req.body.fecha;

    db.query('UPDATE eventos SET nombre=?, precio=?, descripcion=?, tipo=?, fecha=? WHERE id=?', [nombre, precio, descripcion, tipo, fecha, id],
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
            res.send("EVENTO ACTUALIZADO CON EXITO")
        }
    });
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM eventos WHERE id=?', id,
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
            res.send("EVENTO eliminado CON EXITO")
        }
    });
});
app.listen(3001,()=>{
  console.log("Conexion exitosa en el puerto 3001")  
})