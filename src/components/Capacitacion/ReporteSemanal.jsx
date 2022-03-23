import React from 'react'
import { Doughnut } from "react-chartjs-2";

export const ReporteSemanal = () => {
  
  const datosReporte = [20, 10];

  return (
    <div className="container mx-auto">
        <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          REPORTE SEMANAL
        </h3>
      </div>
      <div className="mt-0 sm:mt-5">
      <Doughnut
              data={{
                labels: ["Culminado", "Retirado"],
                datasets: [
                  {
                    label: "culminado",
                    data: datosReporte,
                    backgroundColor: [
                        '#0996F3',
                        '#EF8711'
                    ],
                    borderColor: [
                        '#0996F3',
                        '#EF8711'
                    ],
                    borderWidth: 1,
                    hoverOffset: 7,
                    hoverBackgroundColor: [
                        '#0996F3',
                        '#EF8711'
                    ],
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
                animation: {
                  animateRotate: false,
                },
              }}
            />
            </div>
      </div>
  );
};
