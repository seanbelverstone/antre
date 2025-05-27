import {
  Route,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import Start from './pages/Start';
import Play from './pages/Play';
import CharacterSelect from './pages/CharacterSelect';
import CharacterCreatePage from './pages/CharacterCreate';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';
import { CustomAlert } from './components/CustomAlert';
import Layout from './Layout';

function App({ supabase }) {
  const loading = useSelector(state => state.loader?.loading ?? false);
  const snackbar = useSelector(state => state.snackbar);

  window.onbeforeunload = function () {
    return false;
  }

  const router = createHashRouter(
    createRoutesFromElements(
      // The root route now refers to the part AFTER the hash (e.g., #/)
      // So, if your deployed URL is yourusername.github.io/antre/,
      // the router will handle paths like /#/ and #/select.
      <Route path="/" element={<Layout />}>
        <Route index element={<Start supabase={supabase} />} />
        {/* <Route path="antre" element={<Start supabase={supabase} />} /> */}
        <Route path="select" element={<CharacterSelect supabase={supabase} />} />
        <Route path="create" element={<CharacterCreatePage supabase={supabase} />} />
        <Route path="play" element={<Play supabase={supabase} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <Loader loading={loading} />
      <CustomAlert openSnackbar={snackbar.openSnackbar} snackbarSeverity={snackbar.snackbarSeverity} snackbarErrorMessage={snackbar.snackbarErrorMessage} />
    </>
  );
}

export default App;