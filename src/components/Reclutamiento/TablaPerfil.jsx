import MaterialTable from "material-table";
import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  TextField,
  // button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getPeticionAreas,
  getPeticionPerfiles,
  // getPeticionPerfilId,
  getPeticionDepartamentoId,
  getPeticionMarcas,
  getPeticionListarRecursos,
  getPeticionAreasId,
  getPeticionAreasFiltro,
  getPeticionPerfilesFiltro,
  getPeticionDepartamentoFiltro, //filtros
} from "../../dist/getPeticiones";
import { postPeticionAgregarRecurso } from "../../dist/postPeticiones";
import { deletePeticionRecursos } from "../../dist/deletePeticiones";
import { putPeticionActualizarRecurso } from "../../dist/putPeticiones";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../context/UserContext";
// const dataEmpleados = [
//   {
//     id: 1,
//     perfil: 1,
//     departamento: "Grupo Consigueventas Inversiones E.I.R.L",
//     area: 2,
//     subarea: "Frontend",
//     encargado: "David Jimenez",
//     link: "www.fafafa.com",
//     fecha: "2021-12-10",
//   },
//   {
//     id: 2,
//     perfil: 2,
//     departamento: "Grupo Consigueventas Inversiones E.I.R.L",
//     area: 1,
//     subarea: "Frontend",
//     encargado: "David Jimenez",
//     link: "www.fafafa.com",
//     fecha: "2021-12-01",
//   },
//   {
//     id: 3,
//     perfil: 3,
//     departamento: "Grupo Consigueventas Inversiones E.I.R.L",
//     area: 9,
//     subarea: "Frontend",
//     encargado: "David Jimenez",
//     link: "www.fafafa.com",
//     fecha: "2021-12-01",
//   },
// ];

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "21rem",
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    borderRadius: "0.3rem",
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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

