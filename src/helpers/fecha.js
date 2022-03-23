export const calcularEdad =(FechaNacimiento) =>{
    let hoy = new Date();
    let cumpleanos = new Date(FechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }    
    return edad;    
}

export const calcularDiferenciaDias = (fechaInicio, fechaFin) => {
    let fecIni = new Date(fechaInicio).getTime();
    let fecFin    = new Date(fechaFin).getTime();
    let diff = fecFin - fecIni;
    return (diff/(1000*60*60*24));
}

export const calcularDiferenciaDiasFechaActual = (fechaFin) => {
    let fecFin    = new Date(fechaFin).getTime();
    let fecActual = new Date().getTime();
    let diff = fecFin - fecActual;
    return (diff/(1000*60*60*24));
}