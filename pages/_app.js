import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { ThemeProvider } from "@material-tailwind/react";
import { RecoilRoot } from 'recoil';
import 'antd/dist/antd.css';


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

