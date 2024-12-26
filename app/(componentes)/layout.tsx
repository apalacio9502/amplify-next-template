// Se define el entorno ------------------------------------------------------

"use client"

// Se importan los modulos de react
import * as React from 'react';

// Se importan los modulos de amplify
import { useAuthenticator } from "@aws-amplify/ui-react";

// Se importan los modulos de toolpad
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

// Se importan los modulos de mui
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

// Se define las funciones ---------------------------------------------------

// Se define la funcion appTitle
function appTitle() {
    return (
        <Stack direction="row">
            <img src="/lifeone.png" alt="LifeOne Logo" style={{ maxHeight: '40px' }} />
        </Stack>
    );
}
// Se define la funcion toolbarActions
function toolbarActions() {
    const { signOut } = useAuthenticator();
    return (
        <Stack direction="row">
            <IconButton onClick={signOut}>
                <LogoutIcon color="primary"/>
            </IconButton>
            <ThemeSwitcher/>
        </Stack>
    );
}  

// Se define la funcion DashboardPagesLayout
export default function DashboardPagesLayout(
    props: { children: React.ReactNode 
}){
    return (
        <DashboardLayout
            slots={{
                appTitle: appTitle,
                toolbarActions: toolbarActions,
            }}>
            <PageContainer breadcrumbs={[]}>
                {props.children}
            </PageContainer>
        </DashboardLayout>
  );
}