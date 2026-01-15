import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AuthExpiredDialog({ open }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    window.location.reload(); // clean app state
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Session Expired</DialogTitle>
      <DialogContent>
        Your session has expired. Please login again.
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin} variant="contained">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
