const loader = async (url) => {
  let res = await fetch(url);
  let data = await res.json();

  return data;
};

const remove_active_class=()=>{

const active_buttons=document.getElementsByClassName("active");

for (let button of active_buttons){
button.classList.remove("active");

}


}

const load_button = async () => {
  const button = document.getElementById("buttons");

  const button_data = await loader(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  );

  let button_load = button_data.categories;

  for (let data of button_load) {
    let category = data.category;
    let category_id = data.category_id;
    button.innerHTML += `
         <button id="btn-${category_id}" onclick="load_categories(${category_id})" class="btn bg-[#e5e3e3] text-black font-medium text-base rounded  hover:bg-[#FF1F3D] hover:text-white ">${category}</button>
        `;
  }
};

load_button();

const load_des= async (video_des)=>{

  console.log(video_des);
  

  const dialog_box=document.getElementById("my_modal_1");

let url=`https://openapi.programming-hero.com/api/phero-tube/video/${video_des}`;


console.log(url);
const data= await loader(url);
console.log(data);

const data_load=data.video;
 
let thumbnail=data_load.thumbnail;
let title=data_load.title;

let des=data_load.description;


  dialog_box.innerHTML=`
  
  <div class="card bg-base-100 image-full w-96 shadow-sm">
          <figure>
            <img
              src=${thumbnail}
              alt="Music"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>
              ${des}
            </p>
            <div class="card-actions justify-end">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </div>
  
  `

  dialog_box.showModal();

}


const convertSerialToDate = (serial) => {
  const startDate = new Date(1900, 0, 1); // Jan 1, 1900
  const resultDate = new Date(
    startDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000
  );
  return resultDate.toDateString(); // or toLocaleDateString()
};

const load_all_vidoes = async (value = "") => {
  const videos = document.getElementById("videos");
  videos.innerHTML = "";

  remove_active_class (); 
  const all_button = document.getElementById("all");
  all_button.classList.add("active");

  const videos_data = await loader(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${value}`
  );

  let videos_load = videos_data.videos;


  for (let data of videos_load) {
    let thumbnail = data.thumbnail;
    let tittle = data.title;

    let profile_name, profile_picture, verified, views, date;

    let video_des = data.video_id;

    const authors = data.authors;
    for (let info of authors) {
      profile_picture = info.profile_picture;
      profile_name = info.profile_name;
      verified = info.verified;
    }

    const others = data.others;

    views = others.views;
    date = others.posted_date;

    const posted_date = convertSerialToDate(date);

    if (verified === "" || verified === false) {
      videos.innerHTML += `
    
      <div class="card bg-base-100 w-96 shadow-sm max-w-72">
      <figure class="relative">
        <img
          src=${thumbnail}
          alt="Shoes" 
          class="h-52 rounded-xl w-full object-cover"
          />
          <span class="absolute font-regular text-xs bg-[#171717] text-white bottom-2 right-2 rounded-lg p-2">${posted_date}</span>
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

  <button onclick="load_des('${video_des}')" class="btn bg-[#e5e3e3] text-black font-medium text-base rounded  hover:bg-[#FF1F3D] hover:text-white" ">Show Description</button>
      
      </div>
    </div>
    
    `;
    } else {
      videos.innerHTML += `
  <div class="card bg-base-100 w-96 shadow-sm max-w-72">
      <figure class="relative">
        <img
          src=${thumbnail}
          alt="Shoes" 
          class="h-52 rounded-xl w-full object-cover"
          />
          <span class="absolute font-regular text-xs bg-[#171717] text-white bottom-2 right-2 rounded-lg p-2">${posted_date}</span>
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
        <button onclick="load_des('${video_des}')"  class="btn bg-[#e5e3e3] text-black font-medium text-base rounded  hover:bg-[#FF1F3D] hover:text-white" ">Show Description</button>
      </div>
    </div>
    `;
    }
  }
};

const load_categories = async (id) => {
  const videos = document.getElementById("videos");
  videos.innerHTML = "";

  const data = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  const videos_data = await loader(data);

  console.log(videos_data);

  remove_active_class(); 

  const clicked_button = document.getElementById(`btn-${id}`);
  clicked_button.classList.add("active");

  let videos_load = videos_data.category;

 
  if (videos_data.status === true) {
    for (let data of videos_load) {
      let thumbnail = data.thumbnail;
      let tittle = data.title;

      let video_des=data.video_id; 

      let profile_name, profile_picture, verified, views, date;

      const authors = data.authors;
      for (let info of authors) {
        profile_picture = info.profile_picture;
        profile_name = info.profile_name;
        verified = info.verified;
      }

      const others = data.others;

      views = others.views;
      date = others.posted_date;

      const posted_date = convertSerialToDate(date);

      if (verified === "" || verified === false) {
        videos.innerHTML += `
    
      <div class="card bg-base-100 w-96 shadow-sm max-w-72">
      <figure class="relative">
        <img
          src=${thumbnail}
          alt="Shoes" 
          class="h-52 rounded-xl w-full object-cover"
          />
          <span class="absolute font-regular text-xs bg-[#171717] text-white bottom-2 right-2 rounded-lg p-2">${posted_date}</span>
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
        <button onclick="load_des('${video_des}')" class="btn bg-[#e5e3e3] text-black font-medium text-base rounded  hover:bg-[#FF1F3D] hover:text-white" ">Show Description</button>
      </div>
    </div>
    
    `;
      } else {
        videos.innerHTML += `
  <div class="card bg-base-100 w-96 shadow-sm max-w-72">
      <figure class="relative">
        <img
          src=${thumbnail}
          alt="Shoes" 
          class="h-52 rounded-xl w-full object-cover"
          />
          <span class="absolute font-regular text-xs bg-[#171717] text-white bottom-2 right-2 rounded-lg p-2">${posted_date}</span>
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
        <button onclick="load_des('${video_des}')"  class="btn bg-[#e5e3e3] text-black font-medium text-base rounded  hover:bg-[#FF1F3D] hover:text-white" ">Show Description</button>
      </div>
    </div>
    `;
      }
    }
  } else {
    videos.innerHTML = "";
    videos.innerHTML += `
   <div class="col-span-4 pt-10">
          <div class="flex-col">
            <div>
              <img src="Icon.png" alt="" class="mx-auto" />
            </div>
            <div>
              <h1 class="font-bold text-2xl text-center">
                Oops!! Sorry, There is no <br />
                content here
              </h1>
            </div>
          </div>
        </div>
`;
  }
};




document.getElementById("search").addEventListener("keyup",(e)=>{
let search=e.target.value;
load_all_vidoes(search);

});