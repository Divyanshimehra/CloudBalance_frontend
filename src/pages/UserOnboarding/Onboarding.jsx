import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { apiFetch } from "../../api/apiClient";

export default function Onboarding() {

//   const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    accountId: "",
    arn: "",
    accountName: "",
  });

//   const accountsColumns = [
//           { field: "arn", headerName: "ARN" },
//           { field: "accountName", headerName: "Account Name" },
//           { field: "id", headerName: "Account ID" }
//     ];
    
//   const loadAccounts = () => {
//     apiFetch(`/accounts`)
//       .then(response => response.json())
//       .then(data =>
//         setAccounts(
//           data.map(a => ({
//             id: a.accountId,
//             arn: a.arn,
//             accountName: a.accountName,
//           }))
//         )
//       );
//     };
//     useEffect(() => {
//         loadAccounts();
//     }, []);

  const handleSubmit = () => {
    const { accountId, arn, accountName } = formData;

    if (!accountId || !arn || !accountName) {
      alert("All fields are required!");
      return;
    }

    apiFetch("/onboard", {
      method: "POST",
      body: JSON.stringify({
        accountId: Number(accountId),
        arn,
        accountName,
      }),
    })
      .then(() => {
        alert("Account onboarded successfully");
        setFormData({ accountId: "", arn: "", accountName: "" });
        // loadAccounts(); // list refresh
      })
      .catch(() => alert("Failed to onboard account"));
  };

  return (
    <>
      <h1 className="font-bold text-2xl m-5">Onboard New Account</h1>

      <Box className="bg-white m-5 p-6 rounded w-1/2">
        <div className="mb-4">
          <TextField
            label="Account ID"
            fullWidth
            size="small"
            value={formData.accountId}
            onChange={(e) =>
              setFormData({ ...formData, accountId: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <TextField
            label="ARN"
            fullWidth
            size="small"
            value={formData.arn}
            onChange={(e) =>
              setFormData({ ...formData, arn: e.target.value })
            }
          />
        </div>

        <div className="mb-6">
          <TextField
            label="Account Name"
            fullWidth
            size="small"
            value={formData.accountName}
            onChange={(e) =>
              setFormData({ ...formData, accountName: e.target.value })
            }
          />
        </div>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#022db9ff", color: "white" }}
          onClick={handleSubmit}
        >
          Onboard Account
        </Button>
      </Box>
      {/* <div>
        <ReusableTable
            columns={accountsColumns}
            rows={accounts}
        />
      </div> */}
    </>
  );
}
