import { ThemeProvider } from "@material-tailwind/react";
import 'antd/dist/antd.css';
import { RecoilRoot } from 'recoil';
import 'tailwindcss/tailwind.css';

import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Component {...pageProps}/>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp

