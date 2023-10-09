import React from 'react'
import ReactDOM from 'react-dom/client'
import Example from './component/Example.tsx';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>,
)
