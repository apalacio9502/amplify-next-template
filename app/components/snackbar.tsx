// Se define el entorno ------------------------------------------------------

// Se importan los modulos de react
import { useState } from "react";

// Se importan los modulos de mui
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Crear un Hook personalizado para manejar el Snackbar
export function useSnackbar() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<"success" | "error">("success");
  
    const showSnackbar = (msg: string, sev: "success" | "error") => {
      setMessage(msg);
      setSeverity(sev);
      setOpen(true);
    };
  
    // Función para cerrar el Snackbar cuando se hace clic en el botón de cerrar
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        // Solo cerramos si no es por un clic fuera (en caso de que se use 'autoHideDuration' o algo similar)
        if (reason !== "clickaway") {
            setOpen(false);
        }
    };
  
    return {
      snackbar: (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      ),
      showSnackbar,
    };
  }