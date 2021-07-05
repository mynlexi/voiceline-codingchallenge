# Objectives

## Pulling Voicefiles and playing them
  -> using react-audio-player
## Use Recorder Libary to Record Voice and play it
  -> using react-mp3-recorder 
## Notes
If I were to do it all over again I would not use react-mp3-player. This package only goes up to version 16 of react and requires a huge dependency tree. 

I also would set up my functions differently to not entangle so many state values and potential components with each other. My current code is hard to refactor (& put some values in context) and read through. Very intermingled. 

On the other side, at this size putting files into components is probably more trouble than its worth. 

