import './index.css';

import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {PrimeReactProvider} from "primereact/api";
import Theme from './Theme';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Done from "./Done.tsx";
import Root from "./Root.tsx";

const router = createBrowserRouter([
	{
		element: <Root/>,
		children: [
			{
				path: "/",
				element:
					<App/>
			},
			{
				path: "/submitted",
				element: <Done/>
			}
		]
	}
]);

createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<PrimeReactProvider value={{pt: Theme}}>
			<RouterProvider router={router}/>
		</PrimeReactProvider>
	</React.StrictMode>
);