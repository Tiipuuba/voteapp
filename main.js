function register() {
    // Check if form is filled correctly
    const cName = document.getElementById('createUsername').value
    const cPassword = document.getElementById('createPassword').value
    const cAdmin = document.getElementById('createAdmin').checked

    if ( localStorage.getItem(cName) !== null ) {
        document.getElementById('registerNameNote').innerHTML = "Käyttäjä varattu."
        clearRegErr('registerNameNote')
        return;
    } else if ( cName.length < 4 ) {
        document.getElementById('registerNameNote').innerHTML = "Anna nimi joka on vähintään neljä merkkiä pitkä."
        clearRegErr('registerNameNote')
        return;
    } else if ( cPassword.length < 4 ) {
        document.getElementById('registerPasswordNote').innerHTML = "Anna salasana joka on vähintään neljä merkkiä pitkä."
        clearRegErr('registerPasswordNote')
        return;
    }

    const loginInfo = [cPassword, cAdmin]

    localStorage.setItem(cName, JSON.stringify(loginInfo))

    $('#registerModal').modal('hide')
    $('#successModal').modal('show')

    setTimeout(
        function() 
        {
            $('#successModal').modal('hide')
        }, 1750);

    // Clear fields
    document.getElementById('createUsername').value = "";
    document.getElementById('createPassword').value = "";
    document.getElementById('createAdmin').checked = false

    
}

function clearRegErr(element) {
    setTimeout(
        function() 
        {
            document.getElementById(element).innerHTML = ""
        }, 2250);
}

function login() {
    // Checks login information
    const lName = document.getElementById('loginUsername').value
    const lPassword = document.getElementById('loginPassword').value
    const linfo = JSON.parse(localStorage.getItem(lName))

    // Check if name and password are correct
    if ( localStorage.getItem(lName) === null || linfo[0] !== lPassword ) {
        $('#loginNameNote').text('Käyttäjätunnus tai salasana väärin')
        setTimeout(
            function() 
            {
                $('#loginNameNote').text('')
            }, 2250);
        return;
    }

    // Hides login and register buttons. Makes logout button visible
    document.getElementById('registerButton').classList.add('d-none');
    document.getElementById('loginButton').classList.add('d-none');
    document.getElementById('logoutButton').classList.remove('d-none');

    // Closes login modal
    $('#loginModal').modal('hide')
    
    // Makes admin button visible if admin login
    if ( linfo[1] === true ) {
        const adminButton = document.getElementById('adminButton');
        adminButton.classList.remove('invisible');
    }
    
    // Changes visibility of results and polls, so user will be able to vote after login
    $(".polls").removeClass("d-none");

    $(".results").addClass("d-none");

    // Changes flavor text to welcome text
    document.getElementById("flavorText").classList.add("d-none")
    document.getElementById("welcomeText").classList.remove("d-none")
    document.getElementById("loggedUser").innerHTML = lName

    // Keeps info of who is logged in
    localStorage.setItem("logged", lName)

    // Clear fields
    document.getElementById('loginUsername').value = "";
    document.getElementById('loginPassword').value = "";
}

function logout() {
    // removes logout button
    document.getElementById('logoutButton').classList.add('d-none')
    document.getElementById('registerButton').classList.remove('d-none');
    document.getElementById('loginButton').classList.remove('d-none');

    // Makes admin button invisible
    try {
        document.getElementById('adminButton').classList.remove('invisible')
    } catch {

    }

    document.getElementById('adminButton').classList.add('invisible')

    $(".polls").addClass("d-none");

    $(".results").removeClass("d-none");

    // Changes welcome text to flavor text
    document.getElementById("flavorText").classList.remove("d-none")
    document.getElementById("welcomeText").classList.add("d-none")
    document.getElementById("loggedUser").innerHTML = ""

    // Clears logged person
    localStorage.removeItem("logged");
}

function checknCreatePoll () {

    // Check poll name
    const pname = document.getElementById('createPollName').value
    if (pname === "") {
        document.getElementById('pollNameCreate').innerHTML = 'Anna nimi'
        return;
    } else if (document.getElementById(pname) !== null) {
        document.getElementById('pollNameCreate').innerHTML = 'Nimi varattu'
        return;
    }

    // Check poll description
    const pdesc = document.getElementById('createPollDescription').value
    if (pdesc === "") {
        document.getElementById('pollDescriptionCreate').innerHTML = 'Anna kuvaus'
        return;
    }

    // Check that atleast first two options are given
    const pop1 = document.getElementById('createPollOption1').value
    const pop2 = document.getElementById('createPollOption2').value
    const pop3 = document.getElementById('createPollOption3').value
    const pop4 = document.getElementById('createPollOption4').value

    if (pop1 === "" || pop2 === "") {
        $('small.atleastTwo').html("Anna ainakin nämä kaksi");
        return;
    }

    // If everything is okay create poll element to be passed on
    const parray = [pop1, pop2, pop3, pop4]

    const poll = {
        name: pname,
        description: pdesc,
        options: parray
    };

    createPoll(poll)
}

