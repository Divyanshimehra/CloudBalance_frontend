import AWS from "../pages/AWS/AWS";
import CostExplorer from "../pages/CostExplorer/CostExplorer";
import AddUsers from "../pages/UserManagement/AddUsers";
import Users from "../pages/UserManagement/Users";
import Onboarding from "../pages/UserOnboarding/Onboarding";

export const routesByRole = {
  Admin: [
    { path: "users", element: <Users /> },
    { path: "users/add", element: <AddUsers /> },
    { path: "users/edit/:id", element: <AddUsers /> },
    { path: "onboarding", element: <Onboarding/>},
    { path: "cost-explorer", element: <CostExplorer/>},
    { path: "AWS-service", element: <AWS/>},
  ],
  Readonly: [
    // { path: "", element: <ReadOnly /> },
     {path: "users", element: <Users /> },
     { path: "onboarding", element: <Onboarding/>},
     { path: "cost-explorer", element: <CostExplorer/>},
     { path: "AWS-service", element: <AWS/>},
  ],
  Customer: [
    // { path: "", element: <Customer /> },
  ]
};
