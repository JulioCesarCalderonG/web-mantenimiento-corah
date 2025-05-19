export interface ResultTrabajoDiario {
    ok:          boolean;
    msg:         string;
    tablaDiario: TablaDiario[];
}

export interface TablaDiario {
    especialidad:  string;
    tipo:          string;
    descripcion:   string;
    codigo:        null | string;
    placa:         null | string;
    anio:          number;
    km:            number;
    ubicacion:     null | string;
    direccion:     string;
    sede:          string;
    tipo2:         null | string;
    correlativo:   string;
    fechaCreacion: Date;
    tipoBien:      string;
}
