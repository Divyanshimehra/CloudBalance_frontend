import { useState, useEffect } from "react";
import {TextField, Button, MenuItem, Select, FormControl, Box} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../api/apiClient";

export default function AddUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const availableRoles = ["Admin", "Readonly", "Customer"];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  const [allAccounts, setAllAccounts] = useState([]);
  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState([]);
  const [selectedRight, setSelectedRight] = useState([]);


  // Fetch user data in edit mode
  useEffect(() =>{
    if (!isEditMode) return;
    apiFetch(`/dashboard/users/${id}`)
    // fetch(`http://localhost:8080/dashboard/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        password: "", // never prefill password
      });
    });
  }, [id, isEditMode]);

  // Fetch all accounts
  useEffect(() => {
    if (formData.role !== "Customer") return;

    apiFetch(`/accounts`)
    // fetch(`http://localhost:8080/accounts`)
      .then(res => res.json())
      .then(data => setAllAccounts(data));
  }, [formData.role]);

  // fetch assigned accounts in edit mode
  useEffect(() => {
    if (!isEditMode || formData.role !== "Customer") return;

    apiFetch(`/dashboard/users/${id}/accounts`)
    // fetch(`http://localhost:8080/dashboard/users/${id}/accounts`)
      .then(res => res.json())
      .then(data => setAssignedAccounts(data));
  }, [id, isEditMode, formData.role]);

  //derive available accounts
  const availableAccounts = allAccounts.filter(acc => 
    !assignedAccounts.some(assigned => assigned.id === acc.id)
  );

  //move accounts between lists
  const assignAccounts = () => {
    const movingAccounts = availableAccounts.filter(acc => 
      selectedLeft.includes(acc.id)
    );

    setAssignedAccounts(prev => [...prev, ...movingAccounts]);
    setSelectedLeft([]);
  };


  const unassignAccounts = () => {
  setAssignedAccounts(prev =>
    prev.filter(acc => !selectedRight.includes(acc.id))
  );
  setSelectedRight([]);
  };


  // Submit
  const handleSubmit = () => {
    const { firstName, lastName, email, role, password } = formData;

    if (!firstName || !lastName || !email || !role) {
      alert("Please fill all required fields!");
      return;
    }
    if (!isEditMode && !password){
      alert("Please provide a password!");
      return;
    }

    const url = isEditMode
      ? `/dashboard/users/${id}`
      : `/dashboard/users/add`;

    const method = isEditMode ? "PUT" : "POST";

    const accountIds = assignedAccounts.map(acc => acc.id);

    const loadingData = isEditMode
      ? { firstName, lastName, email, role, accountIds }
      : { firstName, lastName, email, role, password, accountIds };

    apiFetch(url, {
      method,
      body: JSON.stringify(loadingData),
    }).then(() => navigate("/dashboard/users"));
  };

  return (
    <>
      <h1 className="font-bold text-2xl m-5">
        {isEditMode ? "Edit User" : "Add New User"}
      </h1>

      <Box className="bg-white m-5 p-6 rounded">

        {/* Name */}
        <div className="flex gap-6">
          <div className="mb-4 w-1/2">
            <label className="font-medium text-sm">
              First Name <span className="text-red-600">*</span>
            </label>
            <TextField
              fullWidth
              size="small"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>

          <div className="mb-4 w-1/2">
            <label className="font-medium text-sm">
              Last Name <span className="text-red-600">*</span>
            </label>
            <TextField
              fullWidth
              size="small"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
        </div>

        {/* Email & Password */}
        <div className="flex gap-6">
          <div className="mb-4 w-1/2">
            <label className="font-medium text-sm">
              Email ID <span className="text-red-600">*</span>
            </label>
            <TextField
              fullWidth
              size="small"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="mb-4 w-1/2">
            <label className="font-medium text-sm">
              Password <span className="text-red-600">*</span>
            </label>
            <TextField
              fullWidth
              size="small"
              type="password"
              disabled={isEditMode}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>

        {/* Role */}
        <div className="mb-6 w-1/2">
          <label className="font-medium text-sm">
            Select Role <span className="text-red-600">*</span>
          </label>
          <FormControl fullWidth size="small">
            <Select
              value={formData.role}
              displayEmpty
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <MenuItem value="" disabled>
                Select Role
              </MenuItem>
              {availableRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* ACCOUNT MAPPING (CUSTOMER ONLY) */}
        {formData.role === "Customer" && (
          <Box className="border rounded p-4 mb-6">
            <h3 className="font-semibold mb-3">Manage Account IDs</h3>

            <div className="flex gap-4">
              {/* LEFT */}
              <Box className="w-1/2 border rounded p-2">
                <p className="font-medium mb-2">
                  Available Accounts ({availableAccounts.length})
                </p>

                {availableAccounts.map(acc => (
                  <div key={acc.id} className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={selectedLeft.includes(acc.id)}
                      onChange={() =>
                        setSelectedLeft(prev =>
                          prev.includes(acc.id)
                            ? prev.filter(id => id !== acc.id)
                            : [...prev, acc.id]
                        )
                      }
                    />
                    <span>{acc.accountName} ({acc.accountId})</span>
                  </div>
                ))}
              </Box>

              {/* BUTTONS */}
              <div className="flex flex-col justify-center gap-2">
                <Button onClick={assignAccounts}>➜</Button>
                <Button onClick={unassignAccounts}>⬅</Button>
              </div>

              {/* RIGHT */}
              <Box className="w-1/2 border rounded p-2">
                <p className="font-medium mb-2">
                  Assigned Accounts ({assignedAccounts.length})
                </p>

                {assignedAccounts.map(acc => (
                  <div key={acc.id} className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={selectedRight.includes(acc.id)}
                      onChange={() =>
                        setSelectedRight(prev =>
                          prev.includes(acc.id)
                            ? prev.filter(id => id !== acc.id)
                            : [...prev, acc.id]
                        )
                      }
                    />
                    <span>{acc.name} ({acc.accountId})</span>
                  </div>
                ))}
              </Box>
            </div>
          </Box>
        )}


        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#022db9ff", color: "white" }}
            onClick={handleSubmit}
          >
          {isEditMode ? "Save Changes" : "Save"}
          </Button>

          <Button
            variant="outlined"
            sx={{ borderColor: "#022db9ff", color: "#022db9ff" }}
            onClick={() => navigate("/dashboard/users")}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </>
  );
}