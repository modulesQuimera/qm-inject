module.exports = function(RED) {

    function InjectSpecialNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.exportMode = config.exportMode === "true" ? true : false;
        var globalContext = node.context().global;
        globalContext.set("exportMode", node.exportMode);

        node.on('input', function(msg, send, done) {
            this.serialConfig = RED.nodes.getNode(config.jeb);
            console.log(this.serialConfig);
            send = send || function() { node.send.apply(node, arguments);};
            var globalContext = node.context().global;
            globalContext.set("exportMode", node.exportMode);
            globalContext.set("currentMode", "test");
            file = globalContext.get("exportFile");
            map = globalContext.get("map");
            
            globalContext.set("send_to_jig", 0);
            globalContext.set("export_file", 0);
            globalContext.set("display_config", 0);
            
            if(file === undefined){
                var exportFile = {
                    "tester": "",
                    "model": "",
                    "slots": [
                        {"jig_test": [],"jig_error": []},
                        {"jig_test": [],"jig_error": []},
                        {"jig_test": [],"jig_error": []},
                        {"jig_test": [],"jig_error": []}
                    ],
                };
                globalContext.set("exportFile", exportFile);
            }
            
            if(map === undefined){
                var map = {
                    "multimeter": {
                        "get_current": [],
                        "get_phase": [],
                        "get_voltage": [],
                        "get_voltage_diff": []
                    },
                    "ac_power": [
                        [
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""}
                        ],
                        [
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""}
                        ],
                        [
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""}
                        ],
                        [
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""}
                        ],
                        [
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""}
                        ],
                        [
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""}
                        ],
                        [
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""}
                        ],
                        [
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""},
                            {"pin": "","board": "","user": ""}
                        ]
                    ],
                    "gpio": [
                        [
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""}
                        ],
                        [
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""}
                        ],
                        [
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""}
                        ],
                        [
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""}
                        ],
                        [
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""}
                        ],
                        [
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""}
                        ],
                        [
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""}
                        ],
                        [
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""},
                            {"pinA":"","boardA": "","pinB": "", "boardB": ""}
                        ]
                    ],
                    "communication": [],
                    "mux": [],
                    "relay": {
                        "na": [],
                        "nf": []
                    }
                };
                globalContext.set("map", map);
            }

            var obj = {
                payload:{
                    exportMode: node.exportMode
                }
            };

            send(obj);

            if(done){
                done();
            }
        });
    }
    RED.nodes.registerType("inject-special", InjectSpecialNode);
};