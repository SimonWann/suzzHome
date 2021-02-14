function a(b) {
  console.log(b)
  setTimeout(() => {
    console.log(b)
  }, 1000)
}
a(new Date())