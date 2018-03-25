$("#add-entry").click(function(event) {
  console.log("add entry!");
});

$("#roll-loot").click(function(event) {
  let dice = $(event.target).data("dice") || 1;
  let rolled = Math.ceil((Math.random() * dice));
  $(event.target).text(rolled);
});
