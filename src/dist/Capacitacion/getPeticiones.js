import axios from "axios";
import { getToken } from "../Token";

export const getPeticionPracticante = async (setState, setLoading) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/practicantesSeleccionados`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getPeticionListarCapacitaciones = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/capacitacion`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getPeticionListarReclutadores = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/reclutadores`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getPeticionModalEvaluacion = async (setState, id, setLoading) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/${id}/evaluaciones`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      setState(Response.data.data.Evaluaciones);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};
