import { AudioButton } from 'app/components/Button';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectActivePlayer, selectPlayer } from '../state/selectors';

const audioAllowed = () => localStorage.getItem('allowAudio') !== 'false';

export const PhaseChangeNotice: React.FC = () => {
  const player = useSelector(selectPlayer);
  const activePlayer = useSelector(selectActivePlayer);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (!audioAllowed()) return;
    if (activePlayer?.name && activePlayer?.name === player?.name) {
      audioRef.current?.play();
    }
  }, [activePlayer?.name, player?.name]);
  return (
    <>
      <audio src={`/chime.wav`} ref={audioRef} />
      <AudioButton />
    </>
  );
};
