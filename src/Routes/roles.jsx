import Users from "../pages/Users";

export const routesByRole = {
  admin: [
    { path: "users", element: <Users /> },
    // { path: "modules", element: <Modules /> },
    // { path: "dashboardControl", element: <DashboardControl />}

  ],
  readonly: [
    // { path: "", element: <ReadOnly /> },
  ],
  customer: [
    // { path: "", element: <Customer /> },
  ]
};
