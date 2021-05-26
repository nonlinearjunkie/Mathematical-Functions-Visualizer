class ExponentialFunctions extends Function {
  constructor(functionName, base) {
    super(functionName);
    this.base = base; //base of the power
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

  createBaseValueSliderDiv(
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
      self.base = this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  plotPoints() {
    var canvas = document.querySelector("canvas");
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();

    //The very high base and very low base will have high values of extreme points. To fit the points, we scale them heavily
    if (this.base >= 4 || this.base <= 0.3) {
      for (let i = -canvas.width / 60; i < canvas.width / 60; i += 0.01) {
        let x_cord = i;
        //Scale the points
        let xCordScaled = x_cord * 30;
        //Translate the points so that (0,0) lies at centre
        let xCordTranslated = canvas.width / 2 + xCordScaled;

        let y_cord = this.base ** i;

        let yCordScaled = y_cord * 0.001;
        let yCordTranslated = canvas.height / 2 - yCordScaled;
        cntxt.lineTo(xCordTranslated, yCordTranslated);
      }
    } else {
      for (let i = -canvas.width / 40; i < canvas.width / 40; i += 0.1) {
        let x_cord = i;
        //Scale the points
        let xCordScaled = x_cord * 20;
        //Translate the points so that (0,0) lies at centre
        let xCordTranslated = canvas.width / 2 + xCordScaled;

        let y_cord = this.base ** i;

        let yCordScaled = y_cord * 0.01;
        let yCordTranslated = canvas.height / 2 - yCordScaled;
        cntxt.lineTo(xCordTranslated, yCordTranslated);
      }
    }

    cntxt.strokeStyle = "black";
    cntxt.stroke();
  }

  renderPlot() {
    this.renderPlotOutline();

    let baseValueSliderDiv = this.createBaseValueSliderDiv(
      0.1,
      5,
      0.1,
      this.base,
      "expoential-base",
      "Set Exponential Base"
    );

    let sliderDivArray = [baseValueSliderDiv];

    this.showSliders(sliderDivArray);

    this.plotPoints();
  }
}
