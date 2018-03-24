$.ajax({
  method: 'GET',
  url: 'https://gw2rp-tools.ovh/api/events',
  success: function(json) {
    console.log(json);
  }
})
