import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";
import Spinner from "../Spinner/Spinner";
import {
  getPeticionAreasFiltro,
  getPeticionDepartamentoFiltro,
  getPeticionPerfilesFiltro,
} from "../../dist/getPeticiones";

const data = [
  {
    nombres: "Alvaro",
    apellidos: "Fernandez",
    perfil: "Diseñador web",
    dias: "4",
    promedio: "8",
    condicion: "Aceptable",
    fechaInicio: "09/02/2022",
    fechaFin: "15/02/2022",
    capacitacion: "no",
  },
  {
    nombres: "Manuel",
    apellidos: "Fernandez",
    perfil: "Maquetador web",
    dias: "4",
    promedio: "7",
    condicion: "Aceptable",
    fechaInicio: "09/02/2022",
    fechaFin: "14/02/2022",
    capacitacion: "no",
  },
];
const useStyles = makeStyles({});

export const ColaboradoresInducir = () => {
  const styles = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
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
            title: "PERFIL",
            field: "perfil",
            lookup: perfilesTabla,
          },
          {
            title: "NOMBRES",
            field: "nombres",
            filtering: false,
          },
          {
            title: "APELLIDOS",
            field: "apellidos",
            filtering: false,
          },

          { title: "DIAS", field: "dias", filtering: false },
          { title: "PROMEDIO", field: "promedio", filtering: false },
          { title: "CONDICION", field: "condicion", filtering: false },
          { title: "FECHA INICIO", field: "fechaInicio", filtering: false },
          { title: "FECHA FIN", field: "fechaFin", filtering: false },
          {
            title: "CULMINO LA CAPACITACION",
            field: "capacitacion",
            filtering: false,
          },
        ]}
        data={data}
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
};
// export default ColaboradoresInducir;
