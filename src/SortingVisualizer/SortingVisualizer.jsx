import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
let NUMBER_OF_ARRAY_BARS = 100;


// This is the main color of the array bars.
const PRIMARY_COLOR = '#00abfa';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#ed2cff';


export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 630));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  getSlider() {
    const slider = document.getElementById('arraySizeSlider');
    NUMBER_OF_ARRAY_BARS = slider.value;
    this.resetArray();
  }

  changeArraySize(sliderValue) {
    NUMBER_OF_ARRAY_BARS = sliderValue;
    this.resetArray();
  }

  render() {
    const { array } = this.state;

    const arrayWidth = (window.screen.width / array.length) - 3.55;

    return (
      <div className="container">
        <div className="buttonGroup">
          <div className="slider-container">
            <p style={{ fontSize: '16px' }}>Array Size</p>
            <input onInput={() => this.changeArraySize(document.getElementById('arraySizeSlider').value)} defaultValue="100" type="range" min="10" max="200" className="slider" id="arraySizeSlider" />
          </div>
          <button onClick={() => this.resetArray()} className="button">Generate New Array</button>
          <button onClick={() => this.mergeSort()} className="button">Sort!</button>
          {/* <button onClick={() => this.quickSort()} className="button">Quick Sort</button>
          <button onClick={() => this.heapSort()} className="button">Heap Sort</button>
          <button onClick={() => this.bubbleSort()} className="button">Bubble Sort</button> */}
        </div>
        <br />
        <div className="array-container" id="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${arrayWidth}px`
              }}></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
