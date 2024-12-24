// Se define el entorno ------------------------------------------------------

"use client"

// Se importan los modulos de react
import React from "react";

// Se importan los modulos de amplify
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';

// Se importan los modulos de toolpad
import { AppProvider } from '@toolpad/core/AppProvider';
import type { Navigation } from '@toolpad/core/AppProvider';

// Se importan los modulos de mui
import LinearProgress from '@mui/material/LinearProgress';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Se importan los modulos de internos
import { components } from './components/authenticator'

// Se define las configuraciones ---------------------------------------------

// Se define la configuración de amplify
Amplify.configure(outputs);

// Se define la configuración del idioma
I18n.setLanguage('es');
I18n.putVocabularies(translations);

// Se define las variables ---------------------------------------------------

// Se define la variable navegacion
const navegacion: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon/>,
  },
];

// Se define las funciones ---------------------------------------------------

// Se define la funcion navegacion
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-toolpad-color-scheme="dark">
      <head>
          <link rel="icon" href="/lifeone.ico"/>
          <title>LifeOne</title>
      </head>
      <body>
        <Authenticator hideSignUp components={components}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <React.Suspense fallback={<LinearProgress />}>
              <AppProvider navigation={navegacion}>
                
                  {children}
                
              </AppProvider>
            </React.Suspense>
          </AppRouterCacheProvider>
        </Authenticator>
      </body>
    </html>
  );
}