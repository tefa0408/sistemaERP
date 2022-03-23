import React from "react";
import { Bar } from "react-chartjs-2";

export const TablaIngresos = () => {
  const retiros = [5, 6, 7, 8];

  const ingresos = [9, 10, 11, 12];

  return (
    <div className="container mx-auto">
        <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          INGRESOS Y RETIROS
        </h3>
      </div>
      <div className="mt-0 sm:mt-5">
        <Bar
          data={{
            barThickness: "20px",
            labels: ["Frontend", "Backend", "Base de Datos", "Documentación"],
            datasets: [
              {
                label: "Retiros",
                data: retiros,
                backgroundColor: ["#8588B7"],
                borderColor: ["#8588B7"],
                borderWidth: 2,
                hoverBackgroundColor: ["#8588B7"],
              },
              {
                label: "Ingresos",
                data: ingresos,
                backgroundColor: ["#010553"],
                borderColor: ["#010553"],
                hoverBackgroundColor: ["#010553"],
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
    </div>
  );
};
