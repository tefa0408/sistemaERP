import axios from "axios";
import { getToken } from "./Token";
//Peticion que Actualiza un recurso
export const putPeticionActualizarRecurso = (data, setLoading) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }
  };

  const bodyParameters = {
    ...data
  };
  axios
    .put(`${process.env.REACT_APP_API_URL}/api/recurso`,
      bodyParameters,
      config
    ).then((Response) => {
      console.log(Response);
      setLoading(true)
    })
    .catch((e) => {
      console.log(e);
    });
};
//Peticion que Actualiza un Postulante
export const putPeticionActualizarPostulante = (data, id, setLoading, setErrorUpdate, funcion) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  };

  const bodyParameters = {
    ...data
  };
  axios
    .put(`${process.env.REACT_APP_API_URL}/api/postulantes/${id}`,
      bodyParameters,
      config
    ).then((Response) => {
      setLoading(true);
      setErrorUpdate([]);
      funcion();
      // console.log(Response);
    })
    .catch((error) => {
      setLoading(false);
      // console.log(error.response.data.errors);
      setErrorUpdate(error.response.data.errors);
    });
};