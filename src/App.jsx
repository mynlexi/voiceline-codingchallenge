import { useState } from "react";
import "./App.css";
import Recorder from "react-mp3-recorder";
import blobToBuffer from "blob-to-buffer";
import ReactAudioPlayer from "react-audio-player";
import { Trash, Play, Save } from "react-feather";

const initalAudioFiles = [
  {
    url: "https://goldfirestudios.com/proj/howlerjs/sound.ogg",
    name: "ogg sample",
  },
  {
    url: "https://sampleswap.org/samples-ghost/VOCALS%20and%20SPOKEN%20WORD/Voicemail%20Messages/565[kb]phone-message-jacko-its-pete.mp3.mp3",
    name: "mp3 sample",
  },
];

function App() {
  const [autoPlay, setAutoPlay] = useState(false);
  const [audioFiles, setAudioFiles] = useState(initalAudioFiles);
  const [audioUrl, setAudioUrl] = useState(initalAudioFiles[0]);
  const [input, setInput] = useState("");

  //functions for the Audio Recorder
  function _onRecordingComplete(blob) {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("recording", blob);
      setAudioUrl({
        //window.URL.createObjectURL saves the file in the browser and adds a URL to easily access it
        url: window.URL.createObjectURL(blob),
      });
      setAutoPlay(false);
    });
  }

  function _onRecordingError(err) {
    console.log("error recording", err);
    if (audioUrl) {
      //window.URL.revoke deletes the saved file from the browser and its corresponding url
      window.URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl({ url: "" });
  }

  //functions for saving/deleting Files to/from local state
  function saveFile(url) {
    setAudioFiles(audioFiles.concat(url));
    // by immediatly setting the (same) url object we swap the name with the input field
    setAudioUrl(url);
  }

  function deleteAndRevoke(url) {
    setAudioFiles(audioFiles.filter((el) => el.url !== url));
    window.URL.revokeObjectURL(url);
  }

  //enables autoplay when a saved file is clicked
  function setAndPlay(url) {
    setAudioUrl(url);
    setAutoPlay(true);
  }

  return (
    <div className="App">
      <div className="main">
        <div className="flex">
          <div>
            <p>press and hold to record</p>
            <Recorder
              onRecordingComplete={_onRecordingComplete}
              onRecordingError={_onRecordingError}
            />
          </div>
          <br />
          {audioUrl.name ? (
            <h2>{audioUrl.name}</h2>
          ) : (
            <div className="name-input-container">
              <label> Name of your file</label>
              <input
                type="name"
                placeholder="Your filename"
                value={input}
                onInput={(e) => setInput(e.target.value)}
              />
              <button
                onClick={() => saveFile({ url: audioUrl.url, name: input })}
              >
                {/* eslint-disable-next-line react/style-prop-object */}
                <Save size={20} />
              </button>
            </div>
          )}

          <div>
            <ReactAudioPlayer
              src={audioUrl.url}
              controls
              autoPlay={autoPlay}
              style={{
                minWidth: "500px",
              }}
            />
          </div>
        </div>

        <table className="files-container">
          {audioFiles.map((el, idx) => (
            <tr key={idx}>
              <td>
                <button
                  onClick={() => setAndPlay({ url: el.url, name: el.name })}
                >
                  <Play />
                </button>
              </td>
              <td style={{ minWidth: "200px" }}>{el.name}</td>
              <td>
                <button onClick={() => deleteAndRevoke(el.url)}>
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App;
