export interface MenuResult {
    ok:   boolean;
    msg:  string;
    menu: Menu[];
}

export interface Menu {
    icon:     Icon;
    label:    string;
    route:    string;
    subItem?: Menu[];
}

export enum Icon {
    Dashboard = "dashboard",
    DeveloperDashboard = "developer_dashboard",
}
