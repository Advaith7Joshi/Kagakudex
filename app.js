// Load the JSON file using the fetch() method
fetch('elements.json')
  .then(response => response.json()) // Parse the JSON data
  .then(data => {
    // Create an HTML element for each element in the periodic table
    const periodicTable = document.getElementById('periodic-table');
    data.forEach(element => {
      const elementDiv = document.createElement('div');
      elementDiv.classList.add('element');
      elementDiv.innerHTML = `
        <div class="symbol">${element.symbol}</div>
        <div class="atomic-number">${element.atomicNumber}</div>
        <div class="name">${element.name}</div>
        <div class="discovery">Discovered ${element.yearDiscovered}</div>
        <br>
      `;
      periodicTable.appendChild(elementDiv);

      // Add event listener to display more information when element is clicked
      elementDiv.addEventListener('click', () => {
        displayElementInfo(element);
      });
    });
  })
  .catch(error => console.error(error)); // Handle any errors

function displayElementInfo(element) {
  // Create modal element and add content
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
  <button id="close-btn"><img src="./assets/leave.png" alt=""></button>
    <h2>${element.name}</h2>
    <br>
    <p><b>Atomic number:</b> ${element.atomicNumber}</p><br>
    <p><b>Symbol</b>: ${element.symbol}</p><br>
    <p><b>Discovery</b>: ${element.yearDiscovered}</p><br>
    <p><b>Atomic mass</b>: ${element.atomicMass}</p><br>
    <p><b>Electron configuration</b>: ${element.electronicConfiguration}</p><br>
    <p><b>Electronegativity</b>: ${element.electronegativity}</p><br>
    <p><b>Atomic radius</b>: ${element.atomicRadius}</p><br>
    <p><b>Ion Radius</b>: ${element.ionRadius}</p><br>
    <p><b>Van der Waals Radius</b>: ${element.vanDerWaalsRadius}</p><br>
    <p><b>Ionization energy</b>: ${element.ionizationEnergy}</p><br>
    <p><b>Electron Affinity</b>: ${element.electronAffinity}</p><br>
    <p><b>Oxidation States</b>: ${element.oxidationStates}</p><br>
    <p><b>Standard State of Matter</b>: ${element.standardState}</p><br>
    <p><b>Bond type</b>: ${element.bondingType}</p><br>
    <p><b>Melting Point (Kelvin)</b>: ${element.meltingPoint}</p><br>
    <p><b>Boiling Point (Kelvin)</b>: ${element.boilingPoint}</p><br>
    <p><b>Density</b>: ${element.density}</p><br>
    <p><b>Group</b>: ${element.groupBlock}</p><br>
  `;

  // Add event listener to close modal when close button is clicked
  const closeBtn = modal.querySelector('#close-btn');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Append modal to the body element
  document.body.appendChild(modal);
}

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Add an event listener to the search button
searchBtn.addEventListener('click', () => {
  // Get the search term entered by the user
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Search for matching elements in your data
  const matchingElements = elements.filter(element => {
    return (
      element.symbol.toLowerCase().includes(searchTerm) ||
      element.name.toLowerCase().includes(searchTerm) ||
      element.number.toString().includes(searchTerm)
    );
  });

  // Display the matching elements in the table
  displayElements(matchingElements);
});

function displayElements(elements) {
  // Get a reference to the table body
  const tableBody = document.querySelector('#element-table tbody');

  // Clear the table body
  tableBody.innerHTML = '';

  // Loop through the elements and create a table row for each one
  elements.forEach(element => {
    const row = tableBody.insertRow();

    // Add a cell for the element number
    const numberCell = row.insertCell();
    numberCell.textContent = element.number;

    // Add a cell for the element symbol
    const symbolCell = row.insertCell();
    symbolCell.textContent = element.symbol;

    // Add a cell for the element name
    const nameCell = row.insertCell();
    nameCell.textContent = element.name;

    // Add a cell for the element atomic mass
    const massCell = row.insertCell();
    massCell.textContent = element.atomic_mass;
  });
}

