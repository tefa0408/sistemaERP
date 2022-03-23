import React from "react";
import { Route, Switch } from "react-router-dom";
import TablaPracticantes from "../components/Capacitacion/TablaPracticantes";
import TablaEvaluacion from "../components/Capacitacion/TablaEvaluacion";
import TablaRecursos from "../components/Capacitacion/TablaRecursos";
import TablaTemario from "../components/Capacitacion/TablaTemario";
import { TablaIngresos } from "../components/Capacitacion/TablaIngresos";
import TablaTotalCapacitados from "../components/Capacitacion/TablaTotalCapacitados";
import { ReporteSemanal } from "../components/Capacitacion/ReporteSemanal";
import { ColaboradoresInducir } from "../components/Capacitacion/ColaboradoresInducir";

const RutaCapacitacion = () => {
  return (
    <Switch>
      <Route
        path="/capacitacion/practicantes"
        exact
        component={TablaPracticantes}
      />
      <Route
        path="/capacitacion/evaluacion"
        exact
        component={TablaEvaluacion}
      />
      <Route path="/capacitacion/recursos" exact component={TablaRecursos} />
      <Route path="/capacitacion/temario" exact component={TablaTemario} />
      <Route path="/capacitacion/ingresos" exact component={TablaIngresos} />
      <Route
        path="/capacitacion/total-capacitados"
        exact
        component={TablaTotalCapacitados}
      />
      <Route
        path="/capacitacion/reporte-semanal"
        exact
        component={ReporteSemanal}
      />
      <Route
        path="/capacitacion/colaboradores"
        exact
        component={ColaboradoresInducir}
      />
    </Switch>
  );
};

export default RutaCapacitacion;
