let images = []
let file;
const imageSrc = document.getElementById("image-file")
imageSrc.addEventListener("change", function() {
  file = this.files[0]
  console.log(file)
  //if (file) {
  //  const reader = new FileReader()
  //  reader.addEventListener("load", function() {
  //      images.push({
  //          "data": file,
  //          "fileName": file.name,
  //          "fileType": file.type
  //      })
  //  })
  //  reader.readAsBinaryString(file)
  //  console.log(file)
  //}
})

const form = document.getElementById("email-form")

const submitForm = async (e) => {
    e.preventDefault()
    const url = URL.createObjectURL(new Blob())
    const userId = url.substring(url.lastIndexOf('/') + 1)


    const phonenumber = form.phone.value.length < 11
    ? form.countrycode.value.toString().concat(form.phone.value.toString())
    : form.phone.value

    const data = {
        "firstName":    form.fname.value,
        "lastName":     form.lname.value,
        "emailAddress": form.email.value,
        "phoneNumber":  phonenumber,
        "city":         form.city.value,
        "state":        form.state.value
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-uid": userId
        },
        body: JSON.stringify(data)
    }

    //  POST text
    const infoSent = await fetch("https://prod-72.westus.logic.azure.com:443/workflows/667deef26e1c48a8812b766d1f6c54c6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5sPwRAVufZG8XpfKjTGII7iLjy5S_u2f-oHq_gRHAPk", options)
    
    if (infoSent.ok) {
        alert("Profile submitted for verification. Check your email to begin verification process.")
        
        //  POST images
        const opt = {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "id": userId,
                "emailaddress": form.email.value
            },
            body: file
        }
        fetch("https://storeblob-getfaceids.azurewebsites.net/api/storeBlob-getFaceIds", opt)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    }
}

form.addEventListener("submit", submitForm)