/* Punctul 1: Numere Naturale */

function ePrim (num){
    if(num < 2){
      return false;
    }
    
    for(let i = 2; i <= num/2; i++){
      if(num % i === 0) {
        return false;
      }
    }
    return true;
  }
  
  function calculeazaNumerelePrime(numbers) {
    let sumaPrima = 0;
    let numaratoareaPrima = 0;
    
    for (let i = 0; i < numbers.length; i++) {
      if (ePrim(numbers[i])){
      sumaPrima += numbers[i];
      numaratoareaPrima++;
      }
    }
    
    if (numaratoareaPrima === 0) {
      return 0;
    }
    return sumaPrima / numaratoareaPrima;
  }
  
  const arrayNumere = [9, 6, 13, 23, 17, 18, 20, 22, 30, 97, 52];
  const rezultat = calculeazaNumerelePrime(arrayNumere);
  console.log("Media aritmetica a numerelor prime din array este: "+ rezultat);
  
  /* Punctul 2: Patratul Perfect */
  function sumaCifrelorPatratePerfecte(n) {
    let suma = 0;
  
    while (n > 0) {
      const cifra = n % 10;
      const radacinaPatrata = Math.sqrt(cifra);
  
      if (radacinaPatrata === Math.floor(radacinaPatrata)) {
        suma += cifra;
      }
  
      n = Math.floor(n / 10);
    }
  
    return suma;
  }
  
  const numarExemplu = 489574;
  const rezultatExemplu = sumaCifrelorPatratePerfecte(numarExemplu);
  console.log(`Suma cifrelor patrat perfecte a numarului ${numarExemplu} este: ${rezultatExemplu}`);
  
  //Exercitiul 3//
  
  class Product {
    constructor(name, price, stock, size) {
      this.name = name;
      this.price = price;
      this.stock = stock;
      this.size = size;
    }
  }
  
  class Category {
    constructor(name, gender) {
      this.name = name;
      this.gender = gender;
      this.products = [];
    }
  
    addProduct(product) {
      this.products.push(product);
    }
  
    removeProduct(productName) {
      this.products = this.products.filter(product => product.name !== productName);
    }
  
    displayProducts() {
      console.log(`${this.name} > ${this.gender}:`);
      this.products.forEach(product => {
        console.log(`>${product.name} ${product.price}LEI - size: ${product.size}`);
      });
    }
  
    checkStock(productName) {
      const product = this.products.find(product => product.name === productName);
      if (product) {
        if (product.stock > 0) {
          console.log(`Stoc disponibil pentru ${productName}.`);
        } else {
          console.log(`Stoc indisponibil pentru ${productName}.`);
        }
      } else {
        console.log(`Produsul ${productName} nu a fost gasit.`);
      }
    }
  }
  
  const tricouriBarbati = new Category("Tricouri", "Barbati");
  const tricouPolo = new Product("Tricou Polo", 60, 10, "L");
  const tricouImprimeu = new Product("Tricou Imprimeu", 50, 5, "L");
  const tricouAlb = new Product("Tricou Alb", 65, 20, "L");
  
  tricouriBarbati.addProduct(tricouPolo);
  tricouriBarbati.addProduct(tricouImprimeu);
  tricouriBarbati.addProduct(tricouAlb);
  
  const tricouriFemei = new Category("Tricouri", "Femei");
  const tricouFriend = new Product("Tricou Friends", 80, 12, "S");
  const tricouLiveLaughLove = new Product("Tricou Live Laugh Love", 63, 10, "M");
  const tricouFloral = new Product("Tricou Floral", 74, 7, "S");
  
  tricouriFemei.addProduct(tricouFriend);
  tricouriFemei.addProduct(tricouLiveLaughLove);
  tricouriFemei.addProduct(tricouFloral);
  
  const tricouriCopii = new Category("Tricouri", "Copii");
  const tricouBatman = new Product("Tricou Batman", 55, 16, "S");
  const tricouSuperman = new Product("Tricou Superman", 50, 10, "S");
  const tricouDragonBallZ = new Product("Tricou Dragon Ball Z", 70, 24, "S");
  
  tricouriCopii.addProduct(tricouBatman);
  tricouriCopii.addProduct(tricouSuperman);
  tricouriCopii.addProduct(tricouDragonBallZ);
  
  let data;
  
  async function fetchProducts() {
    try {
      const response = await fetch('https://api.mocki.io/v2/137a4f46/haineExamen');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      data = await response.json();
      console.log("Datele de la server sunt:", JSON.stringify(data, null, 2));
      displayCategories();
    } catch (error) {
      console.error(`Eroare în timpul fetch-ului:`, error);
    }
  }
  
  function displayCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    const categoryDetailsContainer = document.getElementById('category-details'); // Adăugăm verificarea pentru elementul category-details
  
    if (data && data.categorii) {
      data.categorii.forEach(category => {
        const categoryRow = document.createElement('div');
        categoryRow.innerHTML = `<h3>${category.numeCategorie} - ${category.gen}</h3><button class="show-button" onclick="showCategoryDetails('${category.numeCategorie}')">Show</button>`;
        categoriesContainer.appendChild(categoryRow);
      });
  
      // Adăugăm verificarea pentru category-details înainte de a afișa
      if (!categoryDetailsContainer) {
        console.error("Elementul 'category-details' nu a fost găsit.");
      }
    }
  }
  
  function showCategoryDetails(categoryName) {
    const categoryDetailsContainer = document.getElementById('category-details');
  
    if (data && data.categorii) {
      const selectedCategory = data.categorii.find(category => category.numeCategorie === categoryName);
  
      if (selectedCategory) {
        const categoryDetails = `
          <h2>${selectedCategory.numeCategorie} - ${selectedCategory.gen}</h2>
          <table>
            <tr>
              <th>Denumire Produs</th>
              <th>Pret</th>
            </tr>
            ${selectedCategory.produse.map(product => `<tr><td>${product.denumireProdus}</td><td>${product.pret} LEI</td></tr>`).join('')}
          </table>
          <button class="back-button" onclick="hideCategoryDetails()">Back</button>
        `;
  
        categoryDetailsContainer.innerHTML = categoryDetails;
        categoryDetailsContainer.style.display = 'block';
      }
    }
  }
  
  function hideCategoryDetails() {
    const categoryDetailsContainer = document.getElementById('category-details');
    categoryDetailsContainer.style.display = 'none';
  }
  
  fetchProducts();