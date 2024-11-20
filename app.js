const endpoint = "http://localhost:8082/graphql"; // Ganti dengan endpoint GraphQL Anda

// // Fetch and display all items
// async function fetchItems() {
//     const query = `
//         query {
//             getAllItems {
//                 id
//                 deskripsiItem
//                 hargaBeli
//                 stok
//             }
//         }
//     `;

//     const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query }),
//     });

//     const result = await response.json();
//     // const items = result.data.getAllItems;

//     const itemList = document.getElementById("itemList");
//     itemList.innerHTML = ""; // Clear previous items

//     items.forEach((item) => {
//         const li = document.createElement("li");
//         li.innerHTML = `
//             ${item.deskripsiItem} - Rp ${item.hargaBeli}, Stok: ${item.stok}
//             <button onclick="deleteItem(${item.id})">Delete</button>
//         `;
//         itemList.appendChild(li);
//     });
// }

// Create Item
document.getElementById("createForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const deskripsiItem = document.getElementById("createDeskripsiItem").value;
    const hargaBeli = document.getElementById("createHargaBeli").value;
    const stok = parseInt(document.getElementById("createStok").value);

    const mutation = `
        mutation {
            createItem(input: { deskripsiItem: "${deskripsiItem}", hargaBeli: "${hargaBeli}", stok: ${stok} }) {
                id
            }
        }
    `;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
    });

    const result = await response.json();
    
    if (result.errors) {
        console.log("Gagal membuat item:", result.errors);
        alert("Gagal membuat item");
    } else {
        alert("Item berhasil dibuat");
    }

    document.getElementById("createForm").reset();
});


// Update Item
document.getElementById("updateForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const id = parseInt(document.getElementById("updateId").value);
    const deskripsiItem = document.getElementById("updateDeskripsiItem").value;
    const hargaBeli = document.getElementById("updateHargaBeli").value;
    const stok = parseInt(document.getElementById("updateStok").value);
  
    const mutation = `
      mutation {
        updateItem(input: { id: ${id}, deskripsiItem: "${deskripsiItem}", hargaBeli: "${hargaBeli}", stok: ${stok} }) {
          id
          deskripsiItem
          hargaBeli
          stok
        }
      }
    `;
  
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation }),
    });
  
    const result = await response.json();
  
    if (result.errors) {
      console.log("Gagal memperbarui item:", result.errors);
      alert("Gagal memperbarui item");
    } else {
      alert("Item berhasil diperbarui");
      // Optionally, you can also update the list of items here or call fetchItems() if needed
      // fetchItems();
    }
  
    document.getElementById("updateForm").reset();
  });
  

// Get Item by ID
document.getElementById("getByIdButton").addEventListener("click", async () => {
    const id = document.getElementById("searchId").value;
  
    const query = `
      query {
        getItemById(id: ${id}) {
          id
          deskripsiItem
          hargaBeli
          stok
        }
      }
    `;
  
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
  
    const result = await response.json();
    const item = result.data ? result.data.getItemById : null;
  
    const itemDetails = document.getElementById("itemDetails");
    if (item) {
      itemDetails.innerHTML = `
        <p><strong>ID:</strong> ${item.id}</p>
        <p><strong>Deskripsi:</strong> ${item.deskripsiItem}</p>
        <p><strong>Harga:</strong> Rp ${item.hargaBeli}</p>
        <p><strong>Stok:</strong> ${item.stok}</p>
      `;
      itemDetails.style.display = "block";
    } else {
      itemDetails.innerHTML = `<p>Item not found.</p>`;
      itemDetails.style.display = "block";
    }
  });
  

// Delete Item by ID
document
  .getElementById("deleteByIdButton")
  .addEventListener("click", async () => {
    const id = document.getElementById("searchId").value;

    const mutation = `
      mutation {
        deleteItem(id: ${id}) {
          id
        }
      }
    `;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation })
    });

    const result = await response.json();

    // Menangani response dan memeriksa apakah item berhasil dihapus
    if (result.data && result.data.deleteItem) {
      alert(`Item dengan ID ${id} berhasil dihapus`);  // Menampilkan alert
    } else {
      alert(`Gagal menghapus item dengan ID ${id}`);  // Menampilkan alert jika gagal
    }

    // Reset input dan sembunyikan detail item
    document.getElementById("searchId").value = "";
    document.getElementById("itemDetails").style.display = "none";

    // Memperbarui daftar item
    fetchItems();
  });


// // Initial load
// fetchItems();
