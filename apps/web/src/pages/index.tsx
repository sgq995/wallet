import dynamic from 'next/dynamic';

import { dehydrate, QueryClient, useQuery } from 'react-query';

import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

import EntryPaper from '../components/EntryPaper';
import { Stack, Typography } from '../components/Material';
import EntriesService from '../services/entries';

const ThirdPartyEmailPasswordAuthNoSSR = dynamic(
  new Promise<typeof ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>(
    (res) => res(ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth)
  ),
  { ssr: false }
);

function Home() {
  // const [entries, setEntries] = useState(new Array(50).fill({}));

  const { data } = useQuery('entries', getAllEntries);

  return (
    <>
      <Typography variant="h1">Home</Typography>

      <Stack spacing={2}>
        {data?.data?.map((_, index) => (
          <EntryPaper key={index} />
        ))}
      </Stack>
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

async function getAllEntries() {
  return EntriesService.findAll();
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('entries', getAllEntries);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
