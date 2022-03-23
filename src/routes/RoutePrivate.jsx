import React from "react";
import { Spinner } from "reactstrap";
import { distGetAutentication } from "../dist/Autentication";

const RoutePrivate = ({ children }) => {
  const autentication = distGetAutentication();
  // return autentication ? children : <Redirect to="/*" />;
  
  return (autentication !== null) ? (autentication ? children : window.location.href='https://desarrollo.consigueventas.com/Frontend/Asistencia/#/login') : <Spinner />
  // return autentication ? children : <Redirect to="/*" />;
  // return autentication ? children : window.location.href='https://desarrollo.consigueventas.com/Frontend/Asistencia/#/login';
};

export default RoutePrivate;

// Dashboard
// Adminsitracion  <--

// Usuauro : Restablecimiento,  perfil(Calendarioa sitencia, Datos personales <-- Ocultar datos para usauriso), calendario general,
