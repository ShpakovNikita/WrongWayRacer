import { observer } from 'mobx-react-lite';
import { _ReactPixi, Stage } from '@pixi/react';
import { useEffect } from 'react';
import { useWrongWayRacerStore, WrongWayRacerStoreProvider } from '@/context/WrongWayRacer';
import WrongWayRacerScene from '@/components/games/WrongWayRacer/WrongWayRacerScene';
import { CircularProgress } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

const WrongWayRacer = ({
  options,
  width,
  height,
  className,
  ...props
}: Omit<_ReactPixi.IStage, 'width' | 'height'> & {
  width: number;
  height: number;
}) => {
  const { activateStore, deactivateStore, loading } = useWrongWayRacerStore();

  useEffect(() => {
    activateStore().then();

    return () => {
      deactivateStore().then();
    };
  }, [activateStore, deactivateStore()]);

  return (
    <AnimatePresence>
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="stage">
          <Stage
            {...props}
            className={className}
            width={width}
            height={height}
            options={{ backgroundAlpha: 1, backgroundColor: '#fff', ...options }}
          >
            {/* Double WrongWayRacerStoreProvider with shared static state as workaround for losing react context in WebGL renderer */}
            <WrongWayRacerStoreProvider>
              <WrongWayRacerScene width={width} height={height} />
            </WrongWayRacerStoreProvider>
          </Stage>
        </motion.div>
      )}
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`${className} absolute border-slate-400 bg-black/50 border-[1px] h-full w-full flex items-center justify-center`}
        >
          <CircularProgress />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default observer(WrongWayRacer);
