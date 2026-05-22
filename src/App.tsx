// i18n
import '@locales/i18n';
import './App.css';

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// routes
// theme
// hooks
// import { useScrollToTop } from '@hooks/useScrollToTop';
// components
import MotionLazy from '@components/animate/MotionLazy';
import SnackbarProvider from '@components/snackbar/SnackbarProvider';
import { SettingsProvider, SettingsDrawer } from '@components/settings';
// auth
import { AuthProvider, AuthConsumer } from '@auth/context';
import enLocale from 'date-fns/locale/en-GB';
import ThemeProvider from '@theme/index';
import { BootstrappedRouter } from './routes';

// ----------------------------------------------------------------------

export default function App() {
  // useScrollToTop();

  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enLocale}>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'bold', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: true,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <SettingsDrawer />
                <AuthConsumer>
                  <BootstrappedRouter />
                </AuthConsumer>
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}
