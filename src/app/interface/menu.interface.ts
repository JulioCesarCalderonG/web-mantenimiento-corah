export interface MenuResult {
    ok:   boolean;
    msg:  string;
    menu: Menu[];
}

export interface Menu {
    idMenu:  number;
    nomMenu: string;
    titulo:  string;
    subMenu: SubMenu[];
}

export interface SubMenu {
    idSubmenu:  number;
    rutaMenu:   string;
    nombreMenu: string;
}
