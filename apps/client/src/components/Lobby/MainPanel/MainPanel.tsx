import { Box, BoxProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useLobbyStore } from '@/context';
import { PrimaryButton } from '@/components/ui';
import PlayersComponent from '@/components/Lobby/MainPanel/ChatComponent';
import { useCallback } from 'react';

/**
 * React component for lobby's main panel, that have Start Racing button, Chat messages and chat typing prompt
 * @param className: string - css classnames
 * @param props: MUI BoxProps
 */
const MainPanel = ({ className, ...props }: BoxProps) => {
  const { startGame, loading, inArena, connected } = useLobbyStore();
  const startRacingButtonDisabled = !connected || inArena || loading;

  const startRacingButtonHandle = useCallback(async () => {
    if (!startRacingButtonDisabled) {
      await startGame();
    }
  }, [startRacingButtonDisabled, startGame]);

  return (
    <Box {...props} className={`${className} space-y-2`}>
      <PrimaryButton
        className="w-full"
        disabled={startRacingButtonDisabled}
        onClick={startRacingButtonHandle}
      >
        Start Racing!
      </PrimaryButton>
      <PlayersComponent />
    </Box>
  );
};

export default observer(MainPanel);
