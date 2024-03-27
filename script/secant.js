function calculateSecant() {
  // Show the computation and table sections
  document.getElementById("computationSection").style.display = "block";
  document.getElementById("sectionTable").style.display = "block";
  // Get initial values from input fields
  let x0 = parseFloat(document.getElementById("x0-initial").value);
  let x1 = parseFloat(document.getElementById("x1-initial").value);
  let formula = document.getElementById("formula").value;
  let tolerance = parseFloat(document.getElementById("tolerance").value);

  // Clear previous results and computations
  document.querySelector(".table-group-divider").innerHTML = "";
  document.querySelector(".fxFormula").innerHTML = "";
  document.querySelector(".x2Formula").innerHTML = "";

  // Display function formula
  document.querySelector(".fxFormula").innerHTML += `
          <p>$$f(x) = ${formula}$$</p>
      `;

  // Initialize variables
  let xn_minus_1 = x1;
  let xn_minus_2 = x0;
  let f_xn_minus_1 = eval(formula.replace(/x/g, `(${x1})`));
  let f_xn_minus_2 = eval(formula.replace(/x/g, `(${x0})`));

  // Display initial values
  document.querySelector(".x2Formula").innerHTML += `
          <p>Initial values:</p>
          <p>$$x_0 = ${x0.toFixed(6)}$$</p>
          <p>$$x_1 = ${x1.toFixed(6)}$$</p>
          <br>
      `;

  // Append initial values to the table
  document.querySelector(".table-group-divider").innerHTML += `
            <tr>
                <td>0</td>
                <td>${x0.toFixed(6)}</td>
                <td>${eval(formula.replace(/x/g, `(${x0})`)).toFixed(6)}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>1</td>
                <td>${x1.toFixed(6)}</td>
                <td>${eval(formula.replace(/x/g, `(${x1})`)).toFixed(6)}</td>
                <td>-</td>
            </tr>
        `;

  // Iterate and calculate Secant Method
  let i = 2; // Start iteration from 2
  while (true) {
    // Calculate xn
    let xn =
      xn_minus_1 -
      (f_xn_minus_1 * (xn_minus_1 - xn_minus_2)) /
        (f_xn_minus_1 - f_xn_minus_2);
    let f_xn = eval(formula.replace(/x/g, `(${xn})`));
    let dx = Math.abs(xn_minus_1 - xn_minus_2);

    // Append results to the table
    document.querySelector(".table-group-divider").innerHTML += `
              <tr>
                  <td>${i}</td>
                  <td>${xn.toFixed(6)}</td>
                  <td>${f_xn.toFixed(6)}</td>
                  <td>${(xn_minus_1 - xn_minus_2).toFixed(6)}</td>
              </tr>
          `;

    // Display iteration computation
    document.querySelector(".x2Formula").innerHTML += `
              <p>Iteration ${i}:</p>
              <p>$$x_${i} = x_{${i - 1}} - f(x_{${i - 1}}) \\cdot \\frac{{x_{${
      i - 1
    }} - x_{${i - 2}}}}{{f(x_{${i - 1}}) - f(x_{${i - 2}})}}$$</p>
              <p>$$x_${i} = ${xn.toFixed(6)}$$</p>
              <p>$$f(x_${i}) = ${f_xn.toFixed(6)}$$</p>
              <p>$$|x_${i} - x_{${i - 1}}| = ${dx.toFixed(6)}$$</p>
              <br>
          `;

    // Check convergence condition
    if (dx < tolerance || i >= 100) {
      document.querySelector(".approximateRoot").textContent = xn.toFixed(6);
      break; // Exit the loop if convergence is achieved or maximum iterations reached
    }

    // Update variables for the next iteration
    xn_minus_2 = xn_minus_1;
    xn_minus_1 = xn;
    f_xn_minus_2 = f_xn_minus_1;
    f_xn_minus_1 = f_xn;

    i++; // Increment iteration count
  }

  // Update MathJax
  MathJax.typeset();

  // Update the approximate root
}

// Event listener for the Calculate button
document
  .getElementById("calculateButton")
  .addEventListener("click", calculateSecant);
