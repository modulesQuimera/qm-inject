module.exports = function(RED) {

    function InjectSpecialNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.exportMode = config.exportMode === "true" ? true : false;
        var globalContext = node.context().global;
        globalContext.set("exportMode", node.exportMode);

        node.on('input', function(msg, send, done) {
            this.serialConfig = RED.nodes.getNode(config.jeb);
            send = send || function() { node.send.apply(node, arguments);};
            var globalContext = node.context().global;
            globalContext.set("exportMode", node.exportMode);
            globalContext.set("currentMode", "test");
            file = globalContext.get("exportFile");
            map = globalContext.get("map");
            
            globalContext.set("send_to_jig", 0);
            globalContext.set("export_file", 0);
            globalContext.set("display_config", 0);
            
            
            var exportFile = {
                "tester": "",
                "model": "",
                "instructions": [],
                "firmwares": [],
                "slots": [
                    {"jig_test": [],"jig_error": []},
                    {"jig_test": [],"jig_error": []},
                    {"jig_test": [],"jig_error": []},
                    {"jig_test": [],"jig_error": []}
                ],
            };
            globalContext.set("exportFile", exportFile);

            if(map === undefined){
                var map = {
                    "multimeter":    [ [],[],[],[],[],[],[],[],[],[] ],
                    "ac_power":      [ [],[],[],[],[],[],[],[],[],[] ],
                    "gpio":          [ [],[],[],[],[],[],[],[],[],[] ],
                    "communication": [ [],[],[],[],[],[],[],[],[],[] ],
                    "mux":           [ [],[],[],[],[],[],[],[],[],[] ],
                    "relay":         [ [],[],[],[],[],[],[],[],[],[] ],
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