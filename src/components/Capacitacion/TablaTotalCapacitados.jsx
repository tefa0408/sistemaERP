import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";

const data = [
    {
      frontend: "5",
      backend: "6",
      baseDatos: "4",
      documentacion: "4",
    },
    
  ];
const useStyles = makeStyles({});

function TablaTotalCapacitados() {

  const styles = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="container mx-auto">
    <div className="main mt-3 relative h-full w-full">
      <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
        TOTAL DE CAPACITADOS FINALIZADOS
      </h3>
    </div>
    <div>
        <MaterialTable
        columns={[
          {
            title: "Frontend",
            field: "frontend",
            filtering: false,
            // lookup: { "Consigue ventas": "Consigue ventas" },
          },
          {
            title: "Backend",
            field: "backend",
            filtering: false
          },

          { title: "Base de Datos", field: "baseDatos", filtering: false, },
          { title: "Documentacion", field: "documentacion", filtering: false, },
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
          exportFileName: "Tabla Total de Capacitados",
          // actionsColumnIndex: -1,
          filtering: true,
          toolbar: false,
        }}
        
        
      />
    </div>
    </div>

  )
}

export default TablaTotalCapacitados