import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";
import Spinner from "../Spinner/Spinner";
import {
  getPeticionAreasFiltro,
  getPeticionDepartamentoFiltro,
  getPeticionPerfilesFiltro,
} from "../../dist/getPeticiones";
import { getPeticionPracticante } from "../../dist/Capacitacion/getPeticiones";

const data = [
  {
    nombres: "Alvaro Fernandez",
    perfil: "Maquetador web",
    departamento: "Sistemas",
    area: "Desarrollo de sistemas",
    fechaInicio: "07/02/2022",
    fechaFin: "10/02/2022",
    turno: "Mañana",
  },
  {
    nombres: "Manuel Fernandez",
    perfil: "Diseñador web",
    departamento: "Sistemas",
    area: "Administracion",
    fechaInicio: "07/02/2022",
    fechaFin: "10/02/2022",
    turno: "Mañana",
  },
];
const useStyles = makeStyles({});

function TablaUsuarios() {
  const styles = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState([]);
  const [unidad, setUnidad] = useState([]);
  const [practicantes, setPracticantes] = useState([]);
  

  useEffect(() => {
    setLoading(true);
    getPeticionPracticante(setPracticantes, setLoading);
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
    getPeticionAreasFiltro(setAreas, setLoading);
    getPeticionDepartamentoFiltro(setUnidad, setLoading);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          REGISTRO DE EVALUACION DE PRACTICANTES
        </h3>
      </div>
      <MaterialTable
        columns={[
          {
            title: "DEPARTAMENTO",
            field: "Departamento",
            lookup: unidad,
          },
          {
            title: "AREA",
            field: "Area",
            lookup: areas,
          },
          {
            title: "ESTADO",
            field: "Estado",
            filtering: false,
            // lookup: { "Consigue ventas": "Consigue ventas" },
          },
          { title: "FECHA DE FIN", field: "Fecha de Fin"},
          { title: "FECHA DE INICIO", field: "Fecha de Inicio"},
          { title: "NOMBRE", field: "Nombre", filtering: false },
          { title: "TURNO", field: "Turno", filtering: false },
        ]}
        data={practicantes}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        options={{
          headerStyle: {
            backgroundColor: "#E2E2E2  ",
          },
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
          }),
          searchFieldAlignment: "left",
          showTitle: false,
          exportButton: true,
          exportAllData: true,
          exportFileName: "Tabla de Requerimientos",
          // actionsColumnIndex: -1,
          filtering: true,
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
    </div>
  );
}
export default TablaUsuarios;
