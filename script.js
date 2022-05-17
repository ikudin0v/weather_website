// function showLog() {

//     let cityList = []
//     console.clear()
//     if (document.querySelector('.cityNameInput').value.length >= 3){
//         fetch('./cityList.json')
//         .then(response => response.json())
//         .then(json => {
//             // console.log(json)
//             json.forEach(elem => {
//                 if (elem.name.toLowerCase().startsWith(document.querySelector('.cityNameInput').value)){
//                     console.log(elem.name)
//                     cityList.push(elem.name)
//                 }
//             })
//             return cityList
//         })
//         .then(list => {
//             while (document.querySelector('.cityList')){
//                 document.querySelector('.cityListContainer').removeChild(document.querySelector('.cityListContainer').firstChild)
//             }
//             document.querySelector('.cityListContainer').style.display = 'none'
//             if (list.length >= 10){
//                 document.querySelector('.cityListContainer').style.display = 'block'
//                 for (i = 0; i <= 10; i++) {
//                 document.querySelector('.cityListContainer').insertAdjacentHTML("afterbegin", `<div class="cityList">${list[i]}</div>`)
//                 }
//             }else {
//                 for (i = 0; i < list.length; i++) {
//                     document.querySelector('.cityListContainer').insertAdjacentHTML("afterbegin", `<div class="cityList">${list[i]}</div>`)
//                 }
//             }
//         })
//     } else {          
//         while (document.querySelector('.cityList')){
//         document.querySelector('.cityListContainer').removeChild(document.querySelector('.cityListContainer').firstChild)
//         }
//         document.querySelector('.cityListContainer').style.display = 'none'
//     }

// }

let citiesJson
fetch('./cityList.json')
.then(response => response.json())
.then(json => {
    citiesJson = json
})

function showLog() {
    let i = 0

    while (document.querySelector('.cityList')){
        document.querySelector('.cityListContainer').removeChild(document.querySelector('.cityListContainer').firstChild)
    }
    document.querySelector('.cityListContainer').style.display = 'none'
    // let cityList = []
    if (document.querySelector('.cityNameInput').value.length >= 3){

        citiesJson.forEach(elem => {
            if ((elem.name.toLowerCase().startsWith(document.querySelector('.cityNameInput').value) && i < 10)){
                // console.log(elem.name)
                // cityList.push(elem.name)
                document.querySelector('.cityListContainer').style.display = 'block'
                document.querySelector('.cityListContainer').insertAdjacentHTML("afterbegin", `<div class="cityList" onclick="alert(this.textContent)">${elem.name}</div>`)

            }
        })
    }
        // while (document.querySelector('.cityList')){
        //     document.querySelector('.cityListContainer').removeChild(document.querySelector('.cityListContainer').firstChild)
        // }
        // document.querySelector('.cityListContainer').style.display = 'none'
        //     if (cityList.length >= 10){
        //         document.querySelector('.cityListContainer').style.display = 'block'
        //         for (i = 0; i <= 10; i++) {
        //         document.querySelector('.cityListContainer').insertAdjacentHTML("afterbegin", `<div class="cityList">${cityList[i]}</div>`)
        //         }
        //     }else {
        //         console.log('sdkcndskcnksncksdnck')
        //         for (i = 0; i < cityList.length; i++) {
        //             document.querySelector('.cityListContainer').style.display = 'block'
        //             document.querySelector('.cityListContainer').insertAdjacentHTML("afterbegin", `<div class="cityList" onclick="alert(this.textContent)">${cityList[i]}</div>`)
        //         }
        //     }
        // } else {          
        //     while (document.querySelector('.cityList')){
        //     document.querySelector('.cityListContainer').removeChild(document.querySelector('.cityListContainer').firstChild)
        //     }
        //     document.querySelector('.cityListContainer').style.display = 'none'
        // }
}

function getForecast() {

}