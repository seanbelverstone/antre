import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://tbwwbpochndpeltvsjxx.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App supabase={supabase} />
  </StrictMode>,
)
