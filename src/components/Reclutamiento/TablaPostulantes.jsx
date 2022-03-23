import React, { useContext } from "react";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import Error from "../../components/item/Error";
import {
  FormControl,
  // FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getPeticionAreasFiltro,
  getPeticionPerfilesFiltro,
  getPeticionPlataformaFiltro,
  getPeticionDepartamentoFiltro, //filtros
  getPeticionPlataforma,
  getPeticionListarPostulantes,
  getPeticionAreasId,
  getPeticionPerfiles,
  getPeticionDepartamentoId,
  getPeticionMarcas,
} from "../../dist/getPeticiones";
import { postPeticionAgregarPostulante } from "../../dist/postPeticiones";
import { putPeticionActualizarPostulante } from "../../dist/putPeticiones";
import { deletePeticionPostulantes } from "../../dist/deletePeticiones";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    overflow: "scroll",
    overflowX: "hidden",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "80%",
      height: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      height: "80%",
    },
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modal1: {
    position: "absolute",
    width: "23rem",
    height: "10rem",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  inputlarge: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "12rem",
    // [theme.breakpoints.up("lg")]: {
    //   width: "auto",
    // },
    [theme.breakpoints.between("md")]: {
      width: "100%",
    },
  },
  button_aceptar: {
    padding: "5px  12px 5px  12px",
    width: "100%",
    color: "black",
    backgroundColor: "#f09208",
    border: "1px solid black",
    borderRadius: "5%",
  },
  button_cancelar: {
    padding: "5px  12px 5px  12px",
    width: "100%",
    color: "white",
    backgroundColor: "#383837",
    border: "1px solid black",
    borderRadius: "5%",
  },
  error: {
    backgroundColor: "red",
    padding: "3px  4px 3px  4px",
    color: "white",
    textAlign: "center",
    borderRadius: "5px",
    marginBottom: "0.5rem",
    fontSize: "1rem",
  },
  texto: {
    flex: "1 1 0%",
    fontWeight: "600",
    color: "#4B5563",
    fontSize: "1rem",
    fontFamily: "Inter, sans-serif",
  },
}));
function TablaPostulantes() {
  const styles = useStyles();
  const { permisosUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [perfiles, setPerfiles] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [plataformasFiltro, setPlataformasFiltro] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [error, setError] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  // const [errorEditar, setErrorEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [data, setData] = useState([]);
  const [areas, setAreas] = useState([]);
  const [unidad, setUnidad] = useState([]);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [areasId, setAreasId] = useState([]);
  const [postulante, setPostulante] = useState({
    id: "",
    numero: "",
    plataforma: "",
    nombres: "",
    apellidos: "",
    edad: "",
    celular: "",
    correo: "",
    carrera: "",
    fechaNacimiento: new Date(),
    fechaRegistro: new Date(),
    dni: "",
    area: "",
    perfil: "",
    experiencia: "",
    linkCV: "",
    cicloActual: "",
    estado: "",
    marca: "",
    departamento: "",
    turno: "",
  });
  // const [plataformasFilter, setPlataformasFilter] = useState({});

  const filtroTurno = {
    Mañana: "Mañana",
    "Mañana y tarde": "Mañana y tarde",
    Tarde: "Tarde",
  };
  const turnos = [
    { id: 1, turno: "Mañana" },
    { id: 2, turno: "Tarde" },
    { id: 3, turno: "Mañana y tarde" },
  ];
  //mañana 1, tarde 2 , mañana y tarde 3
  //A acepto, R rechazado, E espera

  const filtroEstado = {
    A: "Aceptado",
    R: "Rechazado",
    E: "En espera",
  };
  const filtroExperiencia = {
    S: "Si",
    N: "No",
  };
  //
  useEffect(() => {
    getPeticionListarPostulantes(setData, setLoading);
  }, [loading]);

  useEffect(() => {
    getPeticionAreasId(setAreasId, setLoading);
    getPeticionPerfiles(setPerfiles, setLoading);
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
    getPeticionAreasFiltro(setAreas, setLoading);
    getPeticionDepartamentoFiltro(setUnidad, setLoading);
    getPeticionPlataforma(setPlataformas, setLoading);
    getPeticionPlataformaFiltro(setPlataformasFiltro, setLoading);
    getPeticionDepartamentoId(setDepartamentos, setLoading);
    getPeticionMarcas(setMarcas, setLoading);
  }, []);

  const {
    // id,
    // numero,
    apellidos,
    plataforma,
    edad,
    linkCV,
    fechaNacimiento,
    celular,
    correo,
    carrera,
    dni,
    area,
    perfil,
    estado,
    nombres,
    fechaRegistro,
    experiencia,
    cicloActual,
    marca,
    departamento,
    turno,
  } = postulante;

  const departamentoId = (valor) => {
    let { id } = departamentos.find((d) => d.Unidades === valor);
    return id;
  };
  const plataformaId = (valor) => {
    let { pPost_Id } = plataformas.find((e) => e.pPost_nombre === valor);
    return pPost_Id;
  };
  const perfilId = (valor) => {
    let { perfil_Id } = perfiles.find((p) => p.perfil_nombre === valor);
    return perfil_Id;
  };

  const areaId = (valor) => {
    let { id } = areasId.find((p) => p.Areas === valor);
    return id;
  };

  const marcaId = () => {
    return 1;
  };

  const turnoId = (valor) => {
    let { id } = turnos.find((e) => e.turno === valor);
    return id;
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setPostulante({
        numero: "",
        plataforma: "",
        nombres: "",
        apellidos: "",
        edad: "",
        celular: "",
        correo: "",
        carrera: "",
        fechaNacimiento: new Date(),
        fechaRegistro: new Date(),
        dni: "",
        area: "",
        perfil: "",
        experiencia: "",
        linkCV: "",
        cicloActual: "",
        estado: "",
        marca: "",
        departamento: "",
        turno: "",
      });
      setErrorUpdate([]);
    }
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setPostulante((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const form = e.target.elements;
    let id = Number(postulante.numero);
    const data = {
      id_plataforma: Number(form.plataforma.value),
      id_perfil: Number(form.perfil.value),
      nombres: form.nombres.value,
      apellidos: form.apellidos.value,
      dni: form.dni.value,
      fecha_nacimiento: form.fechaNacimiento.value,
      telefono: form.celular.value,
      email: form.correo.value,
      carrera: form.carrera.value,
      ciclo_actual: Number(form.cicloActual.value),
      exp_previa: form.experiencia.value,
      link_cv: form.linkCV.value,
      id_unidad: Number(form.departamento.value),
      id_marca: Number(form.marca.value),
      id_area: Number(form.area.value),
      id_turno: Number(form.turno.value),
      estado_entrevista: form.estado.value,
      fecha_registro: form.fechaRegistro.value,
      id_estado: 1,
    };
    await putPeticionActualizarPostulante(
      data,
      id,
      setLoading,
      setErrorUpdate,
      abrirCerrarModalEditar
    );
    setLoading(false);
    //abrirCerrarModalEditar();
    setErrorUpdate(false);
  };

  const bodyEditar = (
    // <form>
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">EDITAR POSTULANTE</h3>
      <hr />
      <br />
      {/* {errorEditar ? (
        <p className={styles.error}>No debe haber campos vacios</p>
      ) : null} */}
      <form onSubmit={handleSubmitEdit} className="flex flex-col align-middle ">
        <div className="flex justify-evenly md:flex-col ">
          <div className="flex flex-col">
            <FormControl fullWidth>
              <InputLabel>Plataforma</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                name="plataforma"
                id="plataforma"
                onChange={handleChangeEdit}
                value={plataforma}
              >
                {plataformas.map((plataform) => (
                  <MenuItem
                    key={plataform.pPost_Id}
                    value={plataform.pPost_Id + ""}
                  >
                    {plataform.pPost_nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Error errors={errorUpdate["id_plataforma"]}></Error>
            <br />
            <TextField
              className="flex-1"
              onChange={handleChangeEdit}
              id="nombres"
              label="Nombres"
              name="nombres"
              value={nombres}
            />
            <Error errors={errorUpdate["nombres"]}></Error>
            <br />
            <TextField
              className="flex-1"
              onChange={handleChangeEdit}
              name="apellidos"
              label="Apellidos"
              value={apellidos}
            />
            <Error errors={errorUpdate["apellidos"]}></Error>
            <br />
            <TextField
              className="flex-1"
              onChange={handleChangeEdit}
              name="edad"
              label="Edad"
              value={edad}
              type="number"
            />

            <br />
            <TextField
              className="flex-1"
              name="celular"
              label="Celular"
              onChange={handleChangeEdit}
              value={celular}
              type="number"
            />
            <Error errors={errorUpdate["telefono"]}></Error>
            <br />
            <TextField
              className="flex-1"
              name="correo"
              label="Correo"
              onChange={handleChangeEdit}
              value={correo}
              type="email"
            />
            <Error errors={errorUpdate["email"]}></Error>
            <br />
            <TextField
              className="flex-1"
              name="fechaNacimiento"
              label="Fecha Nacimiento"
              type="date"
              onChange={handleChangeEdit}
              value={fechaNacimiento}
            />
            <Error errors={errorUpdate["fecha_nacimiento"]}></Error>
            <br />
            <TextField
              className="flex-1"
              name="fechaRegistro"
              label="Fecha Registro"
              type="date"
              onChange={handleChangeEdit}
              value={fechaRegistro}
            />
            <Error errors={errorUpdate["fecha_registro"]}></Error>
            <br />
            <TextField
              className="flex-1"
              name="dni"
              label="DNI"
              onChange={handleChangeEdit}
              value={dni}
            />
            <Error errors={errorUpdate["dni"]}></Error>
            <br />
          </div>
          <div className="flex flex-col">
            <FormControl fullWidth>
              <InputLabel id="area">Area</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                onChange={handleChangeEdit}
                value={area}
                id="area"
                name="area"
                label="Area"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                {areasId.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.id}>
                      {option.Areas}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={errorUpdate["id_area"]}></Error>
            <br />
            <FormControl>
              <InputLabel id="area">Perfil</InputLabel>
              <Select
                className="flex-1"
                onChange={handleChangeEdit}
                value={perfil}
                id="perfil"
                label="Perfil"
                name="perfil"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                {perfiles.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.perfil_Id + ""}>
                      {option.perfil_nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={errorUpdate["id_perfil"]}></Error>
            <br />
            <FormControl>
              <InputLabel id="area">Unidad</InputLabel>
              <Select
                className="flex-1"
                onChange={handleChangeEdit}
                value={departamento}
                id="departamento"
                label="Unidad"
                name="departamento"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                {departamentos.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.id}>
                      {option.Unidades}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={errorUpdate["id_unidad"]}></Error>
            <br />
            <FormControl className={styles.inputlarge}>
              <InputLabel id="area">Marca</InputLabel>
              <Select
                className="flex-1 "
                nowrap
                onChange={handleChangeEdit}
                value={marca}
                id="marca"
                label="Marca"
                name="marca"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                {marcas.map((option, i) => {
                  return (
                    <MenuItem key={i + 1} value={i + 1}>
                      {option}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={errorUpdate["id_marca"]}></Error>
            <br />
            <TextField
              className="flex-1"
              name="carrera"
              label="Carrera"
              onChange={handleChangeEdit}
              value={carrera}
            />
            <Error errors={errorUpdate["carrera"]}></Error>
            <br />
            <FormControl>
              <InputLabel id="area">Experiencia</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                onChange={handleChangeEdit}
                value={experiencia}
                id="experiencia"
                label="Experiencia"
                name="experiencia"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="S">Sí</MenuItem>
                <MenuItem value="N">No</MenuItem>
              </Select>
            </FormControl>
            <Error errors={errorUpdate["exp_previa"]}></Error>
            <br />
            <TextField
              className="flex-1"
              name="linkCV"
              label="Link CV"
              onChange={handleChangeEdit}
              value={linkCV}
              type="url"
            />
            <Error errors={errorUpdate["link_cv"]}></Error>
            <br />
            <TextField
              className="flex-1"
              name="cicloActual"
              label="Ciclo Actual"
              onChange={handleChangeEdit}
              value={cicloActual}
            />
            <Error errors={errorUpdate["ciclo_actual"]}></Error>
            <br />
            <FormControl>
              <InputLabel id="area">Estado</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                onChange={handleChangeEdit}
                value={estado}
                id="estado"
                name="estado"
                label="Estado"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="A">Aceptado</MenuItem>
                <MenuItem value="R">Rechazado</MenuItem>
                <MenuItem value="E">En espera</MenuItem>
              </Select>
            </FormControl>
            <Error errors={errorUpdate["estado_entrevista"]}></Error>
            <br />
            <FormControl>
              <InputLabel id="area">Turno</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                onChange={handleChangeEdit}
                value={turno}
                id="turno"
                name="turno"
                label="Turno"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="1">Mañana</MenuItem>
                <MenuItem value="2">Tarde</MenuItem>
                <MenuItem value="3">Mañana y Tarde</MenuItem>
              </Select>
            </FormControl>
            <Error errors={errorUpdate["id_turno"]}></Error>
          </div>
        </div>
        <br />
        <div align="center">
          <button
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            type="submit"
          >
            EDITAR
          </button>
          <button
            onClick={() => abrirCerrarModalEditar()}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
    // {/* </form> */}
  );

  const handleSubmitAgregar = async (e) => {
    e.preventDefault();

    const form = e.target.elements;
    const data = {
      id_plataforma: Number(form.plataforma.value),
      id_perfil: Number(form.perfil.value),
      nombres: form.nombres.value,
      apellidos: form.apellidos.value,
      dni: form.dni.value,
      fecha_nacimiento: form.fechaNacimiento.value,
      telefono: form.celular.value,
      email: form.correo.value,
      carrera: form.carrera.value,
      ciclo_actual: Number(form.cicloActual.value),
      exp_previa: form.experiencia.value,
      link_cv: form.linkCV.value,
      id_unidad: Number(form.departamento.value),
      id_marca: Number(form.marca.value),
      id_area: Number(form.area.value),
      id_turno: Number(form.turno.value),
    };
    await postPeticionAgregarPostulante(
      data,
      setLoading,
      setError,
      abrirCerrarModalAgregar
    );
    setLoading(false);
    //abrirCerrarModalAgregar();
    setError(false);
  };
  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
    setPostulante({
      numero: "",
      plataforma: "",
      nombres: "",
      apellidos: "",
      edad: "",
      celular: "",
      correo: "",
      carrera: "",
      fechaNacimiento: new Date(),
      fechaRegistro: new Date(),
      dni: "",
      area: "",
      perfil: "",
      experiencia: "",
      linkCV: "",
      cicloActual: "",
      estado: "",
      marca: "",
      departamento: "",
      turno: "",
    });
    setError([]);
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
    if (modalEliminar) {
      setPostulante({
        id: "",
        numero: "",
        plataforma: "",
        nombres: "",
        apellidos: "",
        edad: "",
        celular: "",
        correo: "",
        carrera: "",
        fechaNacimiento: "",
        fechaRegistro: "",
        dni: "",
        area: "",
        perfil: "",
        experiencia: "",
        linkCV: "",
        cicloActual: "",
        estado: "",
        marca: "",
        departamento: "",
        turno: "",
      });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostulante((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmitEliminar = () => {
    deletePeticionPostulantes(postulante.numero, abrirCerrarModalEliminar);
    setLoading(true);
  };
  const bodyAgregar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Agregar Postulante</h3>
      <hr />
      <br />
      <form
        onSubmit={handleSubmitAgregar}
        className="flex flex-col align-middle "
      >
        <div className="flex  justify-evenly md:flex-col">
          <div className="flex flex-col ">
            <FormControl fullWidth>
              <InputLabel>Plataforma</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                name="plataforma"
                id="plataforma"
                onChange={handleChange}
                value={plataforma}
              >
                {plataformas.map((plataform) => (
                  <MenuItem
                    key={plataform.pPost_Id}
                    value={plataform.pPost_Id + ""}
                  >
                    {plataform.pPost_nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Error errors={error["id_plataforma"]}></Error>
            <br />
            <TextField
              className="flex-1"
              onChange={handleChange}
              id="nombres"
              label="Nombres"
              name="nombres"
              value={nombres}
            />
            <Error errors={error["nombres"]}></Error>
            <br />
            <TextField
              className="flex-1"
              onChange={handleChange}
              name="apellidos"
              label="Apellidos"
              value={apellidos}
            />
            <Error errors={error["apellidos"]}></Error>
            {/* <br />
            <TextField
              className="flex-1"
              onChange={handleChange}
              name="edad"
              label="Edad"
              value={edad}
              type="number"
            /> */}
            <br />
            <TextField
              className="flex-1"
              name="celular"
              label="Celular"
              onChange={handleChange}
              value={celular}
              type="number"
            />
            <Error errors={error["telefono"]}></Error>
            <br />
            <TextField
              className="flex-1"
              name="correo"
              label="Correo"
              onChange={handleChange}
              value={correo}
              type="email"
            />
            <br />
            <InputLabel>Fecha Nacimiento</InputLabel>
            <TextField
              className="flex-1"
              name="fechaNacimiento"
              type="date"
              onChange={handleChange}
              value={fechaNacimiento}
            />
            <Error errors={error["fecha_nacimiento"]}></Error>
            {/* <br />
            <TextField
              className="flex-1"
              name="fechaRegistro"
              type="date"
              onChange={handleChange}
              value={fechaRegistro}
            /> */}
            <br />
            <TextField
              className="flex-1"
              name="dni"
              label="DNI"
              onChange={handleChange}
              value={dni}
            />
            <Error errors={error["dni"]}></Error>
            <br />
          </div>
          <div className="flex flex-col ">
            <FormControl fullWidth>
              <InputLabel id="area">Area</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                onChange={handleChange}
                value={area}
                id="area"
                name="area"
                label="Area"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                {areasId.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.id}>
                      {option.Areas}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["id_area"]}></Error>
            <br />
            <FormControl>
              <InputLabel id="area">Perfil</InputLabel>
              <Select
                className="flex-1"
                onChange={handleChange}
                value={perfil}
                id="perfil"
                label="Perfil"
                name="perfil"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                {perfiles.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.perfil_Id + ""}>
                      {option.perfil_nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["id_perfil"]}></Error>
            <br />
            <FormControl>
              <InputLabel id="area">Unidad</InputLabel>
              <Select
                className="flex-1"
                onChange={handleChange}
                value={departamento}
                id="departamento"
                label="Unidad"
                name="departamento"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                {departamentos.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.id}>
                      {option.Unidades}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["id_unidad"]}></Error>
            <br />
            <FormControl>
              <InputLabel id="area">Marca</InputLabel>
              <Select
                className="flex-1"
                onChange={handleChange}
                value={marca}
                id="marca"
                label="Marca"
                name="marca"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                {marcas.map((option, i) => {
                  return (
                    <MenuItem key={i + 1} value={i + 1}>
                      {option}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["id_marca"]}></Error>
            <br />
            <TextField
              className="flex-1"
              name="carrera"
              label="Carrera"
              onChange={handleChange}
              value={carrera}
            />
            <Error errors={error["carrera"]}></Error>
            <br />
            <FormControl>
              <InputLabel id="area">Experiencia</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                onChange={handleChange}
                value={experiencia}
                id="experiencia"
                label="Experiencia"
                name="experiencia"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="S">Sí</MenuItem>
                <MenuItem value="N">No</MenuItem>
              </Select>
            </FormControl>
            <Error errors={error["exp_previa"]}></Error>
            <br />
            <TextField
              className="flex-1"
              name="linkCV"
              label="Link CV"
              onChange={handleChange}
              value={linkCV}
              type="url"
            />
            <Error errors={error["link_cv"]}></Error>
            <br />
            <TextField
              className="flex-1"
              name="cicloActual"
              label="Ciclo Actual"
              onChange={handleChange}
              value={cicloActual}
            />
            <Error errors={error["ciclo_actual"]}></Error>
            <br />
            {/* <FormControl>
              <InputLabel id="area">Estado</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                onChange={handleChange}
                value={estado}
                id="estado"
                name="estado"
                label="Estado"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="A">Aceptado</MenuItem>
                <MenuItem value="R">Rechazado</MenuItem>
                <MenuItem value="E">En espera</MenuItem>
              </Select>
            </FormControl>
            <br /> */}
            <FormControl>
              <InputLabel id="area">Turno</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                onChange={handleChange}
                value={turno}
                id="turno"
                name="turno"
                label="Turno"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="1">Mañana</MenuItem>
                <MenuItem value="2">Tarde</MenuItem>
                <MenuItem value="3">Mañana y Tarde</MenuItem>
              </Select>
            </FormControl>
            <Error errors={error["id_turno"]}></Error>
          </div>
        </div>
        <br />
        <div align="center">
          <button
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            type="submit"
          >
            AGREGAR
          </button>
          <button
            onClick={() => abrirCerrarModalAgregar()}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );
  const bodyEliminar = (
    <div className={styles.modal1}>
      <div className="px-2 py-2">
        <h2 className="text-center text-xl font-bold">
          ¿Desea eliminar el registro?
        </h2>
        <div className="flex justify-evenly items-center mt-4">
          {/* <div>
                    <Button className={styles.button_aceptar} onClick={() => handleSubmitEliminar()} >Aceptar</Button>
                </div>
                |
                <div>
                    <Button className={styles.button_cancelar} onClick={() => abrirCerrarModalEliminar()}>Cancelar</Button>
                </div> */}
          <button
            color="primary"
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            onClick={handleSubmitEliminar}
          >
            Aceptar
          </button>
          |
          <button
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            onClick={abrirCerrarModalEliminar}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
  const seleccionarPostulante = (postulante, caso) => {
    let postulanteEdit = { ...postulante };
    if (caso === "EDITAR") {
      setPostulante({
        numero: postulanteEdit["NÚMERO"],
        plataforma: plataformaId(postulanteEdit["PLATAFORMA"]),
        nombres: postulanteEdit["Nombres"],
        apellidos: postulanteEdit["Apellidos"],
        edad: postulanteEdit["Edad"],
        celular: postulanteEdit["CELULAR"],
        correo: postulanteEdit["CORREO"],
        carrera: postulanteEdit["CARRERA"],
        fechaNacimiento: postulanteEdit["Fecha de Nacimiento"],
        fechaRegistro: postulanteEdit["Fecha de Registro"],
        dni: postulanteEdit["DNI"],
        area: areaId(postulanteEdit["AREA"]),
        perfil: perfilId(postulanteEdit["PERFIL"]),
        experiencia: postulanteEdit["Experiencia Previa"],
        linkCV: postulanteEdit["Link de CV"],
        cicloActual: postulanteEdit["Ciclo Actual"],
        estado: postulanteEdit["Estado"],
        marca: marcaId(),
        departamento: departamentoId(postulanteEdit["DEPARTAMENTO"]),
        turno: turnoId(postulanteEdit["TURNO"]),
      });
      abrirCerrarModalEditar();
    } else if (caso === "ELIMINAR") {
      setPostulante({ numero: postulanteEdit["NÚMERO"] });
      abrirCerrarModalEliminar();
    }
  };
  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold text-center text-black ">
          Lista de postulantes
        </h3>
      </div>
      {
        (permisosUser.includes("reclutamiento_listapostulantes_agregar")) && 
        (
          <button
            className="bg-yellow-400 px-4 py-2 rounded ml-3 mb-3 border-2 border-gray-900 font-semibold text-black"
            onClick={abrirCerrarModalAgregar}
          >
            AGREGAR
          </button>
        )
      }
      <MaterialTable
        columns={[
          { title: "NÚMERO", field: "NÚMERO", filtering: false },
          {
            title: "PLATAFORMA",
            field: "PLATAFORMA",
            lookup: plataformasFiltro,
          },
          {
            title: "NOMBRES ",
            field: "Nombres",
            cellStyle: { whiteSpace: "nowrap", filtering: false },
            filtering: false,
          },
          {
            title: "APELLIDOS",
            field: "Apellidos",
            cellStyle: { whiteSpace: "nowrap", filtering: false },
            filtering: false,
          },
          { title: "EDAD", field: "Edad", filtering: false },
          { title: "CELULAR", field: "CELULAR", filtering: false },
          { title: "CORREO", field: "CORREO", filtering: false },
          { title: "CARRERA", field: "CARRERA", filtering: false },
          {
            title: "FECHA DE NACIMIENTO",
            field: "Fecha de Nacimiento",
            filtering: false,
          },
          {
            title: "FECHA DE REGISTRO",
            field: "Fecha de Registro",
            filtering: false,
          },
          { title: "DNI", field: "DNI", filtering: false },
          { title: "DEPARTAMENTO", field: "DEPARTAMENTO", lookup: unidad },
          { title: "ÁREA", field: "AREA", lookup: areas },
          { title: "PERFIL", field: "PERFIL", lookup: perfilesTabla },
          { title: "TURNO", field: "TURNO", lookup: filtroTurno },
          {
            title: "EXPERIENCIA PREVIA",
            field: "Experiencia Previa",
            lookup: filtroExperiencia,
          },
          { title: "LINK DE CV", field: "Link de CV", filtering: false },
          { title: "CICLO ACTUAL", field: "Ciclo Actual", filtering: false },
          { title: "ESTADO ENTREVISTA", field: "Estado", lookup: filtroEstado },
        ]}
        data={data}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        actions={[
          (permisosUser.includes("reclutamiento_listapostulantes_editar")) && 
          (
            {
              icon: "edit",
              tooltip: "Editar postulante",
              onClick: (event, rowData) =>
                seleccionarPostulante(rowData, "EDITAR"),
            }
          ),
          (permisosUser.includes("reclutamiento_listapostulantes_eliminar")) && 
          (
            {
              icon: "delete",
              tooltip: "Eliminar postulante",
              onClick: (event, rowData) =>
                seleccionarPostulante(rowData, "ELIMINAR"),
              // onClick: () => tableRef.current && tableRef.current.onQueryChange(),
            }
          ),
        ]}
        options={{
          filtering: true,
          headerStyle: {
            backgroundColor: "#E2E2E2  ",
          },
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
          }),
          searchFieldAlignment: "left",
          showTitle: false,
          exportButton: {
            csv: true,
            pdf: false,
          },
          // actionsColumnIndex: -1,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: <Spinner />,
            addTooltip: "Agregar",
            deleteTooltip: "Eliminar",
            editTooltip: "Editar",
            filterRow: {
              filterTooltip: "Filtrar",
            },
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "filas",
            labelRowsPerPage: "filas por pagina:",
            firstAriaLabel: "Primera pagina",
            firstTooltip: "Primera pagina",
            previousAriaLabel: "Pagina anterior",
            previousTooltip: "Pagina anterior",
            nextAriaLabel: "Pagina siguiente",
            nextTooltip: "Pagina siguiente",
            lastAriaLabel: "Ultima pagina",
            lastTooltip: "Ultima pagina",
          },
          toolbar: {
            nRowsSelected: "{0} ligne(s) sélectionée(s)",
            showColumnsTitle: "Ver columnas",
            showColumnsAriaLabel: "Ver columnas",
            exportTitle: "Exportar",
            exportAriaLabel: "Exportar",
            exportCSVName: "Exportar en formato CSV",
            exportPDFName: "Exportar como PDF",
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar",
          },
          header: {
            actions: "ACCIONES",
          },
        }}
      />
      <Modal open={modalAgregar} onClose={abrirCerrarModalAgregar}>
        {bodyAgregar}
      </Modal>
      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default TablaPostulantes;
