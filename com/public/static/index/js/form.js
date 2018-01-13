/*form.js*/
$(document).ready(function () {
    if ($(".met-form-validation").length) {
        $(".met-form-validation").formValidation({
            framework: "bootstrap"
        })
    }
    $(document).on('keyup', ".met-form input[name='code']", function () {
        $(this).val($(this).val().toUpperCase());
    });
})

function codeimgRefresh() {
    var url = $(".met-form-codeimg").data("url");
    $(".met-form-codeimg").attr("src", url + '&random=' + Math.floor(Math.random() * 9999 + 1));
}

$(document).on("change", ".input-group-file [type=file]", function () {
    var $this = $(this),
        $text = $(this).parents('.input-group-file').find('.form-control'), value = "";
    $.each($this[0].files, function (i, file) {
        value += file.name + ", ";
    });
    value = value.substring(0, value.length - 2);
    $text.val(value);
});