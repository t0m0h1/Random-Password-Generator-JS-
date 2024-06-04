function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSpecial = document.getElementById('includeSpecial').checked;
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSpecial) charset += '!@#$%^&*()_+{}[]|:;<>,.?/';
    
    if (charset === '') {
        alert('Please select at least one character type.');
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    document.getElementById('passwordDisplay').textContent = password;
}

function checkPassword() {
    const password = document.getElementById('passwordDisplay').textContent;
    const length = password.length;
    const includeUppercase = /[A-Z]/.test(password);
    const includeLowercase = /[a-z]/.test(password);
    const includeNumbers = /[0-9]/.test(password);
    const includeSpecial = /[^A-Za-z0-9]/.test(password);
    let backgroundColor = length >= 8 && length < 12 ? 'yellow' : length >= 12 ? 'green' : 'red';
    
    document.getElementById('length').value = length;
    document.getElementById('includeUppercase').checked = includeUppercase;
    document.getElementById('includeLowercase').checked = includeLowercase;
    document.getElementById('includeNumbers').checked = includeNumbers;
    document.getElementById('includeSpecial').checked = includeSpecial;

    if (password === '') {
        alert('Please generate a password first.');
        backgroundColor = 'white';
        return;
    } else if (password.length < 8) {
        alert('short password');
        backgroundColor = 'red';
        return;
    } else if (password.length >= 12 && password.includes('!@#$%^&*()_+{}[]|:;<>,.?/')) {
        alert('very strong password');
        backgroundColor = 'green';
        return;
    } else if (password.length >= 12) {
        alert('strong password');
        backgroundColor = 'yellow';
        return;
    }

    document.getElementById('passwordDisplay').textContent = password;
}

function copyPassword() {
    const password = document.getElementById('passwordDisplay').textContent;
    if (password === '') {
        alert('Please generate a password first.');
        return;
    }
    
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard.');
}