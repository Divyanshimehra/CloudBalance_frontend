import AWS from "../pages/AWS/AWS";
import CostExplorer from "../pages/CostExplorer/CostExplorer";
import AddUsers from "../pages/UserManagement/AddUsers";
import Users from "../pages/UserManagement/Users";
import Onboarding from "../pages/UserOnboarding/Onboarding";

export const routesByRole = {
  ADMIN: [
    { path: "users", element: <Users /> },
    { path: "users/add", element: <AddUsers /> },
    { path: "users/edit/:id", element: <AddUsers /> },
    { path: "onboarding", element: <Onboarding/>},
    { path: "cost-explorer", element: <CostExplorer/>},
    { path: "AWS-service", element: <AWS/>},
  ],
  READONLY: [
    // { path: "", element: <ReadOnly /> },
     {path: "users", element: <Users /> },
     { path: "onboarding", element: <Onboarding/>},
     { path: "cost-explorer", element: <CostExplorer/>},
     { path: "AWS-service", element: <AWS/>},
  ],
  CUSTOMER: [
    // { path: "", element: <Customer /> },
  ]
};
