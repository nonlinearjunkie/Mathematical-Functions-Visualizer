class GaussianFunctions extends Function {
  constructor(functionName, mean, standardDeviation) {
    super(functionName);
    this.mean = mean;
    this.standardDeviation = standardDeviation;
  }

  //X-axis
  /*We only need 1st quadrant and 2nd quadrant as probability values can never be negative */
  drawXAxis() {
    var canvas = document.querySelector("canvas");
    console.log(canvas);
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();
    cntxt.moveTo(0, canvas.height - 50);
    cntxt.lineTo(canvas.width, canvas.height - 50);
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

  createMeanSliderDiv(
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
      self.mean = this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  createStandardDeviationSliderDiv(
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
      self.standardDeviation = this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  plotPoints() {
    var canvas = document.querySelector("canvas");
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();

    for (let i = -(canvas.width / 10); i < canvas.width / 10; i += 0.1) {
      let x_cord = i;
      //Scale the points
      let xCordScaled = x_cord * 5;
      //Translate the points so that (0,0) lies at mid bottom
      let xCordTranslated = canvas.width / 2 + xCordScaled;

      let variance = this.standardDeviation ** 2;

      let amplitude = 1 / Math.sqrt(2 * Math.PI * variance); // (1/sigma *(sqrt(2*pi)))

      let exponentNumerator = -((i - this.mean) ** 2);
      let expoentDenominator = 2 * variance;
      let exponent = exponentNumerator / expoentDenominator;
      let y_cord = amplitude * Math.E ** exponent;

      let yCordScaled = y_cord * 1000; //Multiply heavily as the results are probabilities are very low
      let yCordTranslated = canvas.height - 50 - yCordScaled;
      cntxt.lineTo(xCordTranslated, yCordTranslated);
    }

    cntxt.strokeStyle = "black";
    cntxt.stroke();
  }

  renderPlot() {
    this.renderPlotOutline();

    let meanSliderDiv = this.createMeanSliderDiv(
      -20,
      20,
      1,
      this.mean,
      "mean-gaussian",
      "Set Mean"
    );

    let standardDeviationSliderDiv = this.createStandardDeviationSliderDiv(
      0,
      20,
      1,
      this.standardDeviation,
      "sd-gaussian",
      "Set Standard Deviation"
    );

    let sliderDivArray = [meanSliderDiv, standardDeviationSliderDiv];

    this.showSliders(sliderDivArray);

    this.plotPoints();
  }
}
