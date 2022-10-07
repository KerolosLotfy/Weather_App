const select = document.querySelector(".select");
let flag = document.querySelector(".flag > img ");
let temp = document.querySelector(".data .temp");
let countryName = document.querySelector(".data .countryName");
let date = document.querySelector(".data .date");
let Extemp = document.querySelector(".extraData #temp .value");
let cloud = document.querySelector(".extraData #cloud .value");
let icon = document.querySelector(".extraData #icon img");
let selectText = document.querySelector(".select span");
let bgImg = document.querySelector(".img-container img");
const apiKey = "7a2329a562a54e2895395149220610";

// Get All Names Countries
window.onload = async () => {
  await fetch("./js/countriesName.json")
    .then((res) => res.json())
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        let li = document.createElement("li");
        li.innerText = res[i];
        document.querySelector(".select > ul").appendChild(li);
      }
    })
    .finally(() => {
      getWeatherData(selectText.innerHTML);
      // select Country from Countries List
      selectCountry();
    });
};

// select Country from Countries List
function selectCountry() {
  // to show Countries List
  select.addEventListener("click", (e) => {
    select.classList.toggle("active");
  });
  // to select Country
  let countriesList = document.querySelectorAll(".select > ul > li ");
  countriesList.forEach((country) => {
    country.addEventListener("click", (e) => {
      select.children[0].innerText = country.innerText;
      selectText = country.innerText;

      // get Weather Data according to  country Name
      getWeatherData(selectText);
    });
  });
}

// get Weather Data according to  country Name
async function getWeatherData(cName) {
  let flagUrl = `https://countryflagsapi.com/png/${cName}`;
  flag.src = flagUrl;
  let apiURl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cName}&aqi=no`;
  await fetch(apiURl)
    .then((res) => res.json())
    .then((data) => {
      countryName.innerHTML = data.location.country;
      date.innerHTML = data.location.localtime;
      temp.innerHTML = `${data.current.temp_c}°C`;
      cloud.innerHTML = data.current.cloud;
      icon.src = data.current.condition.icon;
      Extemp.innerHTML = `${data.current.temp_c}°C`;
    })
    .catch((reason) => console.log(Error(" Bad Request")))
    .finally(() => changeBg(cName));
}

async function changeBg(cName) {
  bgImg.src =
    "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80";
  await fetch("./js/myApi.json")
    .then((res) => res.json())
    .then((data) => {
      for (const x of data) {
        if (x.name.toLowerCase() === cName.toLowerCase()) {
          bgImg.src = x.img;
        }
      }
    })
    .catch((reason) => {
      console.log(Error("Bad Request" + reason));
    });
}
