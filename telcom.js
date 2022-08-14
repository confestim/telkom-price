// var style = document.createElement("style");
// style.innerHTML = ".telcom_addon { visibility: hidden;} .telcom_addon:hover {visibility: visible;}";
// document.getElementsByTagName("head")[0].appendChild(style);

// unwanted characters array
const bg_alphabet = ["а","б","в", "г", "д", "е" ,"ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ъ","ь","ю","я"];

// cleaning the query
function clean_query(unclean){
    if (unclean.search(" ")){
        clean = unclean.replaceAll(" ", "+");
    }
    clean = clean.replace(/[\u0400-\u04FF]/gi, "").replace("/\s/g", "");
    clean = clean.replace(":", ""); 

    return clean
}

// starting the search procedure
const items = document.getElementsByTagName("h4"); 
for (let i = 0; i < items.length; i++) {
    let item_name = items[i].textContent;
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        // item attributes
      let item_desc = this.responseXML.getElementsByClassName("s-item__link")[1].getAttribute("href");
      let item_price = this.responseXML.getElementsByClassName("s-item__price")[1].textContent;
      items[i].innerHTML += "<a href=" + item_desc + ">" + "<h5>~" + item_price + "</h5>" + "</a>";
    //   items[i].innerHTML += "<h5>~" + item_price + "</h5>" + "<h5 class="telcom_addon">" + item_desc + "</h5>";
    //   
      
    };
    xhr.onerror = function () {
      console.log("An error occurred");
    }
    // querying ebay
    xhr.open("GET", "https://www.ebay.com/sch/i.html?_nkw=ham`+radio" + clean_query(item_name), true);
    xhr.responseType = "document";
    xhr.send();
   
  } 

