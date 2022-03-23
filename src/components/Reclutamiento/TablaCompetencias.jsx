import React, { useContext, useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getPeticionAreas,
  // getPeticionDepartamento,
  getPeticionListarRecursos,
  getPeticionDepartamentoId,
  getPeticionMarcas,
  getPeticionPerfiles,
  getPeticionAreasFiltro,
  getPeticionPerfilesFiltro,
  getPeticionDepartamentoFiltro,
  getPeticionAreasId, //filtros
} from "../../dist/getPeticiones";
import { deletePeticionRecursos } from "../../dist/deletePeticiones";
import { postPeticionAgregarRecurso } from "../../dist/postPeticiones";
import { putPeticionActualizarRecurso } from "../../dist/putPeticiones";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../context/UserContext";

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
}));

const TablaCompetencias = () => {
  const styles = useStyles();
  const { permisosUser } = useContext(UserContext);
  // const [selectedRow, setSelectedRow] = useState(null);
  //
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [caso, setCaso] = useState("");
  //
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [perfiles, setPerfiles] = useState([]);
  // const [perfilesTabla, setPerfilesTabla] = useState([]);
  // const [unidades, setUnidades] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  // console.log(unidades);
  const [areasId, setAreasId] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [errorEditar, setErrorEditar] = useState(false);
  const [data, setData] = useState([]);
  const [areas, setAreas] = useState([]);
  const [perfilesFiltro, setPerfilesFiltro] = useState([]);
  const [areasFiltro, setAreasFiltro] = useState([]);
  const [unidadFiltro, setUnidadFiltro] = useState([]);
  const [competencia, setCompetencia] = useState({
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
  // const [errorUpdate, setErrorUpdate] = useState([]);
  const { AREA, DEPARTAMENTO, MARCA, PERFIL } = competencia;

  useEffect(() => {
    const data = {
      recurso_nombre: 1,
    };
    getPeticionListarRecursos(setData, data, setLoading);
  }, [loading]);
  useEffect(() => {
    setLoading(true);
    getPeticionDepartamentoId(setDepartamentos, setLoading);
    getPeticionAreas(setAreas, setLoading);
    getPeticionAreasId(setAreasId, setLoading);
    getPeticionPerfiles(setPerfiles, setLoading);
    // getPeticionDepartamento(setUnidades, setLoading);
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

  const abrirCerrarModalAgregar = () => {
    // setErrorUpdate([]);
    setModalAgregar(!modalAgregar);
    // setError(false);
  };
  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };
  // Funcion para acceder al modal Editar
  const abrirCerrarModalEditar = () => {
    // setErrorUpdate([]);
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setCompetencia({
        id: "",
        perfil: "",
        departamento: "",
        area: "",
        subarea: "",
        link: "",
      });
      // setErrorEditar(false);
    }
  };

  // Funcion para acceder al modal Eliminar
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
    if (modalEliminar) {
      setCompetencia({
        id: "",
        perfil: "",
        departamento: "",
        area: "",
        subarea: "",
        link: "",
      });
    }
  };

  // console.log(competencia);
  // Funcion que almacena los cambios en el state de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name === "perfil") {
    //   getPeticionPerfilId(setCompetencia, value);
    // }
    setCompetencia({
      ...competencia,
      [name]: value,
    });
  };

  // Submit para el modal Editar
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const form = e.target.elements;
    const perfilActualizado = {
      rec_nombre_id: Number(competencia["ID RECURSO NOMBRE"]),
      rec_nombre: competencia["NOMBRE RECURSO"],
      //
      rec_id: Number(competencia["ID"]),
      rec_enlace: competencia["LINK DEL RECURSO"],
      rec_perfil_id_pk: Number(form.perfil.value),
      rec_area_id_pk: Number(form.area.value),
      rec_marca_id_pk: Number(form.marca.value),
      rec_unidad_id_pk: Number(form.departamento.value),
    };
    putPeticionActualizarRecurso(perfilActualizado, setLoading);
    // setErrorUpdate([]);
    // setErrorEditar(false);
    setCaso("Editar");
    abrirCerrarModalEditar();
    abrirCerrarModalConfirmar();
    setLoading(false);
  };

  // Submit para el modal Agregar
  const handleSubmitAgregar = (e) => {
    e.preventDefault();
    // setError(false);
    // setErrorUpdate([]);
    competencia.rec_nombre = "ManualCompetencias";
    postPeticionAgregarRecurso(competencia, setLoading);
    setLoading(false);
    setCaso("Agregar");
    abrirCerrarModalAgregar();
    abrirCerrarModalConfirmar();
  };

  // Submit para el modal Eliminar
  const handleSubmitEliminar = () => {
    deletePeticionRecursos(competencia);
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
      setCompetencia((prevState) => ({
        ...prevState,
        DEPARTAMENTO: valor,
      }));
    }
    if (name === "area") {
      areasId.forEach((item) => {
        if (item.id === value) valor = item.Areas;
      });
      setCompetencia((prevState) => ({
        ...prevState,
        AREA: valor,
      }));
    }
    if (name === "perfil") {
      perfiles.forEach((item) => {
        if (item.perfil_Id === value) valor = item.perfil_nombre;
      });
      setCompetencia((prevState) => ({
        ...prevState,
        PERFIL: valor,
      }));
    }
    if (name === "LINK DEL RECURSO") {
      setCompetencia((prevState) => ({
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
      <h3 className="text-center text-lg font-bold">Editar Empleado</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmitEdit} className="flex flex-col align-middle">
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Marca" required>
            Marca
          </InputLabel>
          <Select
            required
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
            required
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
            required
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
            required
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
          value={competencia && competencia["LINK DEL RECURSO"]}
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
      {/* {console.log(perfilNuevo)} */}
      <h3 className="text-center text-lg font-bold">Agregar Empleado</h3>
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
                <MenuItem key={option.id} value={option.id}>
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
            onClick={handleSubmitEliminar}
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          >
            Aceptar
          </button>
          |
          <button
            onClick={abrirCerrarModalEliminar}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  const seleccionarCompetencia = (competencia, caso) => {
    let competenciaEdit = { ...competencia };
    // empleadoEdit['Estado Falta']==='Falta Justificada'?empleadoEdit['Estado Falta']=3:empleadoEdit['Estado Falta']=4;
    setCompetencia(competenciaEdit);

    //(caso === "EDITAR") && abrirCerrarModalEditar();
    if (caso === "EDITAR") {
      setCompetencia(competenciaEdit);
      abrirCerrarModalEditar();
    } else if (caso === "ELIMINAR") {
      setCompetencia(competencia.ID);
      abrirCerrarModalEliminar();
    }
  };

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold text-center text-black ">
          Manual de competencias
        </h3>
        {
          (permisosUser.includes("reclutamiento_recursos_manucomp_agregar")) && 
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
            // {
            //   title: "SUBAREA",
            //   field: "subarea",
            //   lookup: {
            //     Frontend: "Frontend",
            //     Calidad: "Calidad",
            //     "Analisis y Bases de datos": "Analisis y Bases de datos",
            //   },
            // },
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
              // lookup: { null: "Sin Fecha" },
            },
          ]}
          data={data}
          actions={[
            (permisosUser.includes("reclutamiento_recursos_manucomp_editar")) && 
            (
              {
                icon: "edit",
                tooltip: "Editar Competencia",
                onClick: (event, rowData) =>
                  seleccionarCompetencia(rowData, "EDITAR"),
              }
            ),
            (permisosUser.includes("reclutamiento_recursos_manucomp_eliminar")) && 
            (
              {
                icon: "delete",
                tooltip: "Delete Competencia",
                onClick: (event, rowData) =>
                  seleccionarCompetencia(rowData, "ELIMINAR"),
              }
            ),
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
            exportFileName: "Tabla de Recurso Competencia",
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

export default TablaCompetencias;
