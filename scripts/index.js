const loader = async (url) => {
  let res = await fetch(url);
  let data = await res.json();

  return data;
};

const load_button = async () => {
  const button = document.getElementById("buttons");

  const button_data = await loader(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  );

  let button_load = button_data.categories;

  for (let data of button_load) {
    let category = data.category;
    button.innerHTML += `
         <button class="btn bg-[#b9b9b9] text-white font-medium text-base rounded">${category}</button>
        `;
  }
};

load_button();

const load_vidoes = async () => {
  const videos = document.getElementById("videos");
  const videos_data = await loader(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );

  let videos_load = videos_data.videos;

  for (let data of videos_load) {
    let thumbnail = data.thumbnail;
    let tittle = data.title;

    let profile_name, profile_picture, verified, views;

    const authors = data.authors;
    for (let info of authors) {
      profile_picture = info.profile_picture;
      profile_name = info.profile_name;
      verified = info.verified;
    }

    const others = data.others;

    views = others.views;

    if (verified === "" || verified === false) {
      videos.innerHTML += `
    
      <div class="card bg-base-100 w-96 shadow-sm max-w-72">
      <figure>
        <img
          src=${thumbnail}
          alt="Shoes" 
          class="min-h-52 rounded-xl"
          />
      </figure>
      <div class="card-body">
        <div class="flex">
          <div>
            <img src=${profile_picture} alt="" srcset="" class="w-8 h-8 mr-4 rounded-full">
          </div>
          <div>
            <h2 class="card-title">
             ${tittle}
            </h2>
                <p class=" text-[#666666] mr-2">
                  ${profile_name}
                </p>
            <p class="text-[#666666]">
              ${views} Views
            </p>
            
          </div>
        </div>
      
      </div>
    </div>
    
    `;
    } else {
      videos.innerHTML += `
  <div class="card bg-base-100 w-96 shadow-sm max-w-72">
      <figure>
        <img
          src=${thumbnail}
          alt="Shoes" 
          class="min-h-52 rounded-xl"
          />
      </figure>
      <div class="card-body">
        <div class="flex">
          <div>
            <img src=${profile_picture} alt="" srcset="" class="w-8 h-8 mr-4 rounded-full">
          </div>
          <div>
            <h2 class="card-title">
               ${tittle}
            </h2>
            <div class="flex">
              <div>
                <p class=" text-[#666666] mr-2">
                   ${profile_name}
                </p>
              </div>
              <div >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-blue-600 font-bold">
                  <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <p class="text-[#666666]">
            ${views} Views
            </p>
            
          </div>
        </div>
      
      </div>
    </div>
    `;
    }
  }
};


load_vidoes();