import React from 'react';
import MainInvitation from '../invitation/MainInvitation';

const PreviewFrame = ({ config }) => {
  return (
    <div className="relative w-[375px] h-[750px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-neutral-800 overflow-hidden transform scale-90 md:scale-100 transition-transform">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-neutral-800 rounded-b-2xl z-50"></div>
      
      {/* Invitation Content */}
      <div className="w-full h-full overflow-hidden">
        <MainInvitation config={config} />
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-neutral-800/20 rounded-full z-50"></div>
    </div>
  );
};

export default PreviewFrame;
