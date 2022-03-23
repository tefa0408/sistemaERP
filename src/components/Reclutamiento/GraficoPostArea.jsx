import { MenuItem, Select } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  postPeticionPostDepFecha,
  postPeticionPostDepFechaTotal,
} from "../../dist/postPeticiones";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { getPeticionDepartamentoId } from "../../dist/getPeticiones";
import Spinner from "../Spinner/Spinner";

const { RangePicker } = DatePicker;
const GraficoPostArea = () => {
  const [dataBody, setDataBody] = useState({
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [dataBodyDonut, setDataBodyDonut] = useState({
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [loading, setLoading] = useState(true);
  const [rPactive, setRPActive] = useState(false);
  const dateFormat = "YYYY/MM/DD";
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentoFil, setDepartamentoFil] = useState({ value: 2 });
  //Postulante por departamento
  const [dataPosDepFecha, setDataPosDepFecha] = useState([]);
  const fechaPostulados = dataPosDepFecha.map((post) => post.Fecha);
  const cantidadPostulantes = dataPosDepFecha.map((post) =>
    Number(post.Cantidad)
  );
  //Postulante por departamento Total
  const [dataPosDepFechaDonut, setDataPosDepFechaDonut] = useState([]);
  const departamentoDonut = dataPosDepFechaDonut.map(
    (post) => post.Departamento
  );
  const cantidadDonut = dataPosDepFechaDonut.map((post) =>
    Number(post.Cantidad)
  );
  //Use Effect que devuelve los valores por defecto
  useEffect(() => {
    getPeticionDepartamentoId(setDepartamentos, setLoading);
    const fechaActual = new Date();
    const hoy = moment(fechaActual).format(dateFormat);
    const fechaAnterior = moment(
      fechaActual.setDate(fechaActual.getDate() - 30)
    ).format(dateFormat);
    fechaActual.setDate(fechaActual.getDate() + 30);
    setDataBody({
      fecha_fin: hoy,
      fecha_inicio: fechaAnterior,
    });
    setDataBodyDonut({
      fecha_fin: hoy,
      fecha_inicio: fechaAnterior,
    });
    const bodyData = {
      fecha_fin: hoy,
      fecha_inicio: fechaAnterior,
    };
    setRPActive(true);
    postPeticionPostDepFecha(2, bodyData, setDataPosDepFecha, setLoading);
    postPeticionPostDepFechaTotal(
      bodyData,
      setDataPosDepFechaDonut,
      setLoading
    );
  }, [loading]);
  //
  //Funcion que hace la peticion
  const peticionPostDepFecha = async () => {
    postPeticionPostDepFecha(
      departamentoFil.value,
      dataBody,
      setDataPosDepFecha,
      setLoading
    );
  };
  //Funcion que hace la peticion
  const peticionPostDepFechaDonut = async () => {
    postPeticionPostDepFechaTotal(
      dataBodyDonut,
      setDataPosDepFechaDonut,
      setLoading
    );
  };
  const handleChangeDep = (e) => {
    const { value } = e.target;
    setDepartamentoFil({ value });
  };
  function handlePicker(fieldsValue, grafico) {
    if (fieldsValue) {
      const a = moment(fieldsValue[0]._d).format(dateFormat);
      const b = moment(fieldsValue[1]._d).format(dateFormat);
      setDataBody({
        fecha_inicio: a,
        fecha_fin: b,
      });
    }
  }
  function handlePickerDonut(fieldsValue) {
    if (fieldsValue) {
      const a = moment(fieldsValue[0]._d).format(dateFormat);
      const b = moment(fieldsValue[1]._d).format(dateFormat);
      setDataBodyDonut({
        fecha_inicio: a,
        fecha_fin: b,
      });
    }
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 mt-0 sm:mt-4">
        <div>
          <div className="grid grid-cols-2">
            <h2 className="text-center text-lg font-semibold col-span-2  text-black">
              Postulaciones por departamento
            </h2>
            <div className="flex flex-row justify-center py-2">
              <Select
                className="flex-1 w-1/2"
                onChange={handleChangeDep}
                value={departamentoFil.value}
                name="departamento"
                label="Departamento"
              >
                {departamentos.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.id}>
                      {option.Unidades}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-row justify-center content-center py-2 ml-1">
              <React.StrictMode>
                {rPactive && (
                  <RangePicker
                    defaultValue={[
                      moment(dataBody.fecha_inicio, dateFormat),
                      moment(dataBody.fecha_fin, dateFormat),
                    ]}
                    format={dateFormat}
                    onChange={handlePicker}
                    size="small"
                    placeholder={["Inicio", "Fin"]}
                  />
                )}
              </React.StrictMode>
            </div>
            <div className="col-span-2 flex flex-wrap justify-center mt-2 gap-2 mb-3">
              <button
                className=" btn btn btn-warning mx-2 px-5 flex justify-center content-center"
                onClick={peticionPostDepFecha}
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
          <div className="mt-0 sm:mt-5">
            <Line
              data={{
                labels: fechaPostulados,
                datasets: [
                  {
                    label: "Cantidad de postulados por departamento",
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
          <TablaPostArea dataPosDepFecha={dataPosDepFecha} />
        </div>

        <div>
          <div className="grid grid-cols-2">
            <h2 className="text-center text-lg font-semibold col-span-2  text-black">
              Total de postulaciones por departamento
            </h2>

            <div className="flex flex-row col-span-2 justify-center content-center py-2 ml-1">
              <React.StrictMode>
                {rPactive && (
                  <RangePicker
                    defaultValue={[
                      moment(dataBodyDonut.fecha_inicio, dateFormat),
                      moment(dataBodyDonut.fecha_fin, dateFormat),
                    ]}
                    format={dateFormat}
                    onChange={handlePickerDonut}
                    placeholder={["Inicio", "Fin"]}
                  />
                )}
              </React.StrictMode>
            </div>
            <div className="col-span-2 flex flex-wrap justify-center mt-2 gap-2 mb-3">
              <button
                className=" btn btn btn-warning mx-2 px-5 flex justify-center content-center"
                onClick={peticionPostDepFechaDonut}
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
            <Doughnut
              data={{
                labels: departamentoDonut,
                datasets: [
                  {
                    label: "# of Votes",
                    data: cantidadDonut,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                      "rgba(38, 245, 66, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(38, 245, 66, 1)",
                    ],
                    borderWidth: 1,
                    hoverOffset: 7,
                    hoverBackgroundColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(38, 245, 66, 1)",
                    ],
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
                animation: {
                  animateRotate: false,
                },
              }}
            />
          </div>
          <TablaTotalPostulaciones
            dataPosDepFechaDonut={dataPosDepFechaDonut}
          />
        </div>
      </div>
    </div>
  );
};

// const dataPostArea = [
//   {
//     SUBAREA: "BACKEND",
//     CANTIDAD: "3",
//     FECHA: "6/11/2021",
//   },
//   {
//     SUBAREA: "BACKEND",
//     CANTIDAD: "2",
//     FECHA: "7/11/2021",
//   },
//   {
//     SUBAREA: "BACKEND",
//     CANTIDAD: "3",
//     FECHA: "8/11/2021",
//   },
//   {
//     SUBAREA: "BACKEND",
//     CANTIDAD: "2",
//     FECHA: "9/11/2021",
//   },
// ];

const TablaPostArea = ({ dataPosDepFecha = [] }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataPosDepFecha);
  }, [dataPosDepFecha]);

  return (
    <div className="mt-3">
      <MaterialTable
        columns={[
          { title: "Departamento", field: "Departamento" },
          { title: "Cantidad", field: "Cantidad" },
          { title: "Fecha", field: "Fecha" },
        ]}
        data={data}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        title={"Tabla de puntaje obtenido en la entrevista"}
        options={{
          toolbar: false,
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

// const dataTotalArea = [
//   {
//     SUBAREA: "ADMINISTRACIÓN",
//     CANTIDAD: "32",
//   },
//   {
//     SUBAREA: "DISEÑO GRÁFICO",
//     CANTIDAD: "20",
//   },
//   {
//     SUBAREA: "BACKEND",
//     CANTIDAD: "16",
//   },
//   {
//     SUBAREA: "VENTAS",
//     CANTIDAD: "26",
//   },
// ];

const TablaTotalPostulaciones = ({ dataPosDepFechaDonut = [] }) => {
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
    setData(dataPosDepFechaDonut);
  }, [dataPosDepFechaDonut]);

  return (
    <div className="mt-3">
      {/* <h3 className='text-xl font-bold ml-4 mb-2 '>Entrevistados</h3> */}
      <MaterialTable
        columns={[
          { title: "Departamento", field: "Departamento" },
          { title: "Cantidad", field: "Cantidad" },
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

export default GraficoPostArea;
