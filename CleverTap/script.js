// Enable verbose logging for analytics
sessionStorage['WZRK_D'] = '';
console.log('Analytics verbose mode enabled');

function validateForm() {
    let isValid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const dob = document.getElementById('dob').value;

    // Name validation
    if (name.length < 2) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
        console.log('Error: Name must be 2+ characters');
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
        console.log('Error: Enter a valid email');
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // Phone validation
    const phoneRegex = /^\+\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
        console.log('Error: Phone needs + and 10-15 digits');
    } else {
        document.getElementById('phoneError').style.display = 'none';
    }

    // DOB validation
    if (!dob) {
        document.getElementById('dobError').style.display = 'block';
        isValid = false;
        console.log('Error: Choose a valid date');
    } else {
        document.getElementById('dobError').style.display = 'none';
    }

    return isValid;
}

function handleLogin() {
    if (!validateForm()) {
        console.log('Validation failed');
        alert('Check your inputs!');
        return;
    }

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const dob = new Date(document.getElementById('dob').value);

    if (typeof clevertap !== 'undefined') {
        clevertap.onUserLogin.push({
            "Site": {
                "Name": name,
                "Email": email,
                "Phone": phone,
                "DOB": dob
            }
        });
        console.log('Sent login data:', { Name: name, Email: email, Phone: phone, DOB: dob });
        alert('You’re in!');
        document.getElementById('signupForm').reset();
    } else {
        console.error('Analytics failed to load');
        alert('Analytics unavailable!');
    }
}

function handleProfilePush() {
    if (!validateForm()) {
        console.log('Validation failed');
        alert('Check your inputs!');
        return;
    }

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const dob = new Date(document.getElementById('dob').value);

    if (typeof clevertap !== 'undefined') {
        clevertap.profile.push({
            "Site": {
                "Name": name,
                "Email": email,
                "Phone": phone,
                "DOB": dob
            }
        });
        console.log('Sent profile data:', { Name: name, Email: email, Phone: phone, DOB: dob });
        alert('Profile saved!');
    } else {
        console.error('Analytics failed to load');
        alert('Analytics unavailable!');
    }
}

function handleEvent() {
    if (!validateForm()) {
        console.log('Validation failed');
        alert('Check your inputs!');
        return;
    }

    const name = document.getElementById('name').value.trim();
    const eventTime = new Date();
    const randomInteger = Math.floor(Math.random() * 100);
    const randomFloat = parseFloat((Math.random() * 100).toFixed(2));

    if (typeof clevertap !== 'undefined') {
        clevertap.event.push("CustomEvent", {
            "EventTime": eventTime,
            "UserName": name,
            "RandomInteger": randomInteger,
            "RandomFloat": randomFloat
        });
        console.log('Sent event data:', {
            EventTime: eventTime,
            UserName: name,
            RandomInteger: randomInteger,
            RandomFloat: randomFloat
        });
        alert('Event captured!');
    } else {
        console.error('Analytics failed to load');
        alert('Analytics unavailable!');
    }
}

function askForPush() {
    if (typeof clevertap !== 'undefined') {
        clevertap.notifications.push({
            "titleText": "Get Notified?",
            "bodyText": "Stay connected with updates and alerts!",
            "okButtonText": "Sure!",
            "rejectButtonText": "Later",
            "askAgainTimeInSeconds": 5,
            "okButtonColor": "#A7D7C5"
        });
        console.log('Requested notifications');
        alert('Notifications requested!');
    } else {
        console.error('Analytics failed to load');
        alert('Analytics unavailable!');
    }
}