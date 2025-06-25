import '../styles/globals.scss'
import '../public/assets/iconfonts/fontawesome-free/css/all.min.css'
import Contentlayout from '../shared/layout-components/layout/content-layout'
import Landingpagelayout from '../shared/layout-components/layout/landingpage-layout'
import Switcherlayout from '../shared/layout-components/layout/switcher-layout'
import Authenticationlayout from '../shared/layout-components/layout/authentication-layout'
import SSRProvider from 'react-bootstrap/SSRProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const layouts = {
  Contentlayout: Contentlayout,
  Landingpagelayout: Landingpagelayout,
  Switcherlayout: Switcherlayout,
  Authenticationlayout: Authenticationlayout,
};
function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((pageProps) => <Component>{pageProps}</Component>);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#38cab3', // 템플릿 메인 컬러
        contrastText: '#fff',
      },
    },
  });
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </ThemeProvider>
    </Layout>
  )
}

export default MyApp
