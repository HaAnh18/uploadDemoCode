function updateLabel() {
  const fileInput = document.querySelector('.file');
  const uploadBtn = document.querySelector('.uploadBtn');
  if (fileInput.files.length > 0) {
    uploadBtn.textContent =  fileInput.files[0].name;
  } else {
    uploadBtn.textContent = 'Choose A File';
  }
  console.log(uploadBtn.textContent)
}