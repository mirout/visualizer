import { BubbleSortStarter } from "./visualizers/bubble-sort/start";
import { BubbleSortRender } from "./visualizers/bubble-sort/render";
import { useVisualizer } from "./lib/hooks";
import { useEffect, useState } from "react";

const App = () => {
  const {curState, curEvent, events, currentStep, start, next} = useVisualizer();
  const [eventOverride, setEventOverride] = useState<number | undefined>(undefined);
  const curEventOverride = eventOverride !== undefined ? events[eventOverride] : curEvent;
  const curStateOverride = eventOverride !== undefined ? events[eventOverride].state : curState;
  const doNext = () => {
    if (eventOverride !== undefined && eventOverride < events.length - 1) {
      setEventOverride(eventOverride + 1);
    } else {
      next();
      setEventOverride(undefined);
    }
  };
  const doPrev = () => {
    if(eventOverride === undefined) {
      setEventOverride(currentStep - 2);
    } else if (eventOverride > 0) {
      setEventOverride(eventOverride - 1);
    }
  }
  useEffect(() => {
    // key listeners
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        doNext();
      }
      if (e.key === "ArrowLeft") {
        doPrev();
      }
    };
    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [eventOverride, currentStep]);

  return <div>
    <h1>Visualizer</h1>
    <h2>Current Step: {currentStep}</h2>
    <button onClick={doNext}>Next</button>
    <button onClick={doPrev}>Prev</button>
    <button onClick={() => setEventOverride(undefined)}>Reset</button>
    <button onClick={() => setEventOverride(0)}>Beginning</button>
    <button onClick={() => setEventOverride(events.length - 1)}>End</button>
    <small>Use arrow keys to navigate</small>
    <BubbleSortStarter doStart={start}/>
    <BubbleSortRender curState={curStateOverride} curEvent={curEventOverride}/>
    <div>
      {events && events.map((x, i) => {
        return <div key={i}>
          {i === eventOverride ? "OVERRIDE" : ""}
          {i === currentStep - 1 ? "CUR" : ""}
          {JSON.stringify(x)}
          <button onClick={() => setEventOverride(i)}>Jump</button>
          </div>;
      })}
    </div>
  </div>;
};

export default App;
