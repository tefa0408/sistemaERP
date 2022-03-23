import { MenuItem, Select } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  getPeticionPlataforma,
  getPeticionTotPosPlat,
} from "../../dist/getPeticiones";
import moment from "moment";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { postPeticionPostPlatFecha } from "../../dist/postPeticiones";
import Spinner from "../Spinner/Spinner";
const { RangePicker } = DatePicker;
const GraficoPostPlataforma = () => {
  //UseState
  const [plataformaFiltro, setPlataformaFiltro] = useState({ value: 2 });
  const [fechaData, setFechaData] = useState({
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [fechaDataTotal, setFechaDataTotal] = useState({
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [plataformas, setPlataformas] = useState([]);

  //Postulantes por Plataforma
  const [dataTablePosPlat, setDataTablePosPlat] = useState([]);
  const fechasPostulantes = dataTablePosPlat.map((post) => post.Fecha);
  const cantidadPostulantes = dataTablePosPlat.map((post) =>
    Number(post.CANTIDAD)
  );
  //Postulantes por Plataforma Total
  const [dataTablePosPlatTotal, setDataTablePosPlatTotal] = useState([]);
  const plataformasTotal = dataTablePosPlatTotal.map((post) => post.Plataforma);
  const postulantesTotal = dataTablePosPlatTotal.map((post) =>
    Number(post.Total)
  );
  const postulantesAprob = dataTablePosPlatTotal.map((post) =>
    Number(post.Aprobados)
  );
  const [rPactive, setRPActive] = useState(false);
  const dateFormat = "YYYY/MM/DD";
  const [loading, setLoading] = useState(true);
  //
  useEffect(() => {
    getPeticionPlataforma(setPlataformas, setLoading);
    const fechaActual = new Date();
    const hoy = moment(fechaActual).format(dateFormat);
    const fechaAnterior = moment(
      fechaActual.setDate(fechaActual.getDate() - 30)
    ).format(dateFormat);
    fechaActual.setDate(fechaActual.getDate() + 30);
    setFechaData({
      fecha_fin: hoy,
      fecha_inicio: fechaAnterior,
    });
    setFechaDataTotal({
      fecha_fin: hoy,
      fecha_inicio: fechaAnterior,
    });
    const dataFecha = {
      fecha_fin: hoy,
      fecha_inicio: fechaAnterior,
    };
    setRPActive(true);
    postPeticionPostPlatFecha(2, dataFecha, setDataTablePosPlat, setLoading);
    getPeticionTotPosPlat(setDataTablePosPlatTotal, dataFecha, setLoading);
  }, [loading]);

  //Funcion que hace la petcion
  const peticionPostPlatFecha = async () => {
    postPeticionPostPlatFecha(
      plataformaFiltro.value,
      fechaData,
      setDataTablePosPlat,
      setLoading
    );
  };
  //Funcion que hace la petcion
  const peticionPostPlatFechaTotal = () => {
    getPeticionTotPosPlat(setDataTablePosPlatTotal, fechaDataTotal, setLoading);
  };
  //Funcion que obtiene los valores del Date Range Picker
  function handlePicker(fieldsValue) {
    if (fieldsValue) {
      const a = moment(fieldsValue[0]._d).format(dateFormat);
      const b = moment(fieldsValue[1]._d).format(dateFormat);
      setFechaData({
        fecha_inicio: a,
        fecha_fin: b,
      });
    }
  }
  //Funcion que obtiene los valores del Date Range Picker
  function handlePickerTotal(fieldsValue) {
    if (fieldsValue) {
      const a = moment(fieldsValue[0]._d).format(dateFormat);
      const b = moment(fieldsValue[1]._d).format(dateFormat);
      setFechaDataTotal({
        fecha_inicio: a,
        fecha_fin: b,
      });
    }
  }
  // Funcion que almacena los cambios en el state de inputs
  const handleChangePostulados = (e) => {
    const { value } = e.target;
    setPlataformaFiltro({ value });
  };
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 mt-0 sm:mt-4">
        <div>
          <div className="grid grid-cols-2 mb-3">
            <h2 className="text-center text-lg font-semibold col-span-2  text-black">
              Postulaciones por plataforma
            </h2>
            <div className="flex  flex-row justify-center py-2">
              <Select
                className="flex-1 shrink"
                onChange={handleChangePostulados}
                value={plataformaFiltro.value}
                name="plataforma"
                label="Plataforma"
              >
                {plataformas.map((plataform) => (
                  <MenuItem key={plataform.pPost_Id} value={plataform.pPost_Id}>
                    {plataform.pPost_nombre}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-row justify-center content-center py-2 ml-1">
              <React.StrictMode>
                {rPactive && (
                  <RangePicker
                    defaultValue={[
                      moment(fechaData.fecha_inicio, dateFormat),
                      moment(fechaData.fecha_fin, dateFormat),
                    ]}
                    format={dateFormat}
                    onChange={handlePicker}
                    size="small"
                    placeholder={["Inicio", "Fin"]}
                  />
                )}
              </React.StrictMode>
            </div>
            <div className="col-span-2 flex flex-wrap justify-center mt-2 gap-2">
              <button
                className=" btn btn btn-warning mx-2 px-5 flex justify-center content-center"
                onClick={peticionPostPlatFecha}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
                  style={{ width: "0.8rem", height: "0.8rem" }}
                  alt=""
                />
                <div className="font-semibold ml-1 text-gray-700">
                  Filtrar por fecha
                </div>
              </button>
              {/* <button
                className="btn btn btn-warning mx-2 px-5 flex justify-center content-center"
                onClick={limpiarFiltro}
              >
                <div className="font-semibold ml-1 text-gray-700">
                  Limpiar filtro
                </div>
              </button> */}
            </div>
          </div>
          <hr />
          <div className="mt-0 sm:mt-5">
            <Line
              data={{
                labels: fechasPostulantes,
                datasets: [
                  {
                    label: "Cantidad de postulados por fecha",
                    data: cantidadPostulantes,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 2,
                  },
                ],
              }}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
          <TablaPostArea dataTable={dataTablePosPlat} />
        </div>

        <div>
          <div className="grid grid-cols-2">
            <h2 className="text-center text-lg font-semibold col-span-2  text-black">
              Total de postulaciones por plataforma
            </h2>
            <div className="flex flex-row col-span-2 justify-center content-center py-2 ml-1">
              <React.StrictMode>
                {rPactive && (
                  <RangePicker
                    defaultValue={[
                      moment(fechaDataTotal.fecha_inicio, dateFormat),
                      moment(fechaDataTotal.fecha_fin, dateFormat),
                    ]}
                    format={dateFormat}
                    onChange={handlePickerTotal}
                    placeholder={["Inicio", "Fin"]}
                  />
                )}
              </React.StrictMode>
            </div>
            <div className="col-span-2 flex flex-wrap justify-center mt-2 gap-2 mb-3">
              <button
                className=" btn btn btn-warning mx-2 px-5 flex justify-center content-center"
                onClick={peticionPostPlatFechaTotal}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
                  style={{ width: "0.8rem", height: "0.8rem" }}
                  alt=""
                />
                <div className="font-semibold ml-1 text-gray-700">
                  Filtrar por fecha
                </div>
              </button>
            </div>
          </div>
          <hr />
          <div className="mt-0 sm:mt-2">
            <Bar
              data={{
                labels: plataformasTotal,
                datasets: [
                  {
                    label: "Total",
                    data: postulantesTotal,
                    backgroundColor: ["#c7ae1eae"],
                    borderColor: ["#c7ae1eae"],
                    borderWidth: 2,
                    hoverBackgroundColor: ["#c7ae1e"],
                  },
                  {
                    label: "Aprobados",
                    data: postulantesAprob,
                    backgroundColor: ["#666666b5"],
                    borderColor: ["#666666b5"],
                    hoverBackgroundColor: ["#666666"],
                  },
                ],
              }}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Custom Chart Title",
                    padding: {
                      top: 10,
                      bottom: 30,
                    },
                  },
                },
              }}
            />
          </div>
          <TablaTotalPostulaciones
            dataTablePosPlatTotal={dataTablePosPlatTotal}
          />
        </div>
      </div>
    </div>
  );
};

const TablaPostArea = ({ dataTable = [] }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataTable);
  }, [dataTable]);
  return (
    <div className="mt-3">
      <MaterialTable
        columns={[
          { title: "Plataforma", field: "Plataforma" },
          { title: "Cantidad", field: "CANTIDAD" },
          { title: "Fecha", field: "Fecha" },
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
          exportButton: false,
          search: false,
          actionsColumnIndex: -1,
          toolbar: false,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: <Spinner />,
          },
        }}
      />
    </div>
  );
};

const TablaTotalPostulaciones = ({ dataTablePosPlatTotal = [] }) => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [competencia, setCompetencia] = useState({
  //     id: '',
  //     Aprobado: '',
  //     Desaprobados: '',
  //     Total: '',
  //     FechaInicial: '',
  //     FechaFinal: ''
  // })
  // const {id, Aprobado, Desaprobados, Total, FechaInicial, FechaFinal} = competencia
  useEffect(() => {
    setData(dataTablePosPlatTotal);
  }, [dataTablePosPlatTotal]);

  return (
    <div className="mt-3">
      {/* <h3 className='text-xl font-bold ml-4 mb-2 '>Entrevistados</h3> */}
      <MaterialTable
        columns={[
          { title: "Plataforma", field: "Plataforma" },
          { title: "Total", field: "Total" },
          { title: "Aprobados", field: "Aprobados" },
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
          exportButton: false,
          search: false,
          actionsColumnIndex: -1,
          toolbar: false,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: <Spinner />,
          },
        }}
      />
    </div>
  );
};

export default GraficoPostPlataforma;
