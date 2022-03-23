import { Select, MenuItem } from "@material-ui/core";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import MaterialTable from "material-table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  getPeticionDepartamentoId,
  getPeticionPuntEntrFecDep,
  getPeticionListarCantEntre,
} from "../../dist/getPeticiones";
import Spinner from "../Spinner/Spinner";

const { RangePicker } = DatePicker;
const GraficoEntrevistados = () => {
  //
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState([]);
  const [departamentoFil, setDepartamentoFil] = useState({ value: 2 });
  const [rPactive, setRPActive] = useState(false);
  const dateFormat = "YYYY/MM/DD";
  const [dataBody, setDataBody] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    departamento: "",
  });
  const [dataBodyAprob, setDataBodyAprob] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    departamento: "",
  });
  //Postulante por departamento y fecha
  const [punPosDep, setPunPosDep] = useState([]);
  const nombrePostulante = punPosDep.map((post) => post["Nombres y Apellidos"]);
  const puntajePostulante = punPosDep.map((post) =>
    Number(
      post["Puntaje Obtenido"].substring(0, post["Puntaje Obtenido"].length - 1)
    )
  );
  //Grafico cantidad de aprobados
  const [cantEntre, setCantEntre] = useState([]);
  const aprobados =
    cantEntre.length > 0 ? Number(cantEntre[0]["Aprobados"]) : 0;
  const desaprobados =
    cantEntre.length > 0 ? Number(cantEntre[0]["Desaprobados"]) : 0;
  const total = cantEntre.length > 0 ? Number(cantEntre[0]["Total"]) : 0;

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
    setDataBodyAprob({
      fecha_fin: hoy,
      fecha_inicio: fechaAnterior,
    });
    const bodyData = {
      fecha_fin: hoy,
      fecha_inicio: fechaAnterior,
      departamento: 2,
    };
    const bodyData2 = {
      fecha_fin: hoy,
      fecha_inicio: fechaAnterior,
    };
    setRPActive(true);
    getPeticionPuntEntrFecDep(setPunPosDep, bodyData, setLoading);
    getPeticionListarCantEntre(setCantEntre, bodyData2, setLoading);
  }, [loading]);

  //

  //Funcion que obtiene los valores del Date Range Picker
  function handlePicker(fieldsValue) {
    if (fieldsValue) {
      const a = moment(fieldsValue[0]._d).format(dateFormat);
      const b = moment(fieldsValue[1]._d).format(dateFormat);
      setDataBody({
        fecha_inicio: a,
        fecha_fin: b,
      });
    }
  }
  //Funcion que obtiene los valores del Date Range Picker
  function handlePickerAprob(fieldsValue) {
    if (fieldsValue) {
      const a = moment(fieldsValue[0]._d).format(dateFormat);
      const b = moment(fieldsValue[1]._d).format(dateFormat);
      setDataBodyAprob({
        fecha_inicio: a,
        fecha_fin: b,
      });
    }
  }
  //Funcion que hace la peticion
  const peticionPunPosDep = () => {
    dataBody.departamento = departamentoFil.value;
    getPeticionPuntEntrFecDep(setPunPosDep, dataBody, setLoading);
  };
  //Funcion que hace la peticion
  const peticionCantEntre = () => {
    getPeticionListarCantEntre(setCantEntre, dataBodyAprob, setLoading);
  };

  //
  // Funcion que almacena los cambios en el state de inputs
  const handleChangeDepartamento = (e) => {
    const { value } = e.target;
    setDepartamentoFil({ value });
  };
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 mt-0 sm:mt-4">
        <div>
          <div className="grid grid-cols-2">
            <h2 className="text-center text-lg font-semibold col-span-2  text-black">
              Cantidad de aprobados en la entrevista
            </h2>
            <div className="flex flex-row col-span-2 justify-center content-center py-2 ml-1">
              <React.StrictMode>
                {rPactive && (
                  <RangePicker
                    defaultValue={[
                      moment(dataBodyAprob.fecha_inicio, dateFormat),
                      moment(dataBodyAprob.fecha_fin, dateFormat),
                    ]}
                    format={dateFormat}
                    onChange={handlePickerAprob}
                    placeholder={["Inicio", "Fin"]}
                  />
                )}
              </React.StrictMode>
            </div>
            <div className="col-span-2 flex flex-wrap justify-center mt-2 gap-2 mb-3">
              <button
                className=" btn btn btn-warning mx-2 px-5 flex justify-center content-center"
                onClick={peticionCantEntre}
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
            <Bar
              data={{
                barThickness: "20px",
                labels: ["Aprobados", "Desaprobados"],
                datasets: [
                  {
                    label: "Total entrevistados",
                    data: [aprobados, desaprobados, total],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      // 'rgba(255, 206, 86, 0.6)',
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      // 'rgba(255, 206, 86, 0.6)',
                    ],
                    borderWidth: 2,
                    hoverBackgroundColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      //'rgba(255, 206, 86, 1)',
                    ],
                  },
                ],
              }}
              height={400}
              width={300}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
          <TablaEntrevistados cantEntre={cantEntre} />
        </div>
        <div>
          <div className="grid grid-cols-2">
            <h2 className="text-center text-lg font-semibold col-span-2  text-black">
              Puntaje de postulante por departamento
            </h2>
            <div className="flex flex-row justify-center py-2">
              <Select
                className="flex-1 w-1/2"
                onChange={handleChangeDepartamento}
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
                onClick={peticionPunPosDep}
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
                labels: nombrePostulante,
                datasets: [
                  {
                    label: "Puntaje por postulante",
                    data: puntajePostulante,
                    backgroundColor: ["#c7ae1eae"],
                    borderColor: ["#c7ae1eae"],
                    borderWidth: 2,
                    hoverBackgroundColor: ["#c7ae1e"],
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
                    padding: {
                      top: 10,
                      bottom: 30,
                    },
                  },
                },
              }}
            />
          </div>
          <TablaPuntaje punPosDep={punPosDep} />
        </div>
      </div>
    </div>
  );
};

