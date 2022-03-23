import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import { getPeticionModalEvaluacion } from "../../dist/Capacitacion/getPeticiones";
import Spinner from "../Spinner/Spinner";


const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(
  fecha,
  dia,
  encargado,
  promedio,
  condicion,
  observacion,
  dataCurso
) {
  return {
    fecha,
    dia,
    encargado,
    promedio,
    condicion,
    observacion,
    dataCurso,
  };
}
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [previous, setPrevious] = React.useState({});
  const [evaluacion, setEvaluacion] = React.useState([]);
  const [cursoState, setCursoState] = React.useState({});
  const onToggleEditMode = (cursoRow) => {
    setEvaluacion((state) => {
      return cursoRow.map((cursoRow) => {
        if (cursoRow === cursoRow) {
          return { ...cursoRow, isEditMode: !cursoRow.isEditMode };
        }
        return cursoRow;
      });
    });
  };
  // const onChange = (e, row) => {
  //   if (!previous[row.id]) {
  //     setPrevious((state) => ({ ...state, [row.id]: row }));
  //   }
  //   const value = e.target.value;
  //   const name = e.target.name;
  //   const { id } = row;
  //   const cursoRow = rows.map((row) => {
  //     if (row.id === id) {
  //       return { ...row, [name]: value };
  //     }
  //     return row;
  //   });
  //   setEvaluacion(cursoRow);
  // };
  // const onRevert = (id) => {
  //   const cursoRow = rows.map((row) => {
  //     if (row.id === id) {
  //       return previous[id] ? previous[id] : row;
  //     }
  //     return row;
  //   });
  //   setEvaluacion(cursoRow);
  //   setPrevious((state) => {
  //     delete state[id];
  //     return state;
  //   });
  //   onToggleEditMode(id);
  // };
  React.useEffect(() => {
    const obj = {};
    dataCurso.cursoNombre.forEach((curso) => {
      obj[`${curso.nombre}`] = false;
      // console.log(curso);
    });
    dataCurso2.cursoNombre.forEach((curso) => {
      obj[`${curso.nombre}`] = false;
      // console.log(curso);
    });
    setCursoState(obj);
  }, []);
  console.log(cursoState);
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Fecha}
        </TableCell>
        <TableCell align="right">{row.Dia}</TableCell>
        <TableCell align="right">{row.Encargado}</TableCell>
        <TableCell align="right">{row.Promedio}</TableCell>
        <TableCell align="right">{row.Condicion}</TableCell>
        <TableCell align="right">{row.Observaciones}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Cursos
                <button className="pl-0 text-2xl text-center bg-naranja h-1/5 py-0 px-0 mx-0 hover:bg-gray-700 hover:text-white  border rounded-full">
                  +
                </button>
              </Typography>

              <div className="flex flex-col">
                {row.Cursos.map((curso) => (
                  <div>
                    <TableCell>
                      <div className="flex items-center">
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() =>
                            setCursoState({
                              ...cursoState,
                              [`${curso.Cur_Codigo}`]: !cursoState[curso.Cur_Codigo],
                            })
                          }
                        >
                          {cursoState[curso.Cur_Codigo] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                        <h1 className="pl-2">{curso.Cur_Codigo}</h1>
                      </div>
                    </TableCell>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={7}
                    >
                      <Collapse
                        in={cursoState[curso.Cur_Codigo]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={1}>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Actividades</TableCell>
                                <TableCell>Descripcion</TableCell>
                                <TableCell align="right">Aspecto</TableCell>
                                <TableCell align="right">Puntaje</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  {curso.Acti_Nombre}
                                </TableCell>
                                <TableCell>{curso.Eva_Desc_Acti}</TableCell>
                                <TableCell align="right">
                                  {curso.Aspecto_Nombre}
                                </TableCell>
                                <TableCell align="right">
                                  {curso.Eva_Puntaje}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </div>
                ))}
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    fecha: PropTypes.string.isRequired,
    dia: PropTypes.number.isRequired,
    encargado: PropTypes.string.isRequired,
    curso: PropTypes.arrayOf(
      PropTypes.shape({
        actividades: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        ascpecto: PropTypes.string.isRequired,
        puntaje: PropTypes.number.isRequired,
      })
    ).isRequired,
    promedio: PropTypes.number.isRequired,
    condicion: PropTypes.string.isRequired,
    observacion: PropTypes.string.isRequired,
  }).isRequired,
};

