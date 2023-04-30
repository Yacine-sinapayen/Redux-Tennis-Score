import { useSelector } from "react-redux";
// Logique de gestion du score
import { selectDisplayText } from "../../selectors/selectors";

export function Display() {
  // Logique de gestion du score
  const displayText = useSelector(selectDisplayText);

  return <p className="display">{displayText}</p>
 
}
