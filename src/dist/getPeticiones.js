import axios from "axios";
import { getToken } from "./Token";

//Copiar objeto a profundidad
export function copyObject(obj) {
  let result;
  if (obj instanceof Array) {
    result = [...obj];
  } else if (typeof obj === "object") {
    result = { ...obj };
  } else {
    return obj;
  }
  for (let prop of Reflect.ownKeys(result)) {
    result[prop] = copyObject(result[prop]);
  }
  return result;
}
//Petición para obtener data para departamento
export const getPeticionDepartamento = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/unidades`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.Unidades);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Petición para obtener data para filtro departamento
export const getPeticionDepartamentoFiltro = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/unidades`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      //setState(Response.data.Unidades);
      setState(
        Response.data.Unidades.reduce(function (acc, cur, i) {
          acc[cur] = cur;
          return acc;
        }, {})
      );
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Petición para obtener data para areas
export const getPeticionAreas = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/areas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.Areas);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Petición para obtener data para filtro areas
export const getPeticionAreasFiltro = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/areas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      //setState(Response.data.Areas);
      setState(
        Response.data.Areas.reduce(function (acc, cur, i) {
          acc[cur] = cur;
          return acc;
        }, {})
      );
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion para listar la data de tabla evaluacion de conducta
export const getPeticionListarConducta = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarObservacionConducta`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      // console.log(Response.data.evaluacion);
      setState(Response.data.evaluacion);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion para listar la data de tabla evaluacion Star
export const getPeticionListarStar = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarEntrevistaStar`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      // console.log(Response.data.evaluacion);
      setState(Response.data.evaluacion);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion para listar la data de tabla evaluacion de conocimiento
export const getPeticionListarConocimientos = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarEvaluacionConocimientos`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.evaluacion);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion para listar la data de tabla resumen general
export const getPeticionListarResumen = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarCalificacionGeneral`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.evaluacion);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Petición para obtener data para departamento y areas
export const getPeticionDepartamentoArea = async (
  setState1,
  setState2,
  setLoading
) => {
  let areaApi = `${process.env.REACT_APP_API_URL}/api/areas`;
  let departamentoApi = `${process.env.REACT_APP_API_URL}/api/unidades`;

  const requestAreas = axios.get(areaApi);
  const requestDepartamentos = axios.get(departamentoApi);

  await axios
    .all([requestAreas, requestDepartamentos], {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[1];
        const responseTwo = responses[2];
        console.log(responseOne);
        console.log(responseTwo);
      })
    )
    .catch((e) => {
      console.log(e);
    });
};

//Petición para obtener data para Perfiles
export const getPeticionPerfiles = async (
  setPerfiles,
  setLoading,
  setPerfilesTabla
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/perfil`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // Authorization: `Bearer 465|sWP1cEIFtzVrWdGqPKE7p4uZmZ0zAPrT2SqgDjnD`,
      },
    })
    .then((Response) => {
      setPerfiles(Response.data.perfiles);
      setLoading(false);
      setPerfilesTabla(
        Response.data.perfiles.reduce(function (acc, cur, i) {
          acc[cur.perfil_Id] = cur.perfil_nombre;
          return acc;
        }, {})
      );
    })
    .catch((e) => {});
};
//Petición para obtener data para Perfiles en filtros
export const getPeticionPerfilesFiltro = async (
  setPerfilesTabla,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/perfil`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // Authorization: `Bearer 465|sWP1cEIFtzVrWdGqPKE7p4uZmZ0zAPrT2SqgDjnD`,
      },
    })
    .then((Response) => {
      setLoading(false);
      setPerfilesTabla(
        Response.data.perfiles.reduce(function (acc, cur, i) {
          acc[cur.perfil_nombre] = cur.perfil_nombre;
          return acc;
        }, {})
      );
    })
    .catch((e) => {});
};
//Petición para obtener data de Perfil
export const getPeticionPerfilId = async (setData, id) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/perfil/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      // console.log(Response.data.perfiles[0]);
      const { Marca, Area, SubArea } = Response.data.perfiles[0];
      setData({
        perfil: id,
        departamento: Marca,
        area: Area,
        subarea: SubArea,
      });
    })
    .catch((e) => {});
};
//Mostrar los puntajes del cv de todos los postulantes
export const getPeticionCV = async (setPeticionCV, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarRevisionCv`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setPeticionCV(Response.data.evaluacion);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};
//Peticion Marcas
export const getPeticionMarcas = async (setMarcas, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/marcas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setMarcas(Response.data.Marcas);
      setLoading(false);
    })
    .catch((e) => {});
};

//Peticion de Listar Recursos
export const getPeticionListarRecursos = async (
  setState,
  dataBody,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarRecursos`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: dataBody,
    })
    .then((Response) => {
      // console.log(Response.data.recursos)
      setState(Response.data.recursos);
      setLoading(false);
    })
    .catch((e) => {});
};