const TablaEntrevistados = ({ cantEntre = [] }) => {
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
    setData(cantEntre);
  }, [cantEntre]);

  return (
    <div className="mt-3">
      {/* <h3 className='text-xl font-bold ml-4 mb-2 '>Entrevistados</h3> */}
      <MaterialTable
        columns={[
          {
            title: "Aprobados",
            field: "Aprobados",
          },
          {
            title: "Desaprobados",
            field: "Desaprobados",
          },
          {
            title: "Total",
            field: "Total",
          },
          {
            title: "FechaInicial",
            field: "Fecha Inicial",
          },
          { title: "FechaFinal", field: "Fecha Final", filtering: false },
        ]}
        data={data}
        title={"Tabla de aprobados en la entrevistados"}
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
          showTitle: true,
          exportButton: false,
          search: false,
          // actionsColumnIndex: -1,
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

// const dataRequerimientosEntrevistado = [
//   {
//     NOMBRES_Y_APELLIDOS: "Celia Rebollo",
//     SUBAREA: "FRONTED",
//     FECHA: "06/11/2021",
//     PUNTAJE_OBTENIDO: "75%",
//   },
//   {
//     NOMBRES_Y_APELLIDOS: "Flora Mansilla",
//     SUBAREA: "FRONTED",
//     FECHA: "07/11/2021",
//     PUNTAJE_OBTENIDO: "72%",
//   },
//   {
//     NOMBRES_Y_APELLIDOS: "Marcos Afonso",
//     SUBAREA: "FRONTED",
//     FECHA: "09/11/2021",
//     PUNTAJE_OBTENIDO: "74%",
//   },
//   {
//     NOMBRES_Y_APELLIDOS: "Bryan Osuna",
//     SUBAREA: "FRONTED",
//     FECHA: "10/11/2021",
//     PUNTAJE_OBTENIDO: "62%",
//   },
// ];

const TablaPuntaje = ({ punPosDep = [] }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(punPosDep);
  }, [punPosDep]);

  return (
    <div className="mt-3">
      <MaterialTable
        columns={[
          { title: "Nombres", field: "Nombres y Apellidos" },
          { title: "Departamento", field: "Departamento" },
          { title: "FechaInicial", field: "Fecha" },
          { title: "Puntaje", field: "Puntaje Obtenido" },
        ]}
        data={data}
        title={"Tabla de puntaje obtenido en la entrevista"}
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
          showTitle: true,
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

export default GraficoEntrevistados;
