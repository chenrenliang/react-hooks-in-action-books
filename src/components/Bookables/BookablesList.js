import { useState } from "react";
import { bookables } from "../../static.json";

export default function BookablesList() {
  const group = "Rooms";
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  const [bookableIndex, setBookableIndex] = useState(1);

  function changeBookable(selectedIndex) {
    bookableIndex = selectedIndex;
    console.log(selectedIndex);
  }

  return (
    <ul className="bookables items-list-nav">
      {bookablesInGroup.map((b, i) => {
        return (
          <li key={b.id} className={i === bookableIndex ? "selected" : null}>
            <button className="btn" onClick={() => setBookableIndex(i)}>
              {b.title}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
