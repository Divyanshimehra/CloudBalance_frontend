import { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { apiFetch } from "../../api/apiClient";
import ReusableTable from "../../components/ReusableTable";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function AccountOnboarded() {

  const navigate = useNavigate();

  const {user} = useContext(UserContext);
  const role = user ? user.role : null;
  const isAdmin = role === "ADMIN";

  const [accounts, setAccounts] = useState([]);

  const accountsColumns = [
          { field: "arn", headerName: "ARN" },
          { field: "accountName", headerName: "Account Name" },
          { field: "id", headerName: "Account ID" }
    ];
    
  const loadAccounts = () => {
    apiFetch(`/accounts`)
      .then(response => response.json())
      .then(data =>
        setAccounts(
          data.map(a => ({
            id: a.accountId,
            arn: a.arn,
            accountName: a.accountName,
          }))
        )
      );
    };
    useEffect(() => {
        loadAccounts();
    }, []);

  return (
    <>
      <h1 className="font-bold text-2xl m-5">Onboard New Account</h1>
      <div className="bg-white m-5 p-5">
        <div className="flex gap-4 mb-4">
                {
                <Button 
                    sx={{ backgroundColor: isAdmin ? "#022db9ff" : "#a8a8a8ff", 
                      color: "white",
                      cursor: isAdmin ? "pointer" : "not-allowed"
                    }}  
                    onClick={isAdmin ? () => navigate("/dashboard/onboarding/new-account") : null}>
                    + Link New Account
                </Button>}
        </div>
      <div>
        <ReusableTable
            columns={accountsColumns}
            rows={accounts}
        />
      </div>
      </div>
    </>
  );
}
