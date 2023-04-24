import { useDispatch } from "react-redux";
import { playPause } from "../../store";

export function PlayPauseButton() {
  // j'utilise le hooks useDispatch dans notre composant pour récupérer la fonction dispatch de redux
  const dispatch = useDispatch();

  return (
    <button
    className="button"
      onClick={() => {
        // au clique sur le boutton on exécute la focntion
        // dispatch avec une 'action' de mon 'store'
        dispatch(playPause());
      }}
    >
      Pause / Rprendre{" "}
    </button>
  );
}
