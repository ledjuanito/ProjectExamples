let customAttributes = [];
customAttributes.push({
    'logicalOperator': 'And',
    'key': 'Source',
    'value': 'ABSC'
});

let regexRules = [];

let newRegex;

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const action = urlParams.get('action');
    const id = urlParams.get('id');
    if (type == "label") {
        $('.eventContainer').hide();
        $('#title').html("New Label");
    }

    if (action == "copy") {
        var rules = type == 'label' 
            ? JSON.parse(localStorage.getItem("labelRulesLocal"))
            : JSON.parse(localStorage.getItem("eventRulesLocal"));
        var rule = rules.find(x => x.id == id);
        $('#ruleName').val(rule.name);
        $('#category').val(rule.category);
        $('#type').val(rule.type);
        $('#kind').val(rule.kind);
        $('#outcome').val(rule.outcome);
        $('#detail').val(rule.detail);
        $('#text').val(rule.text);
        $('#title').html(type == 'label' ? "New Label From Existing Rule" : "New Event From Existing Rule");

        regexRules = rule.regex;
        loadKeywords();
    }

    const regexContainer = new Vue({
        el: '#regexContainer',
        data: {
            regexRules: regexRules,
            newRegex: newRegex
        },
        methods: {
            removeRegex: function (regex) {
                this.regexRules = this.regexRules.filter((x) => x != regex);
            },
            addRegex: function () {
                if (this.newRegex != "") {
                    this.regexRules.push(this.newRegex);
                    this.newRegex = "";
                }
            }
        }
    })
})

function loadPipeline() {
    var x = document.getElementById("category").value;
    if (x == "authentication") {
        loadKeywords();
    } else {
        $('#keywordList').empty();
    }
    $("#loadMe").modal({
        backdrop: "static", //remove ability to close modal with click
        keyboard: false, //remove option to close with keyboard
        show: true //Display loader!
    });
    setTimeout(function () {
        $("#loadMe").modal("hide");
    }, 1500);
}

function loadKeywords() {
    $('#keywordList').append(
        '<li class="list-group-item d-flex justify-content-between">'
        + 'authentication'
        + '<button class="btn btn-outline-danger flex"><i class="bi bi-trash"></i></button>'
        + '</li>'
    );
    $('#keywordList').append(
        '<li class="list-group-item d-flex justify-content-between">'
        + 'login'
        + '<button class="btn btn-outline-danger flex"><i class="bi bi-trash"></i></button>'
        + '</li>'
    );
}