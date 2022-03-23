import axios from "axios";
import { getToken } from "./Token";

export const deletePeticionRecursos = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    };
  
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/recurso/${id}`,
        config
      ).then((Response) => {
        console.log(Response);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  export const deletePeticionPostulantes= async (id,funcion) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    };
  
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/postulantes/${id}`,
        config
      ).then((Response) => {
        console.log(Response);
        funcion();
      })
      .catch((e) => {
        console.log(e);
      });
  };