//Peticion Listar requerimientos
export const getPeticionRequerimientos = async (
  setRequerimientos,
  setLoading,
  dni
) => {
  const dataBody = {
    dni: dni,
  };
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/requerimientos`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: dataBody,
    })
    .then((Response) => {
      setRequerimientos(Response.data.recursos);
      setLoading(false);
    })
    .catch((e) => {});
};

//Mostrar los puntajes del cv de todos los postulantes
export const getPeticionPlataforma = async (setPlataformas, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarPlataformas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setPlataformas(Response.data.plataformas);
      setLoading(false);
      // setPlataformasFilter(Response.data.plataformas.reduce(function (acc, cur, i) {
      //   acc[cur.pPost_Id] = cur.pPost_nombre;
      //   return acc;
      // }, {}));
    })
    .catch((e) => {});
};

//Peticion Postulaciones por plataforma - DONA
export const getPeticionPostByPlataforma = async (
  setPostPlataforma,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/posPlatDona`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setPostPlataforma(Response.data.PostulaciónPorPlatfDona);
      setLoading(false);
    })
    .catch((e) => {});
};

//Peticion Postulaciones por plataforma - DONA
export const getPeticionPostByDepartamento = async (
  setPostDepartamento,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/posDepBarra`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setPostDepartamento(Response.data.PostulaciónPorPlatfDona);
      setLoading(false);
    })
    .catch((e) => {});
};

//Peticion Puntaje de Entrevistado por fecha y departamento
export const getPeticionPuntEntrFecDep = async (
  setState,
  dataBody,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/puntaje/entrevistados`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: dataBody,
    })
    .then((Response) => {
      // console.log(Response.data.puntajes)
      setState(Response.data.puntajes);
      setLoading(false);
    })
    .catch((e) => {});
};

//Peticion Total entrevistados - Barra horizontal
export const getPeticionTotalEntrevistados = async (
  setTotalEntrevistados,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/entrevistados`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setTotalEntrevistados(Response.data.data[0]);
      setLoading(false);
    })
    .catch((e) => {});
};

//Peticion Departamento Id
export const getPeticionDepartamentoId = async (setState, setLoading) => {
  const arrayDepId = [];

  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/unidades`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      for (let i = 0; i < Response.data.id.length; i++) {
        const departamentoId = {};
        departamentoId.id = Response.data.id[i];
        departamentoId.Unidades = Response.data.Unidades[i];
        arrayDepId.push(departamentoId);
      }
      setState(arrayDepId);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion Areas Is
export const getPeticionAreasId = async (setState, setLoading) => {
  const arrayAreasId = [];
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/areas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      for (let i = 0; i < Response.data.id.length; i++) {
        const areasId = {};
        areasId.id = Response.data.id[i];
        areasId.Areas = Response.data.Areas[i];
        arrayAreasId.push(areasId);
      }
      setState(arrayAreasId);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};
//Peticion Total postulantes y aprobados por plataforma
export const getPeticionTotPosPlat = async (setState, dataBody, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/solicitudes/plataforma`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: dataBody,
    })
    .then((Response) => {
      // console.log(Response.data.postulaciones)
      setState(Response.data.postulaciones);
      setLoading(false);
    })
    .catch((e) => {});
};
//Peticion de Listar Cantidad de entrevistados / Barra vertical
export const getPeticionListarCantEntre = async (
  setState,
  dataBody,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/resultado/entrevistados`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: dataBody,
    })
    .then((Response) => {
      setState(Response.data.postulaciones);
      setLoading(false);
    })
    .catch((e) => {});
};
//Peticion de Listar Postulantes a entrevistar
export const getPeticionListarPostEntre = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/postulantes/entrevistar`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {});
};

//Peticion de Listar Postulantes a entrevistar por Fechas
export const getPeticionListarPostEntreFechas = async (
  setState,
  dataBody,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/postulantes/fechas`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: dataBody,
    })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {});
};

//Peticion de Listar entrevistas
export const getPeticionListarEntrevistas = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/entrevistas`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {});
};
//Peticion de Listar Postulantes
export const getPeticionListarPostulantes = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/postulantes`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion para filtro de plataformas
export const getPeticionPlataformaFiltro = async (
  setPlataformasFiltro,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarPlataformas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      //setPlataformasFiltro(Response.data.plataformas);
      setLoading(false);
      setPlataformasFiltro(
        Response.data.plataformas.reduce(function (acc, cur, i) {
          acc[cur.pPost_nombre] = cur.pPost_nombre;
          return acc;
        }, {})
      );
    })
    .catch((e) => {});
};

export const getPeticionListarEvaluaciones = async (
  setListarEvaluaciones,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/evaluaciones`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setListarEvaluaciones(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      alert(JSON.stringify(e));
    });
};
