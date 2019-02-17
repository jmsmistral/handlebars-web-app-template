// code to run when the document loads
$(document).ready(() => {
  // sample ajax get request
  $.get('/sample_endpoint', (data) => {
    // Do nothing if there's no data
    if (!data) {
      return;
    }
    console.log(data);
  });
});
