class HomeDisplay {
  constructor(functionTypesArray) {
    this.functionTypesArray = functionTypesArray; //array to store objects of each Function Type
  }

  dispayFunctionTypes() {
    let mainContainer = document.getElementById("container");
    let functionTypesContainer = document.createElement("div");
    let functionTypesList = document.createElement("ul");

    functionTypesList.setAttribute("class", " function-types-ul clearfix");

    mainContainer.appendChild(functionTypesContainer);
    functionTypesContainer.appendChild(functionTypesList);

    this.functionTypesArray.forEach(function (functionTypeObj) {
      console.log(functionTypeObj.functionName);
      let functionTypeElement = document.createElement("li");
      functionTypeElement.setAttribute("class", "function-type-li left");
      functionTypeElement.innerText = functionTypeObj.functionName;
      functionTypeElement.addEventListener("click", function () {
        console.log(functionTypeObj);

        if (functionTypeObj.functionObjectsArray !== undefined) {
          //render subclasses of a Function Type if it has subclasses
          functionTypeObj.renderFunctionTypes();
        } else {
          //directly render the plot of a function type if it does not have subclasses
          functionTypeObj.renderPlot();
        }
      });
      functionTypesList.appendChild(functionTypeElement);
    });
  }
}
