import dynamic from 'next/dynamic';

import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import EntryList from '../components/entries/EntryList';

import { Typography } from '@mui/material';

const ThirdPartyEmailPasswordAuthNoSSR = dynamic(
  new Promise<typeof ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>(
    (res) => res(ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth)
  ),
  { ssr: false }
);

function Home() {
  return (
    <>
      <Typography variant="h1">Home</Typography>

      <EntryList />
    </>
  );
}

export default function ProtectedHome() {
  return (
    <ThirdPartyEmailPasswordAuthNoSSR>
      <Home />
    </ThirdPartyEmailPasswordAuthNoSSR>
  );
}
