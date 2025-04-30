import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Start from './pages/Start';
import Combat from './pages/Combat';
import CharacterSelect from './pages/CharacterSelect';


function App({ supabase }) {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/">
				<Route index element={<Start supabase={supabase} />} />
				<Route path="antreV2" element={<Start supabase={supabase} />} />
				<Route path="combat" element={<Combat />} />
				<Route path="select" element={<CharacterSelect />} />
			</Route>
		)
	)



  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;