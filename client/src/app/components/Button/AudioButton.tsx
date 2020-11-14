import React, { useState } from 'react';
import { VolumeMuteFill, VolumeUpFill } from 'react-bootstrap-icons';

const audioAllowed = () => localStorage.getItem('allowAudio') !== 'false';

const iconClass = 'text-2xl';

export const AudioButton: React.FC = () => {
  const [dummy, setDummy] = useState(Date.now());
  return (
    <div className="fixed" style={{ right: '4px', bottom: '32px' }}>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem('allowAudio', audioAllowed() ? 'false' : 'true');
          setDummy(Date.now());
        }}
      >
        {audioAllowed() ? (
          <VolumeUpFill className={iconClass} />
        ) : (
          <VolumeMuteFill className={iconClass} />
        )}
      </button>
    </div>
  );
};
