const loadPhones = async(searchText) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data)
};

const displayData = (phones) => {
    const phoneContainer = document.getElementById("phones-container")
    phoneContainer.innerHTML = ''
    phones.map((phone) => {
        // console.log(phone);
        const singlePhone = document.createElement("div");
        singlePhone.classList.add("col-lg-4");
        singlePhone.innerHTML = `
        <div class="card mb-3 p-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">This is a wider card .</p>
            </div> 
          </div>
          <div><button onclick="showDetails('${phone.slug}')" class="btn btn-primary w-100 mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
        </div>
      </div>
        `;
        phoneContainer.appendChild(singlePhone);
    })
};

const searchPhones = () => {
   const searchText = document.getElementById("search-input-field").value;
   loadPhones(searchText)
};

const showDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    displayModal(data.data) 
};

const displayModal = (modalData) => {
    // console.log(modalData.releaseDate)
     const modalContainer = document.getElementById("modal-content");
     modalContainer.innerHTML = `
       <div class="modal-header">
         <h1 class="modal-title fs-5" id="exampleModalLabel">${modalData.name}</h1>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
      <div class="modal-body">
        <p class="text-center"> <strong>Brand: ${modalData.brand}</strong> </p>
        <p> <strong>Main Features :</strong> </p>
         <p>Storage: ${modalData.mainFeatures.storage} </p>
         <p>Display: ${modalData.mainFeatures.displaySize} </p>
         <p>Memory: ${modalData.mainFeatures.memory} </p>
         <p>Release Date: ${modalData.releaseDate} </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
     `;
};

loadPhones("iphone");