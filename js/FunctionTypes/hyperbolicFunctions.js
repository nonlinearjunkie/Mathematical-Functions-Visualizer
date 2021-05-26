class HyperbolicFunctions extends Function {
  constructor(functionName, functionObjectsArray) {
    super(functionName, functionObjectsArray);
  }
}

class HyperbolicFunctionType {
  constructor(functionName, amplitude, frequency) {
    this.functionName = functionName;
    this.A = amplitude;
    this.frequency = frequency;
    let angularFrequency = (2 * Math.PI * this.frequency).toFixed(2);
    this.b = angularFrequency;
  }

  //X-axis
  drawXAxis() {
    var canvas = document.querySelector("canvas");
    console.log(canvas);
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();
    cntxt.moveTo(0, canvas.height / 2);
    cntxt.lineTo(canvas.width, canvas.height / 2);
    cntxt.strokeStyle = "#FF0000";
    cntxt.stroke();
  }

  //Y-axis
  drawYAxis() {
    var canvas = document.querySelector("canvas");
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();
    cntxt.moveTo(canvas.width / 2, 0);
    cntxt.lineTo(canvas.width / 2, canvas.height);
    cntxt.strokeStyle = "#FF0000";
    cntxt.stroke();
  }

  //layout of the plot
  renderPlotOutline() {
    let mainContainer = document.getElementById("container");
    mainContainer.setAttribute("class", "clearfix");
    let plotContainer = document.createElement("div");
    plotContainer.setAttribute("class", "plot-container left");
    mainContainer.innerHTML = "";

    let plotContainerHeading = document.createElement("div");
    plotContainerHeading.setAttribute("class", "plotHeading");
    plotContainerHeading.innerHTML = `<h3> Plot of ${this.functionName} Function</h3>`;
    plotContainer.appendChild(plotContainerHeading);

    let plotDiv = document.createElement("div");
    let canvasElement = document.createElement("canvas");
    canvasElement.width = 700;
    canvasElement.height = 700;

    plotDiv.appendChild(canvasElement);
    plotContainer.appendChild(plotDiv);

    plotDiv.setAttribute("class", "plot-div");
    mainContainer.appendChild(plotContainer);

    this.drawXAxis();
    this.drawYAxis();
  }

  showSliders(sliderDivArray) {
    let mainContainer = document.getElementById("container");
    let sliderContainer = document.createElement("div");
    sliderContainer.setAttribute("class", "slider-container left");

    let sliderHeading = document.createElement("div");
    sliderHeading.setAttribute("class", "sliderHeading");
    sliderHeading.innerHTML = `<h3> Slider Controls</h3>`;
    sliderContainer.appendChild(sliderHeading);

    sliderDivArray.forEach(function (sliderDiv) {
      sliderContainer.appendChild(sliderDiv);
    });

    mainContainer.appendChild(sliderContainer);

    console.log("Show Slider called");
  }

  //Method to create Info about SLider-name and value
  //Takes name for slider and associated property(Value of object property associated with slider)

  createSliderInfo(sliderName, associatedProperty) {
    let sliderDivInfo = document.createElement("div"); //container for slider heading and value
    sliderDivInfo.setAttribute("class", "slider-div-info clearfix");

    let sliderDivHeading = document.createElement("div");
    sliderDivHeading.innerHTML = `<h4>${sliderName}</h4>`;
    sliderDivHeading.setAttribute("class", "slider-div-heading left");
    sliderDivInfo.appendChild(sliderDivHeading);

    let silderDivValue = document.createElement("div");
    silderDivValue.innerHTML = `<p> Value: ${associatedProperty}`;
    silderDivValue.setAttribute("class", "slider-div-value left");
    sliderDivInfo.appendChild(silderDivValue);

    return sliderDivInfo;
  }

  //method to create slider Input
  createSliderElement(id, minValue, maxValue, stepSize, associatedProperty) {
    let sliderInput = document.createElement("input");
    sliderInput.setAttribute("class", "slider");
    sliderInput.setAttribute("type", "range");
    sliderInput.setAttribute("id", id);
    sliderInput.setAttribute("min", minValue);
    sliderInput.setAttribute("max", maxValue);
    sliderInput.setAttribute("step", stepSize);
    sliderInput.setAttribute("value", associatedProperty);

    return sliderInput;
  }

  //method to create slider Block for controlling amplitude of trigonometric Functions

