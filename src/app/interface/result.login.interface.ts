export interface ResultLogin {
    ok:      boolean;
    token:   string;
    usuario: Usuario;
}

export interface Usuario {
    idUsuario:  number;
    idPersona:  number;
    nomUsuario: string;
    clave:      string;
    fechaAlta:  null;
    motivoBaja: null;
    fechaBaja:  null;
    usuCrea:    string;
    fechaCrea:  Date;
    usuMod:     null;
    fechaMod:   null;
    estado:     boolean;
}
