export interface ResultHojaServicio {
    ok:           boolean;
    msg:          string;
    hojaServicio: HojaServicio[];
}

export interface HojaServicio {
    id:                 number;
    numero:             string;
    fechaInicio:        Date;
    solicitante:        string;
    tipo:               string;
    motivo:             string;
    codigoPatrimonial:  string;
    placa:              null | string;
    direccion:          string;
    estado:             number;
    fechaActualizacion: Date;
}

