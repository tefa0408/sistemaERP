import React, { useContext, useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles, Modal } from "@material-ui/core";
import ParametrosEvaluacion from "./ParametrosEvaluacion";
import {
  copyObject,
  getPeticionListarConocimientos,
  getPeticionPerfilesFiltro,
} from "../../../dist/getPeticiones";
import Spinner from "../../Spinner/Spinner";
import { postPeticionActualizarConocimientos } from "../../../dist/postPeticiones";
import { UserContext } from "../../context/UserContext";
//Data Temporal
// const dataEvaluacionConocimiento = [
//   {
//     nombreApellido: "Susana Vaca",
//     edad: "22",
//     dni: "12345678",
//     perfil: "Software Teste",
//     pregunta1: "1",
//     pregunta2: "1",
//     pregunta3: "1",
//     pregunta4: "1",
//     puntajeTotal: "10",
//     resultado: "Aprobado",
//   },
//   {
//     nombreApellido: "Pedro Vazques",
//     edad: "22",
//     dni: "12345678",
//     perfil: "Software Teste",
//     pregunta1: "1",
//     pregunta2: "1",
//     pregunta3: "1",
//     pregunta4: "1",
//     puntajeTotal: "10",
//     resultado: "Aprobado",
//   },
//   {
//     nombreApellido: "Juan Gomez",
//     edad: "22",
//     dni: "12345678",
//     perfil: "Software Teste",
//     pregunta1: "1",
//     pregunta2: "1",
//     pregunta3: "1",
//     pregunta4: "1",
//     puntajeTotal: "10",
//     resultado: "Aprobado",
//   },
//   {
//     nombreApellido: "German Rodriguez",
//     edad: "22",
//     dni: "12345678",
//     perfil: "Software Teste",
//     pregunta1: "1",
//     pregunta2: "1",
//     pregunta3: "1",
//     pregunta4: "1",
//     puntajeTotal: "10",
//     resultado: "Aprobado",
//   },
// ];
//Estilos
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "21rem",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  //Estilo para tener la primera columna de la tabla fija
  stickyActionsColumn: {
    "& table:first-child": {
      "& tr": {
        "& td:first-child, th:first-child": {
          backgroundColor: "#EEE",
          position: "sticky",
          left: 0,
          zIndex: 1,
        },
        "& th:first-child": {
          zIndex: 11,
        },
      },
    },
  },
}));
const TablaEvaluacionConocimiento = () => {
  const styles = useStyles();
  const { permisosUser } = useContext(UserContext);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [camposCambiados, setCamposCambiados] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [upData, setUpData] = useState([]);
  const [data, setData] = useState([]);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const [datosActualizar, setdatosActualizar] = useState([]);
  const [loading, setLoading] = useState(false);
  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };

  let datos = {
    Id: 0,
    Valores: {
      Puntaje1: 0,
      Puntaje2: 0,
      Puntaje3: 0,
      Puntaje4: 0,
    },
  };

  //Funcion que devuelve los cambios en un objeto
  const cambiosCampos = (oldObj, newObj) => {
    const keys1 = Object.keys(oldObj);
    let objChange = {
      nombreApellido: newObj["Nombres y Apellido"],
    };
    for (let key of keys1) {
      if (oldObj[key] !== newObj[key] && key !== "tableData") {
        objChange[key] = newObj[key];
      }
    }
    return objChange;
  };

  //Funcion que enlista los cambios en el modal
  const listarCambios = () => {
    if (camposCambiados.length !== 0) {
      return camposCambiados.map((data) => {
        return <li className="m-1 p-1">{data.nombreApellido}</li>;
      });
    } else {
      return "";
    }
  };
  let calificacion = { 0: "0", 1: "1", 2: "2" };
  const columns = [
    {
      title: "NOMBRES Y APELLIDOS",
      field: "Nombres y Apellido",
      editable: "never",
      cellStyle: { whiteSpace: "nowrap" },
      filtering: false,
    },
    { title: "EDAD", field: "Edad", editable: "never", filtering: false },
    { title: "DNI", field: "Dni", editable: "never", filtering: false },
    {
      title: "PERFIL",
      field: "Tipo de Puesto a Postular",
      editable: "never",
      lookup: perfilesTabla,
    },
    {
      title: "PREGUNTA 1",
      field: "(1) PREGUNTA DE CONOCIMIENTOS",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "PREGUNTA 2",
      field: "(2) PREGUNTA DE CONOCIMIENTOS",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "PREGUNTA 3",
      field: "(3) PREGUNTA DE CONOCIMIENTOS",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "PREGUNTA 4",
      field: "(4) PREGUNTA DE CONOCIMIENTOS",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "PUNTAJE TOTAL",
      field: "Puntaje Total",
      editable: "never",
      filtering: false,
    },
    {
      title: "RESULTADO",
      field: "Resultado final",
      editable: "never",
      filtering: false,
    },
  ];
  const options = {
    filtering: true,
    headerStyle: {
      backgroundColor: "#E2E2E2  ",
    },
    rowStyle: (rowData) => ({
      backgroundColor:
        selectedRow === rowData.tableData.id ? "#F5F5F5" : "#FFF",
    }),
    searchFieldAlignment: "left",
    showTitle: false,
    exportButton: {
      csv: true,
      pdf: false,
    },
    exportAllData: true,
    exportFileName: "Tabla de Evaluación de Conocimientos",
    actionsColumnIndex: -1,
  };

  useEffect(() => {
    getPeticionListarConocimientos(setData, setLoading);
  }, [loading]);
  // console.log(data);
  useEffect(() => {
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
  }, []);

  //Modal de confirmacion
  const bodyConfirmar = (
    <div className={styles.modal}>
      <h3 className="text-center text-xl font-bold">Confirmar Cambios</h3>
      <hr />
      <div className="flex flex-col align-middle">
        <div className="flex flex-col py-2 text-center ">
          <h1 className="font-bold text-lg ">
            {camposCambiados.length !== 0 ? "Postulantes" : "No hubo Cambios"}
          </h1>
          <ul className="flex flex-col">{listarCambios()}</ul>
        </div>
      </div>
      <br />
      <div className="flex justify-evenly items-center">
        <button
          className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          onClick={async () => {
            await datosActualizar.forEach((item) => {
              console.log(item);
              postPeticionActualizarConocimientos(item.Id, item.Valores);
            });
            setLoading(true);
            setCamposCambiados([]);
            // setUpData([]);
            abrirCerrarModalConfirmar();
          }}
        >
          ACEPTAR
        </button>

        {camposCambiados.length !== 0 && (
          <button
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            onClick={() => {
              setCamposCambiados([]);
              // setUpData([]);
              abrirCerrarModalConfirmar();
            }}
          >
            CANCELAR
          </button>
        )}
      </div>
    </div>
  );
  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold  text-center text-black ">
          Evaluacion de Conocimiento
        </h3>
        {/* Componente que establece los paramtros de la evaluacion */}
        <ParametrosEvaluacion
          calificacion="Calificacion de la observación de la conducta"
          califAprobado="Aprobado: 2"
          califAprobadoBajo="Aprobado bajo: 1"
          califDesaprobado="Desaprobado: 0"
          puntajeTotal="Puntaje total de la observación de la conducta"
          puntTotAprobado="Aprobado: 6"
          puntTotDesaprobado="Desaprobado: 5"
        />
        {/* div con el estilo para la columna fija */}
        <div className={styles.stickyActionsColumn}>
          <MaterialTable
            options={options}
            columns={columns}
            data={data}
            onRowClick={(evt, selectedRow) =>
              setSelectedRow(selectedRow.tableData.id)
            }
            editable={
              permisosUser.includes(
                "reclutamiento_entrevista_evaluacion_conoci_editar"
              ) && {
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    const arrayCambios = [];
                    dataUpdate[index] = newData;
                    const objChange = cambiosCampos(oldData, newData);

                    datos.Id = parseInt(newData.Id);
                    datos.Valores.Puntaje1 = parseInt(
                      newData["(1) PREGUNTA DE CONOCIMIENTOS"]
                    );
                    datos.Valores.Puntaje2 = parseInt(
                      newData["(2) PREGUNTA DE CONOCIMIENTOS"]
                    );
                    datos.Valores.Puntaje3 = parseInt(
                      newData["(3) PREGUNTA DE CONOCIMIENTOS"]
                    );
                    datos.Valores.Puntaje4 = parseInt(
                      newData["(4) PREGUNTA DE CONOCIMIENTOS"]
                    );
                    arrayCambios.push(datos);

                    // console.log(Object.keys(objChange).length);
                    Object.keys(objChange).length > 1 &&
                      setCamposCambiados([objChange]);
                    // setUpData(dataUpdate);
                    setdatosActualizar(arrayCambios);
                    abrirCerrarModalConfirmar();
                    resolve();
                  }),
                onBulkUpdate: (changes) =>
                  new Promise((resolve, reject) => {
                    const rows = Object.values(changes);
                    const dataUpdate = [...data];
                    const arrayCambios = [...camposCambiados];
                    const arrayCambiosUpd = [];
                    let index;
                    rows.forEach((item) => {
                      const objChange = cambiosCampos(
                        item.oldData,
                        item.newData
                      );

                      datos.Id = parseInt(item.newData.Id);
                      datos.Valores.Puntaje1 = parseInt(
                        item.newData["(1) PREGUNTA DE CONOCIMIENTOS"]
                      );
                      datos.Valores.Puntaje2 = parseInt(
                        item.newData["(2) PREGUNTA DE CONOCIMIENTOS"]
                      );
                      datos.Valores.Puntaje3 = parseInt(
                        item.newData["(3) PREGUNTA DE CONOCIMIENTOS"]
                      );
                      datos.Valores.Puntaje4 = parseInt(
                        item.newData["(4) PREGUNTA DE CONOCIMIENTOS"]
                      );
                      const itemUpd = copyObject(datos);
                      arrayCambiosUpd.push(itemUpd);
                      arrayCambios.push(objChange);
                      index = item.oldData.tableData.id;
                      dataUpdate[index] = item.newData;
                    });
                    // setUpData(dataUpdate);
                    setCamposCambiados(arrayCambios);
                    setdatosActualizar(arrayCambiosUpd);
                    abrirCerrarModalConfirmar();
                    resolve();
                  }),
              }
            }
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
            }}
          />
          <Modal
            open={modalConfirmar}
            onClose={abrirCerrarModalConfirmar}
            disableBackdropClick
          >
            {bodyConfirmar}
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default TablaEvaluacionConocimiento;
