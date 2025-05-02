import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Start from './pages/Start';
import Combat from './pages/Combat';
import CharacterSelect from './pages/CharacterSelect';
import CharacterCreatePage from './pages/CharacterCreate';


function App({ supabase }) {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/antre">
				<Route index element={<Start supabase={supabase} />} />
				<Route path="/antre" element={<Start supabase={supabase} />} />
				<Route path="/antre/combat" element={<Combat supabase={supabase} />} />
				<Route path="/antre/select" element={<CharacterSelect supabase={supabase} />} />
				<Route path="/antre/create" element={<CharacterCreatePage supabase={supabase} />} />
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