function createPoll(poll) {

    // Create vote section > line 190

    // Creates new col
    const newCol = document.createElement('div');
    newCol.classList.add('col-md-4');
    newCol.setAttribute('id', poll.name)
    document.getElementById('cardholder').appendChild(newCol)

    // Create new card
    const newCard = document.createElement('div');
    newCard.classList.add('card', 'mb-4');
    newCard.setAttribute('id', `newCard${poll.name}`)
    document.getElementById(poll.name).appendChild(newCard)

    // Create new card body
    const newCardBody = document.createElement('div');
    newCardBody.classList.add('card-body', 'polls', `${poll.name}p`);
    newCardBody.setAttribute('id', `${poll.name}p`)
    document.getElementById(`newCard${poll.name}`).appendChild(newCardBody)

    // Create card title and <hr>
    const newCardTitle = document.createElement('h5')
    newCardTitle.classList.add('card-title')
    newCardTitle.innerHTML = poll.name
    document.getElementById(`${poll.name}p`).appendChild(newCardTitle)

    const line = document.createElement('hr')
    document.getElementById(`${poll.name}p`).appendChild(line)

    // Create card text
    const newCardText = document.createElement('p');
    newCardText.classList.add('card-text');
    newCardText.innerHTML = poll.description
    document.getElementById(`${poll.name}p`).appendChild(newCardText)

    // Create options
    for (option in poll.options) {

        if (poll.options[option] === "") {
            continue;
        }

        const newOption = document.createElement('div');
        newOption.classList.add('form-check', 'mb-2', 'col');
        newOption.setAttribute('id', `newOption${poll.name}${option}`)
        document.getElementById(`${poll.name}p`).appendChild(newOption)

        const optionInput = document.createElement('input')
        optionInput.classList.add('form-check-input')
        optionInput.setAttribute('type', 'radio');
        optionInput.setAttribute('name', 'exampleFrom')
        optionInput.setAttribute('id', `option${poll.name}${option}`);
        document.getElementById(`newOption${poll.name}${option}`).appendChild(optionInput);

        const optionLabel = document.createElement('label');
        optionLabel.classList.add('form-check-label');
        optionLabel.setAttribute('for', `option${poll.name}${option}`);
        optionLabel.innerHTML = poll.options[option]
        document.getElementById(`newOption${poll.name}${option}`).appendChild(optionLabel);
    }

    // Create result section

    // Create div
    const resultCardBody = document.createElement('div');
    resultCardBody.classList.add('card-body', 'results', 'd-none', `${poll.name}r`);
    resultCardBody.setAttribute('id', `${poll.name}r`)
    document.getElementById(`newCard${poll.name}`).appendChild(resultCardBody)

    // Create card title and <hr>
    const resultCardTitle = document.createElement('h5')
    resultCardTitle.classList.add('card-title')
    resultCardTitle.innerHTML = poll.name
    document.getElementById(`${poll.name}r`).appendChild(resultCardTitle)

    const rline = document.createElement('hr')
    document.getElementById(`${poll.name}r`).appendChild(rline)

    // Create option results

    for (option in poll.options) {

        if (poll.options[option] === "") {
            continue;
        }
        // name
        const newOption = document.createElement('small');
        newOption.setAttribute('id', `optionR${poll.name}${option}`)
        newOption.innerHTML = `${poll.options[option]}: <span id="${poll.name}${option}amount">0</span>-ääntä`
        document.getElementById(`${poll.name}r`).appendChild(newOption)

        // bar and percent
        const progDiv = document.createElement('div');
        progDiv.setAttribute('class', 'progress')
        progDiv.setAttribute('id', `r${poll.name}${option}`)
        document.getElementById(`${poll.name}r`).appendChild(progDiv)

        const progDivBar = document.createElement('div');
        progDivBar.classList.add('progress-bar', 'bg-warning', 'text-dark')
        progDivBar.setAttribute('role', 'progressbar')
        progDivBar.setAttribute('style', 'width: 0%')
        progDivBar.setAttribute('id', `rr${poll.name}${option}`)
        document.getElementById(`r${poll.name}${option}`).appendChild(progDivBar)

    }





    // Create submit button
    const newButton = document.createElement('button');
    newButton.classList.add('btn', 'btn-outline-dark', 'btn-warning');
    newButton.setAttribute('type', 'button');
    newButton.setAttribute('id', `${poll.name}Button`)
    newButton.setAttribute('onclick', `submit("${poll.name}")`)
    newButton.innerHTML = 'Vastaa'
    document.getElementById(`${poll.name}p`).appendChild(newButton)

    $('#adminModal').modal('hide')
}

