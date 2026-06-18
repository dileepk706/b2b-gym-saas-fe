import { useSettingsContext } from 'shared/ui/settings';
import Header from './header';
import { Container, Stack } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export default function AccountLayout({ children }: Props) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Header />
      {children}
    </Container>
  );
}
