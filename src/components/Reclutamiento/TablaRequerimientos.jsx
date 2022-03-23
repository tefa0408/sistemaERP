import React, { useContext, useEffect, useState } from "react";
import MaterialTable from "material-table";
// import { Select, MenuItem } from "@material-ui/core";
import {
  getPeticionAreasFiltro,
  getPeticionPerfilesFiltro,
  getPeticionDepartamentoFiltro,
  getPeticionRequerimientos,
} from "../../dist/getPeticiones";
import { UserContext } from "../context/UserContext";
import Spinner from "../Spinner/Spinner";

const TablaRequerimientos = () => {
  const { user } = useContext(UserContext);

  
  const dni = Object.keys(user).length !== 0 ? user.dni : "";
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [areas, setAreas] = useState([]);
  const [unidad, setUnidad] = useState([]);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [filtro, setFiltro] = useState({
  //   departamento: "",
  //   area: "",
  // });

  const filtroTurno = {
    Mañana: "Mañana",
    "Mañana y tarde": "Mañana y tarde",
    Tarde: "Tarde",
  };

  useEffect(() => {
    getPeticionRequerimientos(setData, setLoading, dni);
  }, [dni]);

  useEffect(() => {
    setLoading(true);
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
    getPeticionAreasFiltro(setAreas, setLoading);
    getPeticionDepartamentoFiltro(setUnidad, setLoading);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          Requerimiento de personal
        </h3>
      </div>
      <div className="mt-3">
        <MaterialTable
          columns={[
            {
              title: "MARCA",
              field: "Marca",
              filtering: false,
              // lookup: { "Consigue ventas": "Consigue ventas" },
            },
            {
              title: "DEPARTAMENTO",
              field: "Unidad",
              lookup: unidad,
            },
            { title: "AREA", field: "Area", lookup: areas },
            // {
            //   title: "SUBAREA",
            //   field: "subarea",
            //   lookup: {
            //     Frontend: "Frontend",
            //     Calidad: "Calidad",
            //     "Analisis y Bases de datos": "Analisis y Bases de datos",
            //   },
            // },
            { title: "ENCARGADO", field: "Encargado", filtering: false },
            { title: "PERFIL", field: "Perfil", lookup: perfilesTabla },
            { title: "CANTIDAD", field: "Cantidad", filtering: false },
            { title: "TURNO", field: "Turno", lookup: filtroTurno },
            { title: "PRIORIDAD", field: "Prioridad", filtering: false },
            {
              title: "FECHA",
              field: "Fecha de requerimiento",
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
    </div>
  );
};

export default TablaRequerimientos;
