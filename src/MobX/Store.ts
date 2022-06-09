import { computed, flow, action, makeObservable, observable } from 'mobx';
import axios from 'axios';

export default class Store {

  url: string = 'https://gist.githubusercontent.com/low-sky/bec36274c4bf28619e503e2ae6a59d3a/raw/5dbc063e0a954a88df283a046f996c586ad20fb6/EgyptCities.csv';

  values: string[][] = [];

  focus: number[] = [-1, -1];

  constructor() {

    makeObservable(this, {

      values: observable,
      focus: observable,
      fetchUrl: flow,
      toggleFocus: action,
      setValues: action,
      setFocus: action,
      distance: computed,
      averagePopulation: computed,
      normalizedPopulation: computed
      
    })

  }

  setValues(a: string[][]) {

    this.values = a;

  }

  setFocus(a: number[]) {

    this.focus = a;

  }

  get averagePopulation() {

    let sum: number = 0;

    for (const value of this.values) {

      sum += parseInt(value[3]);
    }

    return sum / this.values.length;
  }
  
  get normalizedPopulation() {

    let result = store.values.map((value: any, index) => {

      console.log((1 / 100000) * (this.averagePopulation + (value[3] - this.averagePopulation) / 3))

      return (1 / 100000) * (this.averagePopulation + (value[3] - this.averagePopulation) / 2);

    });

    return result;
  }

  get distance() {

    if (this.focus.includes(-1)) return 0;

    const lat1: number = parseInt(this.values[this.focus[0]][1]);
    const lat2: number = parseInt(this.values[this.focus[1]][1]);
    const lon1: number = parseInt(this.values[this.focus[0]][2]);
    const lon2: number = parseInt(this.values[this.focus[1]][2]);
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d / 1000;

  }

  *fetchUrl() {

    yield axios.get(this.url)
      .then(res => this.setValues(res.data.split('\n').map((str: string) => str.split(',')).slice(1)))
      .catch((err: Error) => console.error(err));
  }



  toggleFocus(index: number) {

    let newFocus = this.focus;

    if (this.focus.includes(index)) {

      newFocus[this.focus.indexOf(index)] = -1;

    } else if (this.focus[1] === -1){

      newFocus[1] = index;

    } else {

      newFocus.shift();
      newFocus.push(index);

    }

    this.setFocus(newFocus);

  }
}

export const store = new Store();