  createAmplitudeSliderDiv(
    minValue,
    maxValue,
    stepSize,
    associatedProperty,
    id,
    sliderName
  ) {
    let self = this;

    let sliderDiv = document.createElement("div");
    sliderDiv.setAttribute("class", "slider-div");

    let sliderDivInfo = this.createSliderInfo(sliderName, associatedProperty);
    sliderDiv.appendChild(sliderDivInfo);

    let sliderInput = this.createSliderElement(
      id,
      minValue,
      maxValue,
      stepSize,
      associatedProperty
    );
    sliderDiv.appendChild(sliderInput);
    sliderInput.onchange = function () {
      self.A = this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  //method to create slider Block for controlling Frequency of trigonometric Functions

  createFrequencySliderDiv(
    minValue,
    maxValue,
    stepSize,
    associatedProperty,
    id,
    sliderName
  ) {
    let self = this;

    let sliderDiv = document.createElement("div");
    sliderDiv.setAttribute("class", "slider-div");

    let sliderDivInfo = this.createSliderInfo(sliderName, associatedProperty);
    sliderDiv.appendChild(sliderDivInfo);

    let sliderInput = this.createSliderElement(
      id,
      minValue,
      maxValue,
      stepSize,
      associatedProperty
    );
    sliderDiv.appendChild(sliderInput);
    sliderInput.onchange = function () {
      self.frequency = this.value;
      self.b = 2 * Math.PI * this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }
}

// Class for Sine wave Equation
//General Sine Wave eqn: y=A*sin(b(x+h))+k

class SinhFunction extends HyperbolicFunctionType {
  constructor(functionName, amplitude, frequency, phaseShift, verticalShift) {
    super(functionName, amplitude, frequency, phaseShift, verticalShift);
  }

  plotPoints() {
    //assign properties to variables ( y=A*sinh(bx))
    let A = this.A;
    let b = this.b;

    this.renderPlotOutline();

    var canvas = document.querySelector("canvas");
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();

    for (let i = -canvas.width / 20; i < canvas.width / 20; i += 0.1) {
      let x_cord = i;
      //Scale the points
      let xCordScaled = x_cord * 10;
      //Translate the points so that (0,0) lies at centre
      let xCordTranslated = canvas.width / 2 + xCordScaled;

      let y_cord = A * Math.sinh(b * i);
      let yCordScaled = y_cord * 10;
      let yCordTranslated = canvas.height / 2 - yCordScaled;

      cntxt.lineTo(xCordTranslated, yCordTranslated);
    }

    cntxt.strokeStyle = "black";
    cntxt.stroke();
  }

  renderPlot() {
    this.renderPlotOutline();
    this.plotPoints();

    let amplitudeSliderDiv = this.createAmplitudeSliderDiv(
      -10,
      10,
      1,
      this.A,
      "amplitude-sinh",
      "Set Amplitude"
    );

    let frequencySliderDiv = this.createFrequencySliderDiv(
      0,
      3,
      0.1,
      this.frequency,
      "frequency-sinh",
      "Set Frequency"
    );

    let sliderDivArray = [amplitudeSliderDiv, frequencySliderDiv];

    this.showSliders(sliderDivArray);
  }
}

// Class for cosh Equation
//General cosh eqn: y=A*cosh(bx)

class CoshFunction extends HyperbolicFunctionType {
  constructor(functionName, amplitude, frequency) {
    super(functionName, amplitude, frequency);
  }

  plotPoints() {
    //assign properties to variables ( y=A*sinh(bx))
    let A = this.A;
    let b = this.b;

    this.renderPlotOutline();

    var canvas = document.querySelector("canvas");
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();

    //Scaling factor is high for X-axis and very low for Y-axis because the Y-values are very high for large values of x
    for (let i = -canvas.width / 40; i < canvas.width / 40; i += 0.01) {
      let x_cord = i;
      //Scale the points
      let xCordScaled = x_cord * 20;
      //Translate the points so that (0,0) lies at centre
      let xCordTranslated = canvas.width / 2 + xCordScaled;

      let y_cord = A * Math.cosh(b * i);
      let yCordScaled = y_cord * 0.001;
      let yCordTranslated = canvas.height / 2 - yCordScaled;

      cntxt.lineTo(xCordTranslated, yCordTranslated);
    }

    cntxt.strokeStyle = "black";
    cntxt.stroke();
  }

  renderPlot() {
    this.renderPlotOutline();
    this.plotPoints();

    let amplitudeSliderDiv = this.createAmplitudeSliderDiv(
      -10,
      10,
      1,
      this.A,
      "amplitude-cosh",
      "Set Amplitude"
    );

    let frequencySliderDiv = this.createFrequencySliderDiv(
      0,
      0.3,
      0.01,
      this.frequency,
      "frequency-cosh",
      "Set Frequency"
    );

    let sliderDivArray = [amplitudeSliderDiv, frequencySliderDiv];

    this.showSliders(sliderDivArray);
  }
}

// Class for tanhh Equation
//General tanh eqn: y=A*tanh(bx)

class TanhFunction extends HyperbolicFunctionType {
  constructor(functionName, amplitude) {
    super(functionName, amplitude);
  }

  plotPoints() {
    //assign properties to variables ( y=A*tanh(bx))
    let A = this.A;

    this.renderPlotOutline();

    var canvas = document.querySelector("canvas");
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();

    for (let i = -canvas.width / 20; i < canvas.width / 20; i += 0.1) {
      let x_cord = i;
      //Scale the points
      let xCordScaled = x_cord * 10;
      //Translate the points so that (0,0) lies at centre
      let xCordTranslated = canvas.width / 2 + xCordScaled;

      let y_cord = A * Math.tanh(i);
      let yCordScaled = y_cord * 10;
      let yCordTranslated = canvas.height / 2 - yCordScaled;

      cntxt.lineTo(xCordTranslated, yCordTranslated);
    }

    cntxt.strokeStyle = "black";
    cntxt.stroke();
  }

  renderPlot() {
    this.renderPlotOutline();
    this.plotPoints();

    let amplitudeSliderDiv = this.createAmplitudeSliderDiv(
      -15,
      15,
      1,
      this.A,
      "amplitude-tanh",
      "Set Amplitude"
    );

    let sliderDivArray = [amplitudeSliderDiv];

    this.showSliders(sliderDivArray);
  }
}
