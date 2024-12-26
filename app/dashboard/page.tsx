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

// Se importan los modulos de internos
import { useSnackbar } from '../modulos/snackbar'

type Todo = Schema['Todo']['type'];

const client = generateClient<Schema>();

export default function MyComponent() {
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const { snackbar, showSnackbar } = useSnackbar();

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items, isSynced }) => {
        setTodos([...items]);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  // Función para manejar el clic en el botón
  function deleteTodo(id: string) {
    try {
        // Intentamos eliminar el TODO
        client.models.Todo.delete({ id });
        // Si la eliminación es exitosa, mostramos el Snackbar
        showSnackbar(`El registo ${id} ha sido eliminado correctamente.`, "success");
  
    } catch (error) {
        showSnackbar(`El registo ${id} no ha sido eliminado correctamente.`, "error");
    }
  }

  // Definir las columnas de la tabla
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'content', headerName: 'Contenido', width: 300 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => deleteTodo(params.row.id)}>
            <DeleteIcon color ="primary"/>
        </IconButton>
      ),
    },
  ];


  // Mapear los todos a un formato compatible con DataGrid
  const rows = todos.map((todo) => ({
    id: todo.id,  // El identificador único debe ser 'id'
    content: todo.content,
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
        {snackbar}
    </div>
  );
}