function submit(poll) {

    // Checks which one is chosen
    op1 = document.getElementById(`option${poll}0`).checked
    op2 = document.getElementById(`option${poll}1`).checked

    try {
        op3 = document.getElementById(`option${poll}2`).checked
    } catch {
        op3 = false
    }

    try {
        op4 = document.getElementById(`option${poll}3`).checked
    } catch {
        op4 = false
    }

    // If none is chosen
    if (op1 === false && op2 === false && op3 === false && op4 === false) {
        const but = document.getElementById(`${poll}Button`)
        but.classList.remove('btn-warning')
        but.classList.add('btn-danger')
        but.innerHTML = 'Ei valintaa'

        setTimeout(
            function() 
            {
                but.classList.remove('btn-danger')
                but.classList.add('btn-warning')
                but.innerHTML = 'Vastaa'
            }, 2250);
    }

    // Give point to choice or skip if voted already   
    let lName = localStorage.getItem('logged')
    const voteGiven = localStorage.getItem(`${lName}${poll}`)
    if ( voteGiven === null ) {
        saveVote(poll, op1, op2, op3, op4)
    } else if ( voteGiven === "voted" ) {
        $('#rejectModal').modal('show')

        setTimeout(
            function() 
            {
                $('#rejectModal').modal('hide')
            }, 2250);
    } 

    $(`.${poll}p`).addClass("d-none");

    $(`.${poll}r`).removeClass("d-none");

}

function saveVote(poll, op1, op2, op3) {
    // Check selected
    if ( op1 === true ) {
        var value = "0"
    } else if ( op2 === true ) {
        var value = "1"
    } else if ( op3 === true ) {
        var value = "2"
    } else {
        var value = "3"
    }

    // Increase selected
    let plusOne = parseInt(document.getElementById(`${poll}${value}amount`).textContent)
    plusOne += 1
    document.getElementById(`${poll}${value}amount`).innerHTML = plusOne

    calcPercentage(poll)

    // Mark as voted
    let lName = localStorage.getItem('logged')
    localStorage.setItem(`${lName}${poll}`, 'voted')
}

function calcPercentage (poll) {
    // get votes
    let total = 0

    const value0 = parseInt(document.getElementById(`${poll}0amount`).textContent)
    total += value0
    const value1 = parseInt(document.getElementById(`${poll}1amount`).textContent)
    total += value1

    try {
        var value2 = parseInt(document.getElementById(`${poll}2amount`).textContent)
        total += value2
    } catch { 
        var value2 = false
    }

    try {
        var value3 = parseInt(document.getElementById(`${poll}3amount`).textContent)
        total += value3
    } catch { 
        var value3 = false
    }

    const f0 = (Math.round((value0/total) * 100) / 100).toFixed(2)
    document.getElementById(`rr${poll}0`).setAttribute("style", `width: ${f0 * 100}%`)
    const f1 = (Math.round((value1/total) * 100) / 100).toFixed(2)
    document.getElementById(`rr${poll}1`).setAttribute("style", `width: ${f1 * 100}%`)
    if ( value2 !== false ) {
        var f2 = (Math.round((value2/total) * 100) / 100).toFixed(2)
        document.getElementById(`rr${poll}2`).setAttribute("style", `width: ${f2 * 100}%`)
    }
    if ( value2 !== false ) {
        var f3 = (Math.round((value3/total) * 100) / 100).toFixed(2)
        document.getElementById(`rr${poll}3`).setAttribute("style", `width: ${f3 * 100}%`)
    }
}

function deletePoll() {

    const pollName = document.getElementById('deletePollName').value

    if (pollName === "" || document.getElementById(pollName) === null) {
        document.getElementById('pollNameDelete').innerHTML = "Anna olemassa olevan kyselyn nimi"
        return
    }

    document.getElementById('pollNameDelete').innerHTML = ""
    $('#adminModal').modal('hide')
    document.getElementById(pollName).remove();
}