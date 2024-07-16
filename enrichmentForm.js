
let regexRules = [];
let attributeRules = [];
let deviceAttributes = [];
let customAttributes = [];

let newRegex;
let attributeName;
let attributeValue;
let newAttribute;
let newCustomAttribute = {
    'name': '',
    'value': ''
};
let newAttributeValue;

let applyAll = false;
let ruleType = "standard";

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');

    if (action == "copy") {
        var rule = JSON.parse(localStorage.getItem("enrichmentRule"));
        $('#ruleName').val(rule.name);
        $('#category').val(rule.category);
        $('#type').val(rule.type);
        $('#kind').val(rule.kind);
        $('#outcome').val(rule.outcome);
        $('#detail').val(rule.detail);
        $('#text').val(rule.text);
        $('#title').html(action == 'copy' ? "New Enrichment From Existing Rule" : "New Event From Existing Rule");

        regexRules = rule.regex;
    }


    const ruleTypeContainer = new Vue({
        el: "#ruleTypeContainer",
        data: {
            ruleType: ruleType,
            regexRules: regexRules,
            deviceAttributes: deviceAttributes,
            customAttributes: customAttributes,
            newRegex: newRegex,
            newAttribute: newAttribute,
            newCustomAttribute: newCustomAttribute,
            attributeName: attributeName,
            attributeValue: attributeValue,
            attributeRules: attributeRules,
            applyAll: applyAll
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
            },
            switchRuleType: function () {
                console.log(this.ruleType);
                let confirmed = confirm("This action will remove the existing rules!");

                if(confirmed === true){
                    this.regexRules = [];
                    this.attributeRules = [];
                }
            },
            removeAttributeRule: function (attributeRule) {
                this.attributeRules = this.attributeRules.filter((x) => x != attributeRule);
            },
            addAttributeRule: function () {
                if (this.attributeName != "" && this.attributeValue != "") {
                    this.attributeRules.push({'key': this.attributeName, 'value': this.attributeValue});
                    this.attributeName = "";
                    this.attributeValue = "";
                }
            },
            removeDeviceAttribute: function (deviceAttribute) {
                this.deviceAttributes = this.deviceAttributes.filter((x) => x != deviceAttribute);
            },
            addDeviceAttribute: function () {
                if (this.newAttribute != "") {
                    this.deviceAttributes.push(this.newAttribute);
                    this.newAttribute = "";
                }
            },
            removeCustomAttribute: function (customAttribute) {
                this.customAttributes = this.customAttributes.filter((x) => x != customAttribute);
            },
            addCustomAttribute: function () {
                if (this.newCustomAttribute.name != "" && this.newCustomAttribute.value != "") {
                    this.customAttributes.push({'name': this.newCustomAttribute.name, 'value': this.newCustomAttribute.value});
                    this.newCustomAttribute.name = "";
                    this.newCustomAttribute.value = "";
                }
            }
        }
    })

})

