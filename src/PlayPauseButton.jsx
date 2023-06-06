// on import useDispatch depuis react-redux
import { useStore } from "react-redux";
import { autoplay } from "./store";

export function PlayPauseButton() {
  const store = useStore();

  return (
    <button
      className="button"
      onClick={() => {
        autoplay(store);
      }}
    >
      Pause / Reprendre
    </button>
  );
}
