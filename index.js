var eventRuleList = [];
var labelRuleList = [];
var enrichmentRule = [];


$(document).ready(function () {
    $("#myInputEvents").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#eventsTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInputLabels").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#labelsTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    var eventRulesLocal = localStorage.getItem('eventRulesLocal') ?? "null";
    if (eventRulesLocal.includes("null")) {
        eventRuleList.push(
            {
                id: "1",
                name: "My Web Login Success Rule ",
                category: "authentication",
                type: "start",
                kind: "event",
                outcome: "success",
                detail: "Login Web",
                text: "Login Success via Web",
                regex: ["(?i)(eas2WebLoginSuccessTrap|hm2WebLoginSuccessTrap|webserver|authentication|login via)",
                    "(?i)(H_Low S_platform_PRIVILEGE_LOGIN_SUCCESS|H_Low S_platform_LOGIN_SUCCESS)"],
                active: true,
                defaultCreation: false,
            },
            {
                id: "2",
                name: "My Web Login Web Failure Rule ",
                category: "authentication",
                type: "start",
                kind: "event",
                outcome: "failure",
                detail: "Login Web",
                text: "Login Failure via Web",
                regex: ["(?i)(eas2WebLoginSuccessTrap|hm2WebLoginSuccessTrap|webserver|authentication|login via)",
                    "(?i)(H_Low S_platform_PRIVILEGE_LOGIN_SUCCESS|H_Low S_platform_LOGIN_SUCCESS)"],
                active: true,
                defaultCreation: true,
            },
            {
                id: "3",
                name: "My Password Change Rule",
                category: "iam",
                type: "change",
                kind: "event",
                outcome: "success",
                detail: "Password",
                text: "Password changed successfully",
                regex: ["(?i)(eas2WebLoginSuccessTrap|hm2WebLoginSuccessTrap|webserver|authentication|login via)",
                    "(?i)(H_Low S_platform_PRIVILEGE_LOGIN_SUCCESS|H_Low S_platform_LOGIN_SUCCESS)"],
                active: false,
                defaultCreation: true,
            }
        );
        localStorage.setItem("eventRulesLocal", JSON.stringify(eventRuleList));
    } else {
        eventRuleList = JSON.parse(eventRulesLocal);
    }

    var labelRulesLocal = localStorage.getItem('labelRulesLocal') ?? "null";
    if (labelRulesLocal.includes("null")) {
        labelRuleList.push(
            {
                id: "1",
                name: "Signal contact opened",
                category: "network",
                type: "info",
                kind: "event",
                outcome: "success",
                detail: "",
                text: "",
                regex: ["(?i)(eas2WebLoginSuccessTrap|hm2WebLoginSuccessTrap|webserver|authentication|login via)",
                    "(?i)(H_Low S_platform_PRIVILEGE_LOGIN_SUCCESS|H_Low S_platform_LOGIN_SUCCESS)"],
                active: true,
                defaultCreation: true,
            },
            {
                id: "2",
                name: "temperature high",
                category: "process",
                type: "info",
                kind: "event",
                outcome: "failure",
                detail: "",
                text: "",
                regex: ["(?i)(eas2WebLoginSuccessTrap|hm2WebLoginSuccessTrap|webserver|authentication|login via)",
                    "(?i)(H_Low S_platform_PRIVILEGE_LOGIN_SUCCESS|H_Low S_platform_LOGIN_SUCCESS)"],
                active: true,
                defaultCreation: false,
            }
        );
        localStorage.setItem("labelRulesLocal", JSON.stringify(labelRuleList));
    } else {
        labelRuleList = JSON.parse(labelRulesLocal);
    }


    var enrichmentRule = {
        name: "My Web Login Host Rule ",
        dittoAttributes: ["source", "name"],
        customAttributes: [
            {
                key: "source",
                value: "HTPP(S)"
            },
            {
                key: "user",
                value: "admin"
            }
        ],
        regex: ["(?i)(eas2WebLoginSuccessTrap|hm2WebLoginSuccessTrap|webserver|authentication|login via)",
            "(?i)(H_Low S_platform_PRIVILEGE_LOGIN_SUCCESS|H_Low S_platform_LOGIN_SUCCESS)"]
    };

    localStorage.setItem("enrichmentRule", JSON.stringify(enrichmentRule));


    const eventRulesContainer = new Vue({
        el: '#event',
        data: {
            eventRuleList: eventRuleList
        },
        methods: {
            enableRule: function (id) {
                var rule = this.eventRuleList.find(x => x.id == id);
                rule.active = !rule.active;
            },
            deleteRule: function (id) {
                this.eventRuleList = this.eventRuleList.filter((X) =>
                    X.id != id
                )
            }
        }
    });

    const labelRulesContainer = new Vue({
        el: '#label',
        data: {
            labelRuleList: labelRuleList
        },
        methods: {
            enableRule: function (id) {
                this.eventRuleList[id].active = !this.eventRuleList[id].active;
            },
            deleteRule: function (id) {
                this.labelRuleList = this.labelRuleList.filter((X) =>
                    X.id != id
                )
            }
        }
    });



    // document.onclick = function() {
    // _idleSecondsCounter = 0;
    // };
    // document.onmousemove = function() {
    // _idleSecondsCounter = 0;
    // };
    // document.onkeypress = function() {
    // _idleSecondsCounter = 0;
    // };





});


var autorefresh = 10;
var alarmTrigger = 5;
var _idleSecondsCounter = 0;
var myInterval;

function CheckIdleTime() {
    _idleSecondsCounter++;
    if (_idleSecondsCounter == autorefresh - alarmTrigger) {
        $("#exampleModal").modal();
    } else if (_idleSecondsCounter >= autorefresh) {
        $("#exampleModal").modal('hide');
        console.log('Perform autoRefresh at ', new Date());
        resetCounter();
    }
}
function skipRefresh() {
    console.log('skip autorefresh at ', new Date());
    resetCounter();
}

function skipRefreshAndTurnOff() {
    document.getElementById('mySelect').value = 'off';
    console.log('skip autorefresh and turned off at ', new Date());
    window.clearInterval(myInterval);
    resetCounter();
}

function resetCounter() {
    _idleSecondsCounter = 0;
}

function myFunction() {
    var val = document.getElementById("mySelect").value;
    if (val == 'off') {
        skipRefreshAndTurnOff();
    } else {
        myInterval = window.setInterval(CheckIdleTime, 1000);
        resetCounter();
    }
}