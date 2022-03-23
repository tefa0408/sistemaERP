import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles, Modal } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const dataTemario = [
  {
    codigo: "G1",
    material: "PPT",
    ubicacion: "Drive",
    tiempo: "25 min",
    modo: "Evaluación",
    enlace: "https://drive.google.com/file/d/1-2-3-4/view?usp=sharing",
    video: "https://www.youtube.com/watch?v=1-2-3-4",
  },
  {
    codigo: "HB2",
    material: "PPT",
    ubicacion: "Crehana",
    tiempo: "25 min",
    modo: "Preguntas en diapositivas",
    enlace: "https://drive.google.com/file/d/1-2-3-4/view?usp=sharing",
    video: "https://www.youtube.com/watch?v=1-2-3-4",
  },
  {
    codigo: "HB3",
    material: "PPT",
    ubicacion: "Crehana",
    tiempo: "25 min",
    modo: "Presentado por el practicante",
    enlace: "https://drive.google.com/file/d/1-2-3-4/view?usp=sharing",
    video: "https://www.youtube.com/watch?v=1-2-3-4",
  },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "21rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "0.3rem",
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  border: {
    height: "5rem",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    padding: "0.5rem",
  },
}));

function TablaTemario() {
  const styles = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          Temario
        </h3>
      </div>
      <div className="mt-3">
        <MaterialTable
          columns={[
            {
              title: "CÓDIGO",
              field: "codigo",
            },
            {
              title: "MATERIAL",
              field: "material",
            },
            {
              title: "UBICACION",
              render: (rowData) => (
                <ul>
                  <li className={styles.border}>{rowData.ubicacion}</li>
                  <li className={styles.border}>{rowData.ubicacion}</li>
                </ul>
              ),
              cellStyle: {
                padding: "0",
              },
            },
            {
              title: "TIEMPO GENERAL",
              field: "tiempo",
              filtering: false,
            },
            {
              title: "MODO A EVALUAR",
              filtering: false,
              render: (rowData) => (
                <ul>
                  <li className={styles.border}>{rowData.modo}</li>
                  <li className={styles.border}>{rowData.modo}</li>
                </ul>
              ),
              cellStyle: {
                padding: "0",
              },
            },
            {
              title: "ENLACE",
              field: "enlace",
              filtering: false,
            },
            {
              title: "VIDEO",
              field: "video",
              filtering: false,
            },
          ]}
          data={dataTemario}
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
            exportFileName: "Tabla de recursos",
            actionsColumnIndex: -1,
            filtering: true,
          }}
          localization={{
            body: {
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
      </div>
    </div>
  );
}

export default TablaTemario;
