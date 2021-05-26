//parent Class for Inheriting all Function Types

class Function {
  constructor(functionName, functionObjectsArray) {
    this.functionName = functionName;
    this.functionObjectsArray = functionObjectsArray;
  }

  //render all the sub-classes of functions
  renderFunctionTypes() {
    console.log(this.functionName + " Functions Types");
    let contentsArray = this.functionObjectsArray;
    let mainContainer = document.getElementById("container");
    mainContainer.innerHTML = ""; //Empty the section container
    let functionObjectsContainer = document.createElement("div");
    let functionObjectsList = document.createElement("ul");

    functionObjectsList.setAttribute("class", " function-types-ul clearfix");

    mainContainer.appendChild(functionObjectsContainer);
    functionObjectsContainer.appendChild(functionObjectsList);

    contentsArray.forEach(function (fcnObject) {
      console.log(fcnObject.functionName);
      let fcnObjectElement = document.createElement("li");
      fcnObjectElement.setAttribute("class", "function-type-li left");
      fcnObjectElement.innerText = fcnObject.functionName;
      functionObjectsList.appendChild(fcnObjectElement);
      fcnObjectElement.addEventListener(
        "click",
        fcnObject.renderPlot.bind(fcnObject)
      );
    });
  }
}
