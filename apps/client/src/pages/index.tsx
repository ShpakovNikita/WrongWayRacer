import Head from 'next/head';
import { Inter } from '@next/font/google';
import WrongWayRacer from '@/components/games/WrongWayRacer/WrongWayRacer';
import { WrongWayRacerStoreProvider } from '@/context/WrongWayRacer';
import PixiStageAutoresizeWrapper from '@/components/games/PixiStageAutoresizeWrapper';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={'bg-wrong-way-racer-blue h-screen flex items-center justify-center'}>
        <WrongWayRacerStoreProvider>
          <PixiStageAutoresizeWrapper className="h-60v w-full max-w-5xl">
            {({ width, height }) => {
              console.log(width, height);
              return <WrongWayRacer width={width} height={height} className={'rounded-xl shadow-glow'} />;
            }}
          </PixiStageAutoresizeWrapper>
        </WrongWayRacerStoreProvider>
      </main>
    </>
  );
}
