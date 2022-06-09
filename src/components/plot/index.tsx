import React from 'react';
import Plot from 'react-plotly.js';
import Store from '../../MobX/Store';
import { observer } from 'mobx-react';
import InfoCard from '../infoCard';

interface StoreProps{

  store: Store;
}

function ScatterPlot({ store }: StoreProps){

  const [color, setColor] = React.useState<string[]>(new Array<string>());

  React.useEffect(() => {

    store.fetchUrl();

  }, []);

  return (
    <div className="container">
      <div className="plot-container">
        <Plot
          data={[
            {
              x: store.values.map((value: string[]) => value[2]),
              y: store.values.map((value: string[]) => value[1]),
              type: 'scatter',
              mode: 'markers',
              marker: {
                size: store.values.length > 0 ? store.normalizedPopulation : 12,
                color: color
              },
            },
          ]}
          layout={{ width: 1000, height: 1000, xaxis: {title: 'Longitude (degrees)'}, yaxis: {title: 'Latitude (degrees)'}}}
          onClick={((event) => {

            store.toggleFocus(event.points[0].pointIndex);
            setColor(prev => {

              let current = new Array<string>();
              current[store.focus[0]] = 'red';
              current[store.focus[1]] = 'red';
              return current;

            });
          })}
        />
      </div>
      <div className="infoCard-list-container">
        {store.focus[0] >= 0 && <InfoCard information={store.values[store.focus[0]]} />}
        {store.focus[1] >= 0 && <InfoCard information={store.values[store.focus[1]]} />}
        {store.distance > 0 && <h3>Distance: {store.distance} km</h3>}
      </div>
    </div>
  );
};

export default observer(ScatterPlot);
