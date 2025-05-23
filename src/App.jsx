import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import Start from './pages/Start';
import Play from './pages/Play';
import CharacterSelect from './pages/CharacterSelect';
import CharacterCreatePage from './pages/CharacterCreate';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';
import { CustomAlert } from './components/CustomAlert';
import Fallback from './Fallback';

function App({ supabase }) {
  const loading = useSelector(state => state.loader?.loading ?? false);
  const snackbar = useSelector(state => state.snackbar);
	
	window.onbeforeunload = function () {
		return false;
	}

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/antre" element={<Fallback />}>
				<Route index element={<Start supabase={supabase} />} />
				<Route path="/antre" element={<Start supabase={supabase} />} />
				<Route path="/antre/select" element={<CharacterSelect supabase={supabase} />} />
				<Route path="/antre/create" element={<CharacterCreatePage supabase={supabase} />} />
				<Route path="/antre/play" element={<Play supabase={supabase} />} />
				<Route path="*" element={<Navigate to="/antre" replace />} />
			</Route>
		)
	)

  return (
    <>
      <RouterProvider router={router} />
			<Loader loading={loading} />
			<CustomAlert openSnackbar={snackbar.openSnackbar} snackbarSeverity={snackbar.snackbarSeverity} snackbarErrorMessage={snackbar.snackbarErrorMessage} />
    </>
  );
}

export default App;