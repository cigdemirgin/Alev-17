import { useState } from "react";
import Fire from "./components/Fire";
import Torch from "./components/Torch";
import runBackgroundEffects from "./utilities/runBackgroundEffects";
import "./styles.css";

export default function App() {
  const [torchEquipped, setTorchEquipped] = useState(false);
  const [woodKindling, setWoodKindling] = useState(false);
  const [woodOnFire, setWoodOnFire] = useState(false);

 

  const [cursorPosition, setCursorPosition] = useState({ x: null, y: null });
  const kindleClass = woodKindling && !woodOnFire && "kindle";

  runBackgroundEffects(
    torchEquipped,
    woodOnFire,
    setWoodKindling,
    setWoodOnFire,
    setCursorPosition
  );

  let torchStyle = {
    position: "absolute",
    left: cursorPosition.x - 10,
    top: cursorPosition.y - 60,
  };
 
  function handleClick() {
    setTorchEquipped((pre) => !pre);
  }

  function handleTorchClick() {
    setTorchEquipped(false);
  }

  function handleKindle() {
    if (torchEquipped === true) {
      setWoodKindling(true);
    } else {
      setWoodKindling(false);
    }
  }

  function handleWood() {
    setWoodOnFire((pre) => !pre);
  }

  return (
    <div
      className={`wrapper ${torchEquipped && "relative no-cursor"}`}
      onMouseUp={handleTorchClick}
    >
      <div className={`game-area ${!torchEquipped && "relative"}`}>
        <div
          className={`torch-container ${torchEquipped && "torch-equipped"}`}
          style={torchEquipped ? torchStyle : null}
          onClick={handleClick}
        >
          <Torch />
        </div>

        <div
          className={`wood-container ${kindleClass}`}
          onMouseOver={handleKindle}
          onClick={handleWood}
        >
          🪵
          <Fire woodOnFire={woodOnFire} />
        </div>
      </div>
    </div>
  );
}
