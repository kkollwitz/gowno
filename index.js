let time = 60;



let KolorTla = () =>{
    let znaki = "ABCDEF1234567890"
    let hash = "#"
    for (let i = 0;i<6;i++){
        hash += znaki[Math.floor(Math.random() * 16)];
    }
        return hash
}

let countdown = () =>{
        time--
        document.getElementById('countdown').innerHTML = time 
}

let zmianaTla = () =>{
    setInterval(() => {
        document.getElementById('body').style.backgroundColor = KolorTla()
    }, 2000);
}

let timer = () =>{
    setInterval(() => {
        countdown()
    }, 1000);
}

zmianaTla()
timer()
