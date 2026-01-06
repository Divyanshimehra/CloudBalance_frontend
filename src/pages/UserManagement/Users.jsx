import { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../components/ReusableTable";
import { apiFetch } from "../../api/apiClient";

export default function Users() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);   // store data from API
    const [loading, setLoading] = useState(true);  // loading state
    const [error, setError] = useState(null); // error state

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const userColumns = [
          { field: "firstName", headerName: "First Name" },
          { field: "lastName", headerName: "Last Name" },
          { field: "email", headerName: "Email ID" },
          { 
            field: "role", 
            headerName: "Role", 
            render: (value) => (
            <span className="inline-block border border-blue-900 bg-blue-100 py-1 px-2 rounded">
              {value}
            </span>
            ),
          },
          { field: "lastLogin", headerName: "Last Login" },
        ];

  useEffect(() => {
    apiFetch("/dashboard/users")
          .then((response) => response.json())
            .then((data) => {
                const formattedUsers = data.map(u => ({
                    id: u.userId,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    email: u.email,
                    role: u.role, 
                    lastLogin: u.lastLogin ?? "—"
                }));
        setUsers(formattedUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Edit User Handler
  const handleEditClick = (user) => {
  navigate(`/dashboard/users/edit/${user.id}`);
  };

  // Delete User Handler
  const handleDeleteUser = () => {
    if (!selectedUser) return;

    apiFetch(`/dashboard/users/${selectedUser.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers(users.filter((u) => u.id !== selectedUser.id));
        setOpenDeleteDialog(false);
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error}</div>;
  }

    return (
      <>
      <h1 className="font-bold text-2xl m-5">Users</h1>
      <div className="bg-white m-5 p-5">
            <div className="flex gap-4 mb-4">
                <Button sx={{ backgroundColor: "#022db9ff", color: "white",}}  onClick={() => navigate("/dashboard/users/add")}>
                    + Add New User
                </Button>
            </div>

        {/* Users Table */}
        <ReusableTable
            columns={userColumns}
            rows={users}
            renderActions={(user) => (
                <>
                    <EditIcon 
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditClick(user)}
                    />
                    <DeleteIcon 
                        style={{ cursor: "pointer" }} 
                        onClick={() => {
                            setSelectedUser(user);
                            setOpenDeleteDialog(true);
                        }}
                    />
                </>
            )}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          >
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            Are you sure you want to delete{" "}
            <span className="font-bold">{selectedUser?.firstName}</span>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "red" }}
              onClick={handleDeleteUser}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

      </div>
      </>
    );
}