const TablaPerfil = () => {
  const styles = useStyles();
  const { permisosUser } = useContext(UserContext);
  // States
  // const [selectedRow, setSelectedRow] = useState(null);
  //
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [caso, setCaso] = useState("");
  //
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [data, setData] = useState([]);
  const [perfilEmpleado, setPerfilEmpleado] = useState({
    perfil_id: "",
    area_id: "",
    unidad_id: "",
    rec_enlace: "",
    marca_id: "",

    AREA: "",
    DEPARTAMENTO: "",
    ENCARGADO: null,
    "FECHA DE ACTUALIZACION": "",
    ID: "",
    "ID RECURSO NOMBRE": "",
    "LINK DEL RECURSO": "",
    MARCA: "",
    "NOMBRE RECURSO": "",
    PERFIL: "",
  });
  const { AREA, DEPARTAMENTO, MARCA, PERFIL } = perfilEmpleado;
  const [areas, setAreas] = useState([]);
  const [areasId, setAreasId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marcas, setMarcas] = useState([]);
  const [actualizarTabla, setActualizarTabla] = useState(true);
  const [departamentos, setDepartamentos] = useState([]);
  const [perfiles, setPerfiles] = useState([]);
  const [perfilesFiltro, setPerfilesFiltro] = useState([]);
  const [areasFiltro, setAreasFiltro] = useState([]);
  const [unidadFiltro, setUnidadFiltro] = useState([]);
  useEffect(() => {
    const data = {
      recurso_nombre: 2,
    };
    // setData(dataEmpleados);
    getPeticionListarRecursos(setData, data, setLoading);
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    getPeticionAreasId(setAreasId, setLoading);
    getPeticionAreas(setAreas, setLoading);
    getPeticionPerfiles(setPerfiles, setLoading);
    getPeticionDepartamentoId(setDepartamentos, setLoading);
    getPeticionMarcas(setMarcas, setLoading);
    getPeticionPerfilesFiltro(setPerfilesFiltro, setLoading);
    getPeticionAreasFiltro(setAreasFiltro, setLoading);
    getPeticionDepartamentoFiltro(setUnidadFiltro, setLoading);
  }, []);

  //Funciones que devuelven Id respectivo
  const perfilId = () => {
    let perfil = 0;
    perfiles.forEach((item) => {
      if (item.perfil_nombre === PERFIL) {
        perfil = item.perfil_Id;
      }
    });
    return perfil;
  };
  const departamentoId = () => {
    let departamento = 0;
    departamentos.forEach((item) => {
      if (item.Unidades === DEPARTAMENTO) {
        departamento = item.id;
      }
    });
    return departamento;
  };
  const areaId = () => {
    let area = 0;
    areasId.forEach((item) => {
      if (item.Areas === AREA) {
        area = item.id;
      }
    });
    return area;
  };
  const marcaId = () => {
    if (MARCA === "Grupo Consigueventas Inversiones E.I.R.L") return 1;
  };
  // Funcion para acceder al modal Editar
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setPerfilEmpleado({
        perfil_id: "",
        area_id: "",
        unidad_id: "",
        rec_enlace: "",
        marca_id: "",

        AREA: "",
        DEPARTAMENTO: "",
        ENCARGADO: null,
        "FECHA DE ACTUALIZACION": "",
        ID: "",
        "ID RECURSO NOMBRE": "",
        "LINK DEL RECURSO": "",
        MARCA: "",
        "NOMBRE RECURSO": "",
        PERFIL: "",
      });
    }
  };

  // Funcion para acceder al modal Agregar
  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
  };
  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };
  // Funcion para acceder al modal Eliminar
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
    if (modalEliminar) {
      setPerfilEmpleado({
        perfil_id: "",
        area_id: "",
        unidad_id: "",
        rec_enlace: "",
        marca_id: "",
      });
    }
  };

  // Funcion que almacena los cambios en el state de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfilEmpleado({
      ...perfilEmpleado,
      [name]: value,
    });
  };

  // Submit para el modal Editar
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const form = e.target.elements;
    const perfilActualizado = {
      rec_nombre_id: Number(perfilEmpleado["ID RECURSO NOMBRE"]),
      rec_nombre: perfilEmpleado["NOMBRE RECURSO"],
      //
      rec_id: Number(perfilEmpleado["ID"]),
      rec_enlace: perfilEmpleado["LINK DEL RECURSO"],
      rec_perfil_id_pk: Number(form.perfil.value),
      rec_area_id_pk: Number(form.area.value),
      rec_marca_id_pk: Number(form.marca.value),
      rec_unidad_id_pk: Number(form.departamento.value),
    };
    putPeticionActualizarRecurso(perfilActualizado, setLoading);
    setActualizarTabla(!actualizarTabla);
    setCaso("Editar");
    abrirCerrarModalEditar();
    abrirCerrarModalConfirmar();
    setLoading(false);
  };

  // Submit para el modal Agregar
  const handleSubmitAgregar = async (e) => {
    e.preventDefault();
    perfilEmpleado.rec_nombre = "Perfil";
    // console.log(perfilEmpleado);
    postPeticionAgregarRecurso(perfilEmpleado, setLoading);
    setLoading(false);
    setCaso("Agregar");
    abrirCerrarModalAgregar();
    abrirCerrarModalConfirmar();
  };

  // Submit para el modal Eliminar
  const handleSubmitEliminar = () => {
    deletePeticionRecursos(perfilEmpleado);
    setLoading(true);
    setCaso("Eliminar");
    abrirCerrarModalEliminar();
    abrirCerrarModalConfirmar();
  };

  // Manejador de Cambio
  const handleChange2 = ({ target }) => {
    const { value, name } = target;
    let valor = "";
    if (name === "departamento") {
      departamentos.forEach((item) => {
        if (item.id === value) valor = item.Unidades;
      });
      setPerfilEmpleado((prevState) => ({
        ...prevState,
        DEPARTAMENTO: valor,
      }));
    }
    if (name === "area") {
      areasId.forEach((item) => {
        if (item.id === value) valor = item.Areas;
      });
      setPerfilEmpleado((prevState) => ({
        ...prevState,
        AREA: valor,
      }));
    }
    if (name === "perfil") {
      perfiles.forEach((item) => {
        if (item.perfil_Id === value) valor = item.perfil_nombre;
      });
      setPerfilEmpleado((prevState) => ({
        ...prevState,
        PERFIL: valor,
      }));
    }
    if (name === "LINK DEL RECURSO") {
      setPerfilEmpleado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  //Body del modal confirmación
  const bodyConfirmar = (
    <div className={styles.modal}>
      <div className="flex flex-col place-content-center">
        {caso === "Agregar" && (
          <h3 className="text-center text-lg font-bold">Recurso Agregado</h3>
        )}
        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">Recurso Editado</h3>
        )}
        {caso === "Eliminar" && (
          <h3 className="text-center text-lg font-bold">Recurso Eliminado</h3>
        )}
        <button
          onClick={() => abrirCerrarModalConfirmar()}
          className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"
          // className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
        >
          <img
            src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris.png"
            style={{ width: "1.5rem", height: "1.5rem" }}
            alt=""
          />
        </button>
      </div>
    </div>
  );
  // Body del modal para editar
  const bodyEditar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Editar Recurso Perfil</h3>
      <hr />
      <br />

      <form onSubmit={handleSubmitEdit} className="flex flex-col align-middle">
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Marca" required>
            Marca
          </InputLabel>
          <Select
            labelId="Marca"
            id="Marca"
            label="Marca"
            onChange={handleChange2}
            name="marca"
            value={marcaId()}
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
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Departamento" required>
            Departamento
          </InputLabel>
          <Select
            labelId="Departamento"
            id="Departamento"
            label="Departamento"
            onChange={handleChange2}
            name="departamento"
            value={departamentoId()}
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
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Area" required>
            Area
          </InputLabel>
          <Select
            labelId="Area"
            className="flex-1"
            onChange={handleChange2}
            value={areaId()}
            id="Area"
            name="area"
            label="Area"
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
        <FormControl fullWidth className="mb-3">
          <InputLabel id="perfil" required>
            Perfil
          </InputLabel>
          <Select
            labelId="perfil"
            className="flex-1"
            onChange={handleChange2}
            id="perfil"
            name="perfil"
            label="perfil"
            value={perfilId()}
          >
            {perfiles.map((option, i) => {
              return (
                <MenuItem key={i} value={option.perfil_Id}>
                  {option.perfil_nombre}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          InputLabelProps={{ shrink: true, required: true }}
          className="mb-3"
          label="Link del recurso"
          name="LINK DEL RECURSO"
          onChange={handleChange2}
          value={perfilEmpleado && perfilEmpleado["LINK DEL RECURSO"]}
          required
          type="url"
        />

        <br />
        <div className="flex justify-evenly items-center">
          <button
            type="submit"
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
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
  );

  const bodyAgregar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Agregar Recurso Perfil</h3>
      <hr />
      <br />
      <form
        onSubmit={handleSubmitAgregar}
        className="flex flex-col align-middle"
      >
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Marca" required>
            Marca
          </InputLabel>
          <Select
            required
            labelId="Marca"
            id="Marca"
            label="Marca"
            name="marca_id"
            onChange={handleChange}
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
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Perfil" required>
            Perfil
          </InputLabel>
          <Select
            required
            className="flex-1 "
            onChange={handleChange}
            id="Estado Falta"
            name="perfil_id"
            label="Perfil"
            defaultMenuIsOpen={false}
            isSearchable={false}
          >
            {perfiles.map((option, i) => {
              return (
                <MenuItem key={i} value={option.perfil_Id}>
                  {option.perfil_nombre}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Departamento" required>
            Departamento
          </InputLabel>
          <Select
            required
            labelId="Departamento"
            id="Departamento"
            label="Departamento"
            name="unidad_id"
            onChange={handleChange}
          >
            {departamentos.map((option, i) => {
              return (
                <MenuItem key={Number(option.id)} value={Number(option.id)}>
                  {option.Unidades}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Area" required>
            Area
          </InputLabel>
          <Select
            required
            labelId="Area"
            className="flex-1"
            onChange={handleChange}
            // value={perfil}
            id="Area"
            name="area_id"
            label="Area"
          >
            {areas.map((option, i) => {
              return (
                <MenuItem key={i + 1} value={i + 1}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          className="mb-3"
          label="Link del recurso"
          name="rec_enlace"
          onChange={handleChange}
          required
          type="url"
        />
        <br />
        <div className="flex justify-evenly items-center">
          <button
            type="submit"
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
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
    <div className={styles.modal}>
      <div className="px-2 py-2">
        <h2 className="text-center text-xl font-bold">
          ¿Desea eliminar el registro?
        </h2>
        <div className="flex justify-evenly items-center mt-4">
          {/* <div>
                        <button className={styles.button_aceptar} onClick={() => handleSubmitEliminar()} >Aceptar</button>
                    </div>
                    |
                    <div>
                        <button className={styles.button_cancelar} onClick={() => abrirCerrarModalEliminar()}>Cancelar</button>
                    </div> */}
          <button
            color="primary"
            onClick={() => handleSubmitEliminar()}
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          >
            ELIMINAR
          </button>
          |
          <button
            onClick={abrirCerrarModalEliminar}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );

  const seleccionarEmpleado = (empleado, caso) => {
    let empleadoEdit = { ...empleado };
    // empleadoEdit['Estado Falta']==='Falta Justificada'?empleadoEdit['Estado Falta']=3:empleadoEdit['Estado Falta']=4;
    setPerfilEmpleado(empleadoEdit);

    //(caso === "EDITAR") && abrirCerrarModalEditar();
    if (caso === "EDITAR") {
      setPerfilEmpleado(empleadoEdit);
      abrirCerrarModalEditar();
    } else if (caso === "ELIMINAR") {
      setPerfilEmpleado(empleado.ID);
      abrirCerrarModalEliminar();
    }
  };

  return (
    <div className="container mx-auto justify-center">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold  text-center text-black">Perfiles</h3>
        {permisosUser.includes("reclutamiento_recursos_perfil_agregar") && (
          <button
            className="bg-yellow-400 px-4 py-2 rounded ml-3 mb-3 border-2 border-gray-900 font-semibold text-black "
            onClick={abrirCerrarModalAgregar}
          >
            AGREGAR
          </button>
        )}

        <MaterialTable
          columns={[
            // {
            //   title: "NOMBRE",
            //   field: "NOMBRE RECURSO",
            // },
            {
              title: "PERFIL",
              field: "PERFIL",
              lookup: perfilesFiltro,
            },
            {
              title: "DEPARTAMENTO",
              field: "DEPARTAMENTO",
              lookup: unidadFiltro,
            },
            {
              title: "AREA",
              field: "AREA",
              lookup: areasFiltro,
            },
            {
              title: "ENCARGADO",
              field: "ENCARGADO",
              filtering: false,
              lookup: { null: "vacio" },
            },
            {
              title: "LINK DE RECURSO",
              field: "LINK DEL RECURSO",
              filtering: false,
            },
            {
              title: "FECHA DE ACTUALIZACION",
              field: "FECHA DE ACTUALIZACION",
              filtering: false,
            },
          ]}
          data={data}
          actions={[
            permisosUser.includes("reclutamiento_recursos_perfil_editar") && {
              icon: "edit",
              tooltip: "Editar perfil",
              onClick: (event, rowData) =>
                seleccionarEmpleado(rowData, "EDITAR"),
            },
            permisosUser.includes("reclutamiento_recursos_perfil_eliminar") && {
              icon: "delete",
              tooltip: "Eliminar Perfil",
              onClick: (event, rowData) =>
                seleccionarEmpleado(rowData, "ELIMINAR"),
              // onClick: () => tableRef.current && tableRef.current.onQueryChange(),
            },
          ]}
          options={{
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
            // rowStyle: (rowData) => ({
            //   backgroundColor:
            //     selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            // }),
            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: true,

            exportAllData: true,
            exportFileName: "Tabla de Recurso Perfil",
            // actionsColumnIndex: -1,
            filtering: true,
            // rowStyle: {
            //   backgroundColor: '#EEE',
            // }
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
        <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>
        <Modal open={modalAgregar} onClose={abrirCerrarModalAgregar}>
          {bodyAgregar}
        </Modal>
        <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
        <Modal open={modalConfirmar} onClose={abrirCerrarModalConfirmar}>
          {bodyConfirmar}
        </Modal>
      </div>
    </div>
  );
};

export default TablaPerfil;
