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
            
            if(file === undefined){
                var exportFile = {
                    "tester": "",
                    "model": "",
                    // "begin": [],
                    "slots": [
                        {
                            "jig_test": [],
                            "jig_error": []
                        },
                        {
                            "jig_test": [],
                            "jig_error": []
                        },
                        {
                            "jig_test": [],
                            "jig_error": []
                        },
                        {
                            "jig_test": [],
                            "jig_error": []
                        }
                    ],
                    // "end": []
                };
                globalContext.set("exportFile", exportFile);
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