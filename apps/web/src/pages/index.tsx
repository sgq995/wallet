import dynamic from 'next/dynamic';

import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

import EntryPaper from '../components/EntryPaper';
import { CircularProgress, Stack, Typography } from '../components/Material';
import { useFindAllQuery } from '../hooks/entries';
import { TArrayOfEntryModel } from '../services/entries';
import AsyncViewer, {
  AsyncData,
  AsyncError,
  AsyncLoading,
} from '../components/AsyncViewer';
import EntryForm from '../components/EntryForm';

const ThirdPartyEmailPasswordAuthNoSSR = dynamic(
  new Promise<typeof ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>(
    (res) => res(ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth)
  ),
  { ssr: false }
);

interface EntryListProps {
  data: TArrayOfEntryModel;
}

function EntryList({ data }: EntryListProps) {
  if (data.length === 0) {
    return <>Empty</>;
  }

  return (
    <Stack spacing={2}>
      {data.map(({ description, amount, date }, index) => (
        <EntryPaper
          key={index}
          description={description}
          amount={amount}
          date={date}
        />
      ))}
    </Stack>
  );
}

function Home() {
  // const [entries, setEntries] = useState(new Array(50).fill({}));

  const { isLoading, isError, data, error } = useFindAllQuery();

  return (
    <>
      <Typography variant="h1">Home</Typography>

      <EntryForm />

      <AsyncViewer isLoading={isLoading} isError={isError}>
        <AsyncLoading>
          <CircularProgress />
        </AsyncLoading>

        <AsyncError>{error?.message}</AsyncError>

        <AsyncData>
          <EntryList data={data?.data} />
        </AsyncData>
      </AsyncViewer>
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
