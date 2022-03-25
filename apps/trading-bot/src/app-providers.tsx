import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useSession } from 'next-auth/react';
import type { FC } from 'react';
import { useEffect } from 'react';

import { createEmotionCache } from '@/core/nextjs/create-emotion-cache';
import { muiTheme } from '@/themes/mui/mui.theme';
import { setCredentials } from 'redux/auth-slice';
import { useAppDispatch } from 'redux/store';
import type { Session } from 'type/user';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type Props = {
  emotionCache?: EmotionCache;
};

export const AppProviders: FC<Props> = (props) => {
  const { emotionCache = clientSideEmotionCache } = props;
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const user: Session | undefined =
      session?.user && session?.userId
        ? {
            email: session?.user.email ?? '',
            name: session?.user.name ?? '',
            image: session?.user.image ?? '',
            id: session?.userId as string,
          }
        : undefined;
    dispatch(
      setCredentials({
        status,
        token: session?.accessToken as string,
        session: user,
      })
    );
  }, [session, status]);

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={muiTheme}>
        {/* Mui CssBaseline disabled in this example as tailwind provides its own */}
        {/* <CssBaseline /> */}
        {props.children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};
