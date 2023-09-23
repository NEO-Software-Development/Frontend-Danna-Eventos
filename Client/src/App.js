import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

//Inicializo las variables y su funcion para prox actulizaciones.
function App() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState(0);
  const [editar, setEditar] = useState(false);
  const [eventList, setEventos] = useState([]);

//Agregar nuevo evento por medio de axios
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      tipo: tipo,
      fecha: fecha
    }).then(() => {
      getEventos();
      Reset();
    });
  }
  //editar
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      tipo: tipo,
      fecha: fecha
    }).then(() => {
      getEventos();
      Reset();
    })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }
//Modo edicion
const editEvent = (val) => {
  setEditar(true);
  setNombre(val.nombre);
  setPrecio(val.precio);
  setDescripcion(val.descripcion);
  setTipo(val.tipo);
  setFecha(formatDate(val.fecha)); // Formatea la fecha al editar
  setId(val.id);
}
//eliminar
  const deleteEventos = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      getEventos();
      Reset();
    })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }
  //Mantener actulizada la tabla
  const getEventos = () => {
    Axios.get("http://localhost:3001/eventos").then((response) => {
      setEventos(response.data);
    });
  }
  //Funcion para vaciar los campos
  const Reset = () => {
    setNombre("");
    setPrecio(0);
    setDescripcion("");
    setTipo("");
    setFecha("");
    setEditar(false);
  }
//organiza la fecha para no ser mostrada en ISO
function formatDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
  //Al cargar la pagina se muestren los datos
  useEffect(() => {
    getEventos();
  }, []);
  return (
    //Todo el contenido del programa visualmente
  <div className="container">
  <div className="card text-center">
  <div className="card-header">
    GESTION DE EVENTOS
  </div>
  <div className="card-body">
    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Name:</span>
    <input type="text"
    onChange={(event)=>{
      setNombre(event.target.value);
  }}
  className="form-control" value={nombre} placeholder="Event name" aria-label="Username" aria-describedby="basic-addon1"/>
</div>
<div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Price:</span>
    <input type="double" value={precio}
    onChange={(event)=>{
      setPrecio(event.target.value);
    }}
  className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Description:</span>
    <input type="text" value={descripcion}
    onChange={(event)=>{
      setDescripcion(event.target.value);
    }}
  className="form-control" placeholder="Description" aria-label="Username" aria-describedby="basic-addon1"/>
</div>
<div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Event type:</span>
    <input type="text" value={tipo}
    onChange={(event)=>{
      setTipo(event.target.value);
    }}
  className="form-control" placeholder="Event type" aria-label="Username" aria-describedby="basic-addon1"/>
</div>
<div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Date:</span>
    <input type="date" value={fecha}
    onChange={(event)=>{
      setFecha(event.target.value);
    }}
  className="form-control" placeholder="Date" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

  </div>
  <div className="card-footer text-muted">
    {
      editar? 
      <div>
      <button className='btn btn-primary m-2' onClick={update}>Update</button>
      <button className='btn btn-info m-2' onClick={Reset}>Cancel</button>
       </div>
      :
      <button className='btn btn-success' onClick={add}>Register Data</button>
    }

  </div>
</div>
<table className="table table-striped">
  <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Description</th>
        <th scope="col">Event type</th>
        <th scope="col">Date</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
    {
        eventList.map((val,key)=>{
          return <tr key={val.id}>
                  <th scope="row">{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.precio}</td>
                  <td>{val.descripcion}</td>
                  <td>{val.tipo}</td>
                  <td>{formatDate(val.fecha)}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" 
                      onClick={()=>{
                        editEvent(val)

                      }}
                      className="btn btn-info">Edit</button>
                      <button type="button" onClick={()=>{
                        deleteEventos(val.id);
                      }} className="btn btn-danger">Delete</button>
                    </div>
                  </td>

                </tr>
        })
      }
      
    </tbody>
</table>
    </div>
  );
}

export default App;
