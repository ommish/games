import { AudioButton } from 'app/components/Button';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  selectActivePlayer,
  selectGamePhase,
  selectPlayer,
} from '../state/selectors';

const audioAllowed = () => localStorage.getItem('allowAudio') !== 'false';

export const PhaseChangeNotice: React.FC = () => {
  const phase = useSelector(selectGamePhase);
  const player = useSelector(selectPlayer);
  const activePlayer = useSelector(selectActivePlayer);
  const audioRef = useRef<HTMLAudioElement>(null);
  // eslint-disable-next-line
  useEffect(() => {
    if (!audioAllowed()) return;
    switch (phase) {
      case 'selecting-hint':
        if (player && player.name === activePlayer) {
          audioRef.current?.play();
        }
        break;
      case 'submitting-cards':
        if (player && player.name !== activePlayer) {
          audioRef.current?.play();
        }
        break;
      case 'guessing-original':
        if (player && player.name !== activePlayer) {
          audioRef.current?.play();
        }
        break;
      case 'distributing-points':
        if (player) {
          audioRef.current?.play();
        }
        break;
    }
    // eslint-disable-next-line
  }, [phase]);
  return (
    <>
      <audio src={`/chime.wav`} ref={audioRef} />
      <AudioButton />
    </>
  );
};
