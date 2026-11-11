import React from 'react';
import {Composition} from 'remotion';
import {MainVideo} from './MainVideo';

export const Root: React.FC = () => (
  <Composition
    id="NgulikKelistrikan"
    component={MainVideo}
    durationInFrames={1800}
    fps={30}
    width={1080}
    height={1920}
  />
);
