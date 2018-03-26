/**
  COLOR PICKER for NPC sheet
*/
let availableColors = [
  "#6b5b95",
  "#3e4444",
  "#405d27",
  "#034f84",
  "#c94c4c",
  "#50394c",
  "#4040a1",
  "#bc5a45",
  "#618685"
];
let colorPickerHtml = `
  <table class="color-picker-palette">
    <tr>
      <td style="background-color: ${availableColors[0]}" data-color="${availableColors[0]}" onClick="selectColor(this)"></td>
      <td style="background-color: ${availableColors[1]}" data-color="${availableColors[1]}" onClick="selectColor(this)"></td>
      <td style="background-color: ${availableColors[2]}" data-color="${availableColors[2]}" onClick="selectColor(this)"></td>
    </tr>
    <tr>
      <td style="background-color: ${availableColors[3]}" data-color="${availableColors[3]}" onClick="selectColor(this)"></td>
      <td style="background-color: ${availableColors[4]}" data-color="${availableColors[4]}" onClick="selectColor(this)"></td>
      <td style="background-color: ${availableColors[5]}" data-color="${availableColors[5]}" onClick="selectColor(this)"></td>
    </tr>
    <tr>
      <td style="background-color: ${availableColors[6]}" data-color="${availableColors[6]}" onClick="selectColor(this)"></td>
      <td style="background-color: ${availableColors[7]}" data-color="${availableColors[7]}" onClick="selectColor(this)"></td>
      <td style="background-color: ${availableColors[8]}" data-color="${availableColors[8]}" onClick="selectColor(this)"></td>
    </tr>
  </table>
`.trim();

function selectColor(el) {
  let color = $(el).data('color');
  console.log(color);
  $("#new-sheet thead").css("background-color", color);
}

$('#color-picker').attr('data-content', colorPickerHtml);

$(function () {
  $('#color-picker').popover({
    container: 'body'
  });
})

/**
  MODIFICATIONS on NPC Sheet
*/
$("#add-caracteristic").click(function(event) {
  $("#add-field .modal-title").text("Nouvelle Caractéristique")
  $("#add-field .modal-body").html(`
    <form id="add-field-form" data-field="caracteristic">
      <div class="form-group">
        <label for="name">Caractéristique</label>
        <input class="form-control" type="text" id="name"/>
      </div>
      <div class="form-group">
        <label for="value">Valeur</label>
        <input class="form-control" type="number" id="value"/>
      </div>
      <div class="form-group">
        <label for="description">Description (optionnelle)</label>
        <input class="form-control" type="text" id="description"/>
      </div>
    </form>
  `.trim());
  $("#add-field").modal('show');
});

$("#add-property").click(function(event) {
  $("#add-field .modal-title").text("Nouvelle Propriété")
  $("#add-field .modal-body").html(`
    <form id="add-field-form" data-field="property">
      <div class="form-group">
        <label for="name">Propriété</label>
        <input class="form-control" type="text" id="name"/>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input class="form-control" type="text" id="description"/>
      </div>
    </form>
  `.trim());
  $("#add-field").modal('show');
});

$("#modify-loots").click(function(event) {
  console.log(event);
});

$("#add-skill").click(function(event) {
  $("#add-field .modal-title").text("Nouvelle Compétence")
  $("#add-field .modal-body").html(`
    <form id="add-field-form" data-field="skill">
      <div class="form-group">
        <label for="name">Compétence</label>
        <input class="form-control" type="text" id="name"/>
      </div>
      <div class="row">
        <div class="col-9 form-group">
          <label for="caracteristic">Caractéristique</label>
          <select class="form-control" id="caracteristic">
            <option>Force</option>
            <option>Dextérité</option>
          </select>
        </div>
        <div class="col-3 form-group">
          <label for="value">Valeur</label>
          <input class="form-control" type="number" id="value"/>
        </div>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" rows="4" id="description"/>
      </div>
    </form>
  `.trim());
  $("#add-field").modal('show');
  $("#add-field-form").submit(function(event) {
    addFieldValidation(event);
  });
});

/**
  Validatio of add field modal.
*/
function addFieldValidation(event) {
  event.preventDefault();
  console.log($(event.target).data('field'));
};
