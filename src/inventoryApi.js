
export function safeFetchJson(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${url} returned status ${response.status}`);
        }
        return response.json();
      });
  }

  export async function fetchIngredient(category, name) {
    const url = `http://localhost:8080/${category}/${name}`;
    const properties = await safeFetchJson(url);
    return { [name]: properties };
  }

  export async function fetchAllIngredients(category, ingredientNames) {
    const ingredientPromises = ingredientNames.map(name => fetchIngredient(category, name));
    const ingredientArray = await Promise.all(ingredientPromises);
    return Object.assign({}, ...ingredientArray);
  }

  export async function inventoryLoader() {
    const foundationNames = await safeFetchJson('http://localhost:8080/foundations');
    const foundations = await fetchAllIngredients('foundations', foundationNames);
    await new Promise(resolve => setTimeout(resolve, 500));
  
    const proteinNames = await safeFetchJson('http://localhost:8080/proteins');
    const proteins = await fetchAllIngredients('proteins', proteinNames);
  
    const extraNames = await safeFetchJson('http://localhost:8080/extras');
    const extras = await fetchAllIngredients('extras', extraNames);
  
    const dressingNames = await safeFetchJson('http://localhost:8080/dressings');
    const dressings = await fetchAllIngredients('dressings', dressingNames);
  
    return { ...foundations, ...proteins, ...extras, ...dressings };
  }