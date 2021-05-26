//Algebraic Functions SubClasses
let constantAlgebraicObj = new Constant("Constant", 10);
let linearAlgebraicObj = new Linear("Linear", 1, 10);
let quadraticAlgebraicObj = new Quadratic("Quadratic", 4, 5, 6);
let cubicAlgebraicObj = new Cubic("Cubic", 4, 5, 6, 9);

//Algebraic Function Object with  SubClasses

let algebraicFcnObj = new AlgebraicFunctions("Algebraic", [
  constantAlgebraicObj,
  linearAlgebraicObj,
  quadraticAlgebraicObj,
  cubicAlgebraicObj,
]);

//Trigonometric Functions SubClasses
let sineObj = new SineFunction("sine", 10, 0.1, 0, -5);
let cosineObj = new CosineFunction("cosine", 10, 0.1, 0, 0);
let tangentObj = new TangentFunction("tangent", 10, 0.05, 0, 0);

//Trigonometric Function Object with  SubClasses

let trigonometricFcnObj = new TrigonoMetricFunctions("Trigonometric", [
  sineObj,
  cosineObj,
  tangentObj,
]);

//Trigonometric Functions SubClasses
let sinhObj = new SinhFunction("sinh", 1, 0.1);
let coshObj = new CoshFunction("cosh", 1, 0.1);
let tanhObj = new TanhFunction("tanh", 1);

//Hyperbolic Function Object with  SubClasses
let hyperbolicFcnObj = new HyperbolicFunctions("Hyperbolic", [
  sinhObj,
  coshObj,
  tanhObj,
]);

let exponentialFcnObj = new ExponentialFunctions("Exponential", 2);
let logarithmicFcnObj = new LogarithmicFunctions("Logarithmic", 2);

let gaussianFunctionObj = new GaussianFunctions("Gaussian PDF", 10, 6);

let homeDisplayObj = new HomeDisplay([
  algebraicFcnObj,
  trigonometricFcnObj,
  hyperbolicFcnObj,
  exponentialFcnObj,
  logarithmicFcnObj,
  gaussianFunctionObj,
]);

homeDisplayObj.dispayFunctionTypes();
