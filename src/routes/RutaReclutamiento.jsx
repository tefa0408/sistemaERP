import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";
import Page404 from "../components/Page404";
import TablaEvaluacionConducta from "../components/Reclutamiento/Entrevista/TablaEvaluacionConducta";
import TablaEvaluacionConocimiento from "../components/Reclutamiento/Entrevista/TablaEvaluacionConocimiento";
import TablaEvaluacionCV from "../components/Reclutamiento/Entrevista/TablaEvaluacionCV";
import TablaEvaluacionStar from "../components/Reclutamiento/Entrevista/TablaEvaluacionStar";
import GraficoEntrevistados from "../components/Reclutamiento/GraficoEntrevistados";
import GraficoGeneral from "../components/Reclutamiento/GraficoGeneral";
import GraficoPostArea from "../components/Reclutamiento/GraficoPostArea";
import GraficoPostPlataforma from "../components/Reclutamiento/GraficoPostPlataforma";
import TablaCompetencias from "../components/Reclutamiento/TablaCompetencias";
import TablaEntrevistado from "../components/Reclutamiento/TablaEntrevistado";
import TablaPerfil from "../components/Reclutamiento/TablaPerfil";
import TablaPostulantes from "../components/Reclutamiento/TablaPostulantes";
import TablaRequerimientos from "../components/Reclutamiento/TablaRequerimientos";
import TablaResumenGen from "../components/Reclutamiento/TablaResumenGen";

const RutaReclutamiento = () => {
  const { permisosUser } = useContext(UserContext);
  return (
    <Switch>
      {/* {
        (permisosUser.includes("reclutamiento_requerimiento_personal")) &&
        (
          <Route
            path="/reclutamiento/tabla-requerimientos"
            exact
            component={TablaRequerimientos}
          />
        )

      } */}
      
      <Route
        path="/reclutamiento/tabla-requerimientos"
        exact
        component={ (permisosUser.includes("reclutamiento_requerimiento_personal")) ? TablaRequerimientos : Page404  }
      />

      <Route 
        path="/reclutamiento/tabla-perfil" 
        exact 
        component={ (permisosUser.includes("reclutamiento_recursos_perfil")) ? TablaPerfil : Page404 } 
      />

      <Route
        path="/reclutamiento/tabla-competencias"
        exact
        component={ (permisosUser.includes("reclutamiento_recursos_manucomp")) ? TablaCompetencias  : Page404}
      />

      <Route
        path="/reclutamiento/tabla-postulantes"
        exact
        component={ (permisosUser.includes("reclutamiento_lista_postulantes")) ? TablaPostulantes  : Page404}
      />

      <Route
        path="/reclutamiento/tabla-entrevistado"
        exact
        component={ (permisosUser.includes("reclutamiento_postulante_a_entrevistar")) ? TablaEntrevistado  : Page404}
      />

      <Route
        path="/reclutamiento/tabla-resumen-general"
        exact
        component={ (permisosUser.includes("reclutamiento_entrevista_resugene")) ? TablaResumenGen  : Page404}
      />

      {/* Entrevistas */}
      <Route
        path="/reclutamiento/tabla-evaluacion-cv"
        exact
        component={ (permisosUser.includes("reclutamiento_entrevista_evaluacioncv")) ? TablaEvaluacionCV  : Page404}
      />

      <Route
        path="/reclutamiento/tabla-evaluacion-conducta"
        exact
        component={ (permisosUser.includes("reclutamiento_entrevista_evaluacion_cond")) ? TablaEvaluacionConducta  : Page404}
      />

      <Route
        path="/reclutamiento/tabla-evaluacion-star"
        exact
        component={ (permisosUser.includes("reclutamiento_entrevista_evaluacion_star")) ? TablaEvaluacionStar  : Page404}
      />

      <Route
        path="/reclutamiento/tabla-evaluacion-conocimiento"
        exact
        component={ (permisosUser.includes("reclutamiento_entrevista_evaluacion_conoci")) ? TablaEvaluacionConocimiento  : Page404}
      />

      {/* Reportes */}

      <Route
        path="/reclutamiento/reporte-general"
        exact
        component={ (permisosUser.includes("reclutamiento_reportes_graficos")) ? GraficoGeneral  : Page404}
      />

      <Route
        path="/reclutamiento/reporte-entrevistados"
        exact
        component={ (permisosUser.includes("reclutamiento_reportes_graficos")) ? GraficoEntrevistados  : Page404}
      />

      <Route
        path="/reclutamiento/reporte-area"
        exact
        component={ (permisosUser.includes("reclutamiento_reportes_graficos")) ? GraficoPostArea  : Page404}
      />

      <Route
        path="/reclutamiento/reporte-plataforma"
        exact
        component={ (permisosUser.includes("reclutamiento_reportes_graficos")) ? GraficoPostPlataforma  : Page404}
      />

      {/* <Route path="/reclutamiento/*" component={Page404} /> */}
    </Switch>
  );
};

export default RutaReclutamiento;
