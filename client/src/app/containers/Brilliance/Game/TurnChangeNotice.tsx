import { AudioButton } from 'app/components/Button';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectActivePlayer, selectPlayer } from '../state/selectors';

const audioAllowed = () => localStorage.getItem('allowAudio') !== 'false';

export const TurnChangeNotice: React.FC = () => {
  const player = useSelector(selectPlayer);
  const activePlayer = useSelector(selectActivePlayer);
  const audioRef = useRef<HTMLAudioElement>(null);
  // eslint-disable-next-line
  useEffect(() => {
    if (!audioAllowed()) return;
    audioRef.current?.play();
    // eslint-disable-next-line
  }, [activePlayer?.name === player?.name]);
  return (
    <>
      <audio src={`/chime.wav`} ref={audioRef} />
      <AudioButton />
    </>
  );
};