const dataCurso = {
  cursoNombre: [
    {
      nombre: "G1",
      actividadesLista: [
        {
          actividades: "PPT",
          descripcion: "Presentacion sobre la agencias",
          aspecto: "Presentacion",
          puntaje: 8,
        },
      ],
    },
    {
      nombre: "HB1",
      actividadesLista: [
        {
          actividades: "PPT",
          descripcion:
            'Preguntas abiertas sobre "La cultura del Trabajo remoto"',
          aspecto: "Desenvolvimiento ",
          puntaje: 8,
        },
      ],
    },
    {
      nombre: "HB2",
      actividadesLista: [
        {
          actividades: "OTRO",
          descripcion: "",
          aspecto: "Dominio del tema",
          puntaje: 8,
        },
      ],
    },
    {
      nombre: "HB3",
      actividadesLista: [
        {
          actividades: "PPT",
          descripcion: 'Exposicion sobre "El manejo de Tiempo y Productividad"',
          aspecto: "Dominio del tema",
          puntaje: 8,
        },
      ],
    },
    {
      nombre: "HB4",
      actividadesLista: [
        {
          actividades: "JAMBOARD",
          descripcion:
            'Cuestionario sobre "Inteligencia Emocional para Lideres"',
          aspecto: "Dominio del tema",
          puntaje: 8,
        },
      ],
    },
  ],
};
const dataCurso2 = {
  cursoNombre: [
    {
      nombre: "CB1",
      actividadesLista: [
        {
          actividades: "OTRO",
          descripcion: "Metodología SCRUM",
          aspecto: "Presentacion",
          puntaje: 8,
        },
      ],
    },
    {
      nombre: "CB2",
      actividadesLista: [
        {
          actividades: "PPT",
          descripcion: "Domina las herramientas de google suite desde cero",
          aspecto: "Desenvolvimiento   ",
          puntaje: 8,
        },
      ],
    },
    {
      nombre: "CB3",
      actividadesLista: [
        {
          actividades: "FROMULARIO",
          descripcion: "Reuniones de trabajo remoto efectivo.",
          aspecto: "Dominio del tema",
          puntaje: 8,
        },
      ],
    },
  ],
};

// const rows = [
//   {
//     fecha: "8/2/2022",
//     dia: 2,
//     encargado: "Camila",
//     promedio: 8,
//     condicion: "muy bueno",
//     observacion:
//       "El participante se presentó puntual a la reunión, demostró interés en el proceso, tuvo un muy buen desenvolvimiento. Respondió correctamente las preguntas.",
//     dataCurso,
//   },

//   {
//     fecha: "8/2/2022",
//     dia: 3,
//     encargado: "Camila",
//     promedio: 8,
//     condicion: "muy bueno",
//     observacion:
//       "El participante se presentó puntual a la reunión, demostró interés en el proceso, tuvo un muy buen desenvolvimiento. Respondió correctamente las preguntas.",
//     dataCurso,
//   },

//   {
//     fecha: "8/2/2022",
//     dia: 2,
//     encargado: "Camila",
//     promedio: 8,
//     condicion: "muy bueno",
//     observacion:
//       "El participante se presentó puntual a la reunión, demostró interés en el proceso, tuvo un muy buen desenvolvimiento. Respondió correctamente las preguntas.",
//     dataCurso,
//   },

//   {
//     fecha: "8/2/2022",
//     dia: 3,
//     encargado: "Camila",
//     promedio: 8,
//     condicion: "muy bueno",
//     observacion:
//       "El participante se presentó puntual a la reunión, demostró interés en el proceso, tuvo un muy buen desenvolvimiento. Respondió correctamente las preguntas.",
//     dataCurso,
//   },
// ];

export default function CollapsibleTable({ id }) {
  const [modalEvaluacion, setModalEvaluacion] = useState([]);
  const [loader, SetLoader] = useState(true);

  useEffect(() => {
    getPeticionModalEvaluacion(setModalEvaluacion, id, SetLoader);
  }, []);
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <>
          <div>
            <button
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border m-3"
              type="submit"
            >
              AGREGAR
            </button>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>fecha</TableCell>
                  <TableCell align="right">dia</TableCell>
                  <TableCell align="right">encargado</TableCell>
                  <TableCell align="right">promedio</TableCell>
                  <TableCell align="right">condicion</TableCell>
                  <TableCell align="right">observacion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.map((row) => (
              <Row row={row} />
            ))} */}
                {modalEvaluacion.map((n) => {
                  return <Row row={n} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <button
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border m-3"
              type="submit"
            >
              Fecha
            </button>
          </div>
        </>
      )}
    </>
  );
}
