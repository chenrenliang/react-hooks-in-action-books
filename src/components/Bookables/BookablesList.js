import { useState } from "react";
import { bookables, sessions, days } from "../../static.json";
import { FaArrowRight } from "react-icons/fa";

export default function BookablesList() {
  const [group, setGroup] = useState("Kit");
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  const [bookableIndex, setBookableIndex] = useState(0);
  const groups = [...new Set(bookables.map((b) => b.group))];

  const bookable = bookablesInGroup[bookableIndex];
  const [hasDetails, setHasDetails] = useState(false);

  function nextBookable() {
    setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
  }

  function changeGroup(event) {
    setGroup(event.target.value);
    setBookableIndex(0);
  }

  return (
    <>
      <div>
        <select value={group} onChange={changeGroup}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => {
            return (
              <li
                key={b.id}
                className={i === bookableIndex ? "selected" : null}
              >
                <button className="btn" onClick={() => setBookableIndex(i)}>
                  {b.title}
                </button>
              </li>
            );
          })}
        </ul>
        <p>
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={() => setHasDetails((has) => !has)}
                  />
                  show details
                </label>
              </span>
            </div>

            <p>{bookable.notes}</p>
            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>

                  <ul>
                    {bookable.sessions.map((s) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
