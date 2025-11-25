import { useEffect, useState } from "react";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Users() {

    const [openAddDialog, setOpenAddDialog] = useState(false);

    const [users, setUsers] = useState([]);   // store data from API
    const [loading, setLoading] = useState(true);  // loading state
    const [error, setError] = useState(null); // error state

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/users")
          .then((response) => response.json())
            .then((data) => {
                const formattedUsers = data.map(u => ({
                    firstName: u.name.split(" ")[0] || "",
                    lastName: " ",
                    email: u.email,
                    roles: u.role, 
                    lastLogin: "2025-11-23" // fake date
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
  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error}</div>;
  }


    const handleOpenAddDialog = () => setOpenAddDialog(true);
    const handleCloseAddDialog = () => setOpenAddDialog(false);

    return (
        <>
        <h1 className="font-bold text-2xl m-5">Users</h1>
        <div className="bg-white m-5 p-5">
            <div className="flex gap-4 mb-4">
                <Button sx={{ backgroundColor: "#022db9ff", color: "white",}}  onClick={handleOpenAddDialog}>
                    + Add New User
                </Button>

                <Button sx={{ border: "1px solid #022db9ff", color: "#1e40af"}}>
                    Reset Filters
                </Button>
            </div>

            {/* --- Users Table --- */}
            <Table className="w-full border border-gray-300 mt-4">
                <TableHead>
                    <TableRow className="bg-blue-100 text-gray-700 font-semibold">
                        <TableCell className="border border-gray-300 px-4 py-2">First Name</TableCell>
                        <TableCell className="border border-gray-300 px-4 py-2">Last Name</TableCell>
                        <TableCell className="border border-gray-300 px-4 py-2">Email ID</TableCell>
                        <TableCell className="border border-gray-300 px-4 py-2">Roles</TableCell>
                        <TableCell className="border border-gray-300 px-4 py-2">Last Login</TableCell>
                        <TableCell className="border border-gray-300 px-4 py-2">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                            <TableCell className="border border-gray-300 px-4 py-2">{user.firstName}</TableCell>
                            <TableCell className="border border-gray-300 px-4 py-2">{user.lastName}</TableCell>
                            <TableCell className="border border-gray-300 px-4 py-2">{user.email}</TableCell>
                            <TableCell className="border border-gray-300 px-4 py-2"><div className="inline-block border border-blue-900 bg-blue-100 py-1 px-2 rounded">{user.roles}</div></TableCell>
                            <TableCell className="border border-gray-300 px-4 py-2">{user.lastLogin}</TableCell>

                            <TableCell className="border border-gray-300 px-4 py-2">
                                <EditIcon style={{ cursor: "pointer" }} />
                                <DeleteIcon style={{ cursor: "pointer" }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* --- Add New User Dialog --- */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                <DialogTitle>Add New User</DialogTitle>

                <DialogContent>
                    <TextField fullWidth label="First Name" margin="dense" />
                    <TextField fullWidth label="Last Name" margin="dense" />
                    <TextField fullWidth label="Email ID" margin="dense" />
                    <TextField fullWidth label="Roles" margin="dense" />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseAddDialog}>Cancel</Button>
                    <Button variant="contained">Save</Button>
                </DialogActions>
            </Dialog>

        </div>
        </>
    );
}


