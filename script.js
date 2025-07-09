const passwordEl = document.getElementById("password");
const lengthSlider = document.getElementById("length-slider");
const lengthValue = document.getElementById("length-value");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const strengthValue = document.getElementById("strength-value");

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// Update length display
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Generate password
generateBtn.addEventListener("click", () => {
  const length = +lengthSlider.value;
  const includeUppercase = uppercaseEl.checked;
  const includeLowercase = lowercaseEl.checked;
  const includeNumbers = numbersEl.checked;
  const includeSymbols = symbolsEl.checked;
  
  let allowedChars = "";
  if (includeUppercase) allowedChars += uppercaseChars;
  if (includeLowercase) allowedChars += lowercaseChars;
  if (includeNumbers) allowedChars += numberChars;
  if (includeSymbols) allowedChars += symbolChars;
  
  if (!allowedChars) {
    alert("Please select at least one character type!");
    return;
  }
  
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }
  
  passwordEl.value = password;
  updateStrength(password);
});

// Copy password
copyBtn.addEventListener("click", () => {
  passwordEl.select();
  document.execCommand("copy");
  
  // Visual feedback
  copyBtn.textContent = "✓";
  setTimeout(() => {
    copyBtn.textContent = "📋";
  }, 1000);
});

// Check password strength
function updateStrength(password) {
  const length = password.length;
  let strength = "Medium";
  let strengthClass = "strength-medium";
  
  if (length >= 16 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
    strength = "Strong";
    strengthClass = "strength-strong";
  } else if (length <= 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    strength = "Weak";
    strengthClass = "strength-weak";
  }
  
  strengthValue.textContent = strength;
  strengthValue.className = strengthClass;
}