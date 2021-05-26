class AlgebraicFunctions extends Function {
  constructor(functionName, functionObjectsArray) {
    super(functionName, functionObjectsArray);
  }
}

class AlgebraicFunctionType {
  constructor(functionName) {
    this.functionName = functionName;
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
    plotContainerHeading.innerHTML = `<h3> Plot of ${this.functionName} Algebraic Function</h3>`;
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

  renderPlot() {}
}

//Constant algebraic Function Eqn: y=c (c->Constant)
class Constant extends AlgebraicFunctionType {
  constructor(functionName, constantValue) {
    super(functionName);
    this.constant = constantValue;
  }

  createConstantValueSliderDiv(
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
      self.constant = this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  plotPoints() {
    var canvas = document.querySelector("canvas");
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();

    for (let i = -canvas.width / 2; i < canvas.width / 2; i += 0.1) {
      let x_cord = i;
      //Scale the points
      let xCordScaled = x_cord * 10;
      //Translate the points so that (0,0) lies at centre
      let xCordTranslated = canvas.width / 2 + xCordScaled;

      let y_cord = this.constant;
      let yCordScaled = y_cord * 10;
      let yCordTranslated = canvas.height / 2 - yCordScaled;

      cntxt.lineTo(xCordTranslated, yCordTranslated);
    }

    cntxt.strokeStyle = "black";
    cntxt.stroke();
  }

  renderPlot() {
    this.renderPlotOutline();

    let constantValueSliderDiv = this.createConstantValueSliderDiv(
      -20,
      20,
      1,
      this.constant,
      "amplitude-constant",
      "Set Constant Value"
    );

    let sliderDivArray = [constantValueSliderDiv];

    this.showSliders(sliderDivArray);

    this.plotPoints();
  }
}

//Linear Algebraic Function Eqn: y=mx+c (m->Slope c-> y-intercept)
class Linear extends AlgebraicFunctionType {
  constructor(functionName, slopeValue, yInterceptValue) {
    super(functionName);
    this.slope = slopeValue;
    this.yIntercept = -yInterceptValue;
  }

  createSlopeSliderDiv(
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
      self.slope = this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  createInterceptSliderDiv(
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
      self.yIntercept = -this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  plotPoints() {
    var canvas = document.querySelector("canvas");
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();

    //For loop with increment of 0.1 to make curve smoother
    for (let i = -canvas.width / 2; i < canvas.width / 2; i += 0.1) {
      let x_cord = i;
      //Scale the points
      let xCordScaled = x_cord * 10;
      //Translate the points so that (0,0) lies at centre
      let xCordTranslated = canvas.width / 2 + xCordScaled;

      let y_cord = this.slope * i - this.yIntercept;
      let yCordScaled = y_cord * 10;
      let yCordTranslated = canvas.height / 2 - yCordScaled;
      cntxt.lineTo(xCordTranslated, yCordTranslated);
    }
    cntxt.strokeStyle = "black";
    cntxt.stroke();
  }

  renderPlot() {
    this.renderPlotOutline();

    let slopeSliderDiv = this.createSlopeSliderDiv(
      -5,
      5,
      1,
      this.slope,
      "slope",
      "Set Slope"
    );

    let interceptSliderDiv = this.createInterceptSliderDiv(
      -20,
      20,
      1,
      -this.yIntercept,
      "y-intercept",
      "Set Y-Intercept"
    );

    let sliderDivArray = [slopeSliderDiv, interceptSliderDiv];

    this.showSliders(sliderDivArray);

    this.plotPoints();
  }
}

//Quadratic Algebraic Equation: y=ax**2+bx+c

class Quadratic extends AlgebraicFunctionType {
  constructor(functionName, a, b, c) {
    super(functionName);
    this.a = a;
    this.b = b;
    this.c = -c;
  }

  createASliderDiv(
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
      self.a = this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  createBSliderDiv(
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
      self.b = this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  createCSliderDiv(
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
      self.c = -this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  plotPoints() {
    var canvas = document.querySelector("canvas");
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();

    //For loop with increment of 0.1 to make curve smoother
    for (let i = -canvas.width / 2; i < canvas.width / 2; i += 0.1) {
      let x_cord = i;
      let xCordScaled = x_cord * 10;
      let xCordTranslated = canvas.width / 2 + xCordScaled * 10;
      let y_cord = this.a * i ** 2 + this.b * i - this.c;
      let yCordScaled = y_cord * 10;
      let yCordTranslated = canvas.height / 2 - yCordScaled;
      cntxt.lineTo(xCordTranslated, yCordTranslated);
    }
    cntxt.strokeStyle = "black";
    cntxt.stroke();
  }

  renderPlot() {
    this.renderPlotOutline();

    let ASliderDiv = this.createASliderDiv(
      -5,
      5,
      1,
      this.a,
      "a-quadratic",
      "Set a"
    );

    let BSliderDiv = this.createBSliderDiv(
      -5,
      5,
      1,
      this.b,
      "b-quadratic",
      "Set b"
    );

    let CSliderDiv = this.createCSliderDiv(
      -5,
      5,
      1,
      -this.c,
      "c-quadratic",
      "Set c"
    );

    let sliderDivArray = [ASliderDiv, BSliderDiv, CSliderDiv];

    this.showSliders(sliderDivArray);

    this.plotPoints();
  }
}

//Cubic Algebraic Equation: y=ax**3+bx**2+cx+d

class Cubic extends AlgebraicFunctionType {
  constructor(functionName, a, b, c, d) {
    super(functionName);
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = -d;
  }

  createASliderDiv(
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
      self.a = this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  createBSliderDiv(
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
      self.b = this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  createCSliderDiv(
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
      self.c = this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  createDSliderDiv(
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
      self.d = -this.value;
      self.renderPlot();
    };

    return sliderDiv;
  }

  plotPoints() {
    var canvas = document.querySelector("canvas");
    var cntxt = canvas.getContext("2d");
    cntxt.beginPath();

    //For loop with increment of 0.1 to make curve smoother
    for (let i = -canvas.width / 2; i < canvas.width / 2; i += 0.1) {
      let x_cord = i;
      //Scale the points
      let xCordScaled = x_cord * 10;
      //Translate the points so that (0,0) lies at centre
      let xCordTranslated = canvas.width / 2 + xCordScaled;

      let y_cord = this.a * i ** 3 + this.b * i ** 2 + this.c * i - this.d;
      let yCordScaled = y_cord * 5;
      let yCordTranslated = canvas.height / 2 - yCordScaled;
      cntxt.lineTo(xCordTranslated, yCordTranslated);
    }
    cntxt.strokeStyle = "black";
    cntxt.stroke();
  }

  renderPlot() {
    this.renderPlotOutline();

    let ASliderDiv = this.createASliderDiv(
      -5,
      5,
      1,
      this.a,
      "a-cubic",
      "Set a"
    );

    let BSliderDiv = this.createBSliderDiv(
      -5,
      5,
      1,
      this.b,
      "b-cubic",
      "Set b"
    );

    let CSliderDiv = this.createCSliderDiv(
      -5,
      5,
      1,
      this.c,
      "c-cubic",
      "Set c"
    );

    let DSliderDiv = this.createDSliderDiv(
      -5,
      5,
      1,
      -this.d,
      "d-cubic",
      "Set d"
    );

    let sliderDivArray = [ASliderDiv, BSliderDiv, CSliderDiv, DSliderDiv];

    this.showSliders(sliderDivArray);

    this.plotPoints();
  }
}
