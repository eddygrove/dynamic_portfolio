const cvUrl = "cv.json";
const myList = document.querySelector(".myList");
const loadingStatus = document.querySelector(".status");
const translation = {
  employment: "Mina anställningar",
  education: "Mina utbildningar",
  internships: "Mina praktikplatser",
};

async function getCVData() {
  let response = await fetch(cvUrl);
  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let cvData = await response.json();
    //console.log(cvData)
    loadingStatus.innerText = "";

    const cvKeys = Object.keys(cvData);
    console.log("loggar cvKeys: ", cvKeys);
    cvKeys.forEach((cvKey) => {
      const myHeading = document.createElement("H2");
      myHeading.innerHTML = cvKey;
      // om ngn översättning behövs:
      // myHeading.innerHTML = `${translation[cvKey]}`;
      myList.appendChild(myHeading);

      const cvItems = cvData[cvKey];
      // console.log("cvItems: ", cvItems);

      // loopar genom json-filens arrayer. Se dock bättre standard: https://masteringjs.io/tutorials/fundamentals/array-iterate
      cvItems.forEach((cvItem) => {
        if (cvItem.hasOwnProperty("year")) {
          console.log("year property exists");
          // cvItem.year;
          //   rendera ut year (cvItem.heading) med kursiv stil
          //   rendera ut text(cvItem.text) med normal stil
          let myRenderedCvItem = document.createElement("div");
          myRenderedCvItem.innerHTML = `<strong>${cvItem.year}</strong> <span>${cvItem.role}</span><span>${cvItem.organisation} </span> <p>${cvItem.text}</p>`;
          myList.appendChild(myRenderedCvItem);
        }

        if (cvItem.hasOwnProperty("exam")) {
          let myRenderedCvItem = document.createElement("div");
          myRenderedCvItem.innerHTML = `<strong>${cvItem.exam}</strong> <span>${cvItem.organisation}</span><p>${cvItem.text}</p>`;
          myList.appendChild(myRenderedCvItem);
          console.log("myRenderedCvItem: ", myRenderedCvItem);
        }

        if (cvItem.hasOwnProperty("tech")) {
          let myRenderedCvItem = document.createElement("div");
          myRenderedCvItem.innerHTML = `<strong>${cvItem.tech}</strong><p>${cvItem.level}</p>`;
          myList.appendChild(myRenderedCvItem);
          console.log("myRenderedCvItem: ", myRenderedCvItem);
        }

        if (typeof cvItem === "string") {
          let myRenderedCvItem = document.createElement("ul");
          myRenderedCvItem.classList.add("service");
          console.log("lägger till ul ", myRenderedCvItem);
          myList.appendChild(myRenderedCvItem);
          myRenderedCvItem = document.createElement("li");
          myRenderedCvItem.innerHTML = `${cvItem}`;
          let myUl = document.querySelector(".service");
          console.log("lägger till li: ", myRenderedCvItem);
          myUl.appendChild(myRenderedCvItem);
          console.log("cvItem: ", cvItem);

          // console.log("skipping loop");
          // return;
          // console.log("myRenderedCvItem: ", myRenderedCvItem);
        }

        // if (typeof cvItem === "string") {
        //   let myRenderedCvItem = document.createElement("li");
        //   myRenderedCvItem.innerHTML = `<li>${cvItem}</li>`;
        //   let myUl = document.querySelector(".service");
        //   myUl.appendChild(myRenderedCvItem);
        //   console.log("cvItem: ", cvItem);
        // }

        // if (typeof cvItem === "string") {
        //   let myRenderedCvItem = document.createElement("ul");

        //   myRenderedCvItem.innerHTML = `<li>${cvItem}</li>`;
        //   myList.appendChild(myRenderedCvItem);
        // }

        // } else {
        //   console.log("no heading property");
        // }

        console.log("cvItem: ", cvItem);
        console.log("--------inner loop");
      });

      // skriv ut all data från cvData som lämplig html
      // 1. skriv ut datan från anställningar (employment)
      // 2. skriv ut datan från anställningar(education)
      // 3. skriv ut datan från anställningar(internship)

      console.log("===========");
    });

    // myList.innerHTML = ``;
  } else {
    console.log("HTTP-Error: " + response.status);
    // OBS här nedan ett <li> men allt ovan är divs?
    myList.innerHTML = `<li>No CV data found</li>`;
  }
}

getCVData();
