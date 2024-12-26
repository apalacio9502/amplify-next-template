// Se define el entorno ------------------------------------------------------

"use client"

// Se importan los modulos de react
import { useState, useEffect } from 'react';

// Se importan los modulos de amplify
import { generateClient } from 'aws-amplify/data';
import type { Schema } from "@/amplify/data/resource";

// Se importan los modulos de mui
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';

// Se importan los modulos de toolpad
import { useNotifications } from '@toolpad/core/useNotifications';


type clientes = Schema['clientes']['type'];

const client = generateClient<Schema>();

export default function MyComponent() {
  
  const [clientes, setClientes] = useState<clientes[]>([]);
  const notifications = useNotifications();

  useEffect(() => {
    const sub = client.models.clientes.observeQuery(  
    ).subscribe({
      next: ({ items }) => {
        setClientes([...items]);
      },
    },
  );

    return () => sub.unsubscribe();
  }, []);

  
  // Función para manejar el clic en el botón
  function deleteClientes(nombre: string) {
    try {
        // Intentamos eliminar el TODO
        client.models.clientes.delete({ nombre });
        // Si la eliminación es exitosa, mostramos el Snackbar
        notifications.show(
          `El registo ${nombre} ha sido eliminado correctamente.`,
          {autoHideDuration: 6000,severity:"success",}
        );
  
    } catch (error) {

        notifications.show(
          `El registo ${nombre} no ha sido eliminado correctamente.`,
          {autoHideDuration: 6000,severity:"success",}
        );

    }
  }

  // Definir las columnas de la tabla
  const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'nif', headerName: 'Nif', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => deleteClientes(params.row.nombre)}>
            <DeleteIcon color ="primary"/>
        </IconButton>
      ),
    },
  ];


  // Mapear los todos a un formato compatible con DataGrid
  const rows = clientes.map((clientes) => ({
    nombre: clientes.nombre,  // El identificador único debe ser 'id'
    nif: clientes.nif,
  }));

  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Button startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </Grid>  
                <Grid size={12}>
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}/>
                </Grid>
            </Grid>
        </Box>
    </div>
  );
}