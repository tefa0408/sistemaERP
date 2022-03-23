import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import ModalEvaluacion1 from "./ModalEvaluacion1";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getPeticionListarCapacitaciones } from "../../dist/Capacitacion/getPeticiones";
import {
  getPeticionAreasFiltro,
  getPeticionDepartamentoFiltro,
  getPeticionPerfilesFiltro,
} from "../../dist/getPeticiones";
import Spinner from "../Spinner/Spinner";
const dataEvaluacion = [
  {
    id: 1,
    nombre: "Michael Soca Montes",
    perfil: "Front end",
    fechainicio: "7/2/2022",
    fechafin: "10/7/2022",
    turno: "mañana",
  },
  {
    id: 2,
    nombre: "Omar Perz",
    perfil: "Analista de documentos",
    fechainicio: "1/12/22",
    fechafin: "6/12/22",
    turno: "mañana",
  },
  {
    id: 3,
    nombre: "Melisa Pizarro",
    perfil: "copywriting",
    fechainicio: "1/12/22",
    fechafin: "6/12/22",
    turno: "mañana",
  },
  {
    id: 4,
    nombre: "Nadia mendoza",
    perfil: "frontend",
    fechainicio: "1/12/22",
    fechafin: "6/12/22",
    turno: "mañana",
  },
  {
    id: 5,
    nombre: "Robert Calderon",
    perfil: "frontend",
    fechainicio: "1/12/22",
    fechafin: "6/12/22",
    turno: "mañana",
  },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "80%",
      height: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "80%",
      height: "80%",
    },
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
    overflowX: "hidden",
  },
}));

function TablaEvaluacion() {
  const styles = useStyles();
  const [loading, setLoading] = useState(true);
  const [modalEditar, setModalEditar] = useState(false);
  const [errorEditar, setErrorEditar] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [listarCapacitaciones, setlistarCapacitaciones] = useState([]);
  console.log(listarCapacitaciones);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const [areas, setAreas] = useState([]);
  const [unidad, setUnidad] = useState([]);
  const [evaluacion, setEvaluacion] = useState({
    id: "",
    nombre: "",
    perfil: "",
    fechainicio: "",
    fechafin: "",
    turno: "",
  });
  const [idModal, setIdModal] = useState(null);
  const [dataEvaluacion, setDataEvaluacion] = useState([]);
  const handleEditEvaluacion = (id) => {
    abrirCerrarModalEditar();
    setIdModal(id);
  };

  useEffect(() => {
    setData(dataEvaluacion);
    getPeticionListarCapacitaciones(setlistarCapacitaciones, setLoading);
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
    getPeticionAreasFiltro(setAreas, setLoading);
    getPeticionDepartamentoFiltro(setUnidad, setLoading);
  }, []);

  const { id, nombre, perfil, fechainicio, fechafin, turno } = evaluacion;
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setEvaluacion({
        id: "",
        nombre: "",
        perfil: "",
        fechainicio: "",
        fechafin: "",
        turno: "",
      });
      setErrorEditar(false);
    }
  };

  const handleSubmitEdit = () => {
    if (nombre.trim() === "") {
      setErrorEditar(true);
      return;
    }
    setErrorEditar(false);
    console.log(evaluacion);
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <ModalEvaluacion1 id={idModal} />
    </div>
  );

  return (
    <div className="container mx-auto justify-center">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold text-center text-black ">
          Registro Evaluacion de Practicantes
        </h3>
      </div>
      <MaterialTable
        columns={[
          {
            title: "NOMBRE",
            field: "Nombres",
            filtering: false,
          },
          {
            title: "PERFIL",
            field: "Perfil",
            lookup: perfilesTabla,
          },
          {
            title: "DEPARTAMENTO",
            field: "Unidad",
            lookup: unidad,
          },
          {
            title: "Area",
            field: "Area",
            lookup: areas,
          },
          {
            title: "FECHA INICIO",
            field: "Fecha_Inicio",
            filtering: false,
          },
          {
            title: "FECHA FIN",
            field: "Fecha_Termino",
            filtering: false,
          },
          {
            title: "TURNO",
            field: "Turno",
            filtering: false,
          },
        ]}
        data={listarCapacitaciones}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        actions={[
          {
            icon: "edit",
            tooltip: "Editar usuario",
            onClick: (event, rowData) => {
              handleEditEvaluacion(rowData.id);
              // console.log(rowData.tableData.id);
            },
          },
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
          actionsColumnIndex: -1,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: <Spinner />,
            // addTooltip: "Agregar",
            // deleteTooltip: "Eliminar",
            // editTooltip: "Editar",
            // filterRow: {
            //   filterTooltip: "Filtrar",
            // },
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
    </div>
  );
}
export default TablaEvaluacion;
