import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles, Modal } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const dataRecursos = [
  {
    id: 1,
    perfil: "Generales",
    codigo: "G1",
    parentId: undefined,
  },
  {
    id: 2,
    cursos: "Presentación",
    tiempo: "25 min",
    parentId: 1,
  },
  {
    id: 3,
    cursos: "Presentación",
    tiempo: "35 min",
    parentId: 1,
  },
  {
    id: 4,
    cursos: "Organigrama",
    tiempo: "35 min",
    parentId: 1,
  },
  {
    id: 5,
    perfil: "Habilidades blandas",
    codigo: "HB1",
    parentId: undefined,
  },
  {
    id: 6,
    cursos: "Cultura de trabajo remoto",
    tiempo: "1h 20 min",
    parentId: 5,
  },
  {
    id: 7,
    cursos: "Habilidades de comunciación interpersonal",
    tiempo: "2h",
    parentId: 5,
  },
  {
    id: 8,
    cursos: "Manejo de tiempo y productividad",
    tiempo: "35 min",
    parentId: 5,
  },
  {
    id: 9,
    cursos: "Inteligencia emocional",
    tiempo: "35 min",
    parentId: 5,
  },
  {
    id: 10,
    cursos: "¿Quiénes somos?",
    tiempo: "35 min",
    parentId: 1,
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
}));

function TablaRecursos() {
  const styles = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);

  const seleccionarRecurso = (recurso, caso) => {
    let recursoeEdit = {...recurso};
    // if (caso === "EDITAR") {
    //   abrirCerrarModalEditar();
    // }
};

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          Recursos
        </h3>
      </div>
      <div className="mt-3">
        <MaterialTable
          columns={[
            { 
              title: "PERFIL",
              field: "perfil"
            },
            { 
              title: "CÓDIGO", 
              field: "codigo" 
            },
            { 
              title: "CURSOS", 
              field: "cursos" 
            },
            { 
              title: "TIEMPO", 
              field: "tiempo",
              filtering: false,
            },
          ]}
          data={dataRecursos}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          actions={[
            {
              icon: "edit",
              tooltip: "Editar recurso",
              onClick: (event, rowData) =>
                seleccionarRecurso(rowData, "EDITAR"),
            },
          ]}
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
            header: {
              actions: "ACCIONES",
            },
          }}
        />
      </div>
      <div className="flex justify-center mt-3">
          <NavLink 
            exact
            to = "/capacitacion/temario"
            className="p-2 border rounded-lg bg-gray-700 text-gray-50 hover:text-gray-50 hover:bg-naranja text-lg">
            Ver temario
          </NavLink>
      </div >
    </div>
  );
}

export default TablaRecursos;
