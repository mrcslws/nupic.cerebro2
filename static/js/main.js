/* Main */

var params = {
        minX: intParam('minX') || 50,
        maxX: intParam('maxX') || 50,
        minY: intParam('minY') || 25,
        maxY: intParam('maxY') || 25,
        minZ: intParam('minZ') || 5,
        maxZ: intParam('maxZ') || 5,
        columnSparsity: intParam('columnSparsity') || 0.1,
        activeSparsity: intParam('activeSparsity') || 0.1,
        predictedSparsity: intParam('predictedSparsity') || 0.2,
        minProximal: intParam('minProximal') || 10,
        maxProximal: intParam('maxProximal') || 1000
    },
    loadLayersTimeoutDuration = intParam('loadLayersTimeoutDuration') || 0,
    modelURL = strParam('modelURL') || defaultModelURL(),
    visualizationClass = (strParam('visualizationClass') == "TwoDVisualization") ? TwoDVisualization : ThreeDVisualization,
    layerClass = (strParam('layerClass') == "TestNetworkLayer") ? TestNetworkLayer : TestLocalLayer,
    model = strParam('modelClass') == "TestModel" ? new TestModel(layerClass, params) : new NetworkReadonlyModel(modelURL);

var container = $('#container');

var history = new History();
var visualization = new visualizationClass(container, history);

visualization.loadLayersTimeoutDuration = loadLayersTimeoutDuration;
visualization.render();

runModel();

/* Functions */

function runModel() {
    model.getNextSnapshot(function(error, snapshot) {
        var delay = 1000;

        if (snapshot) {
            history.addSnapshot(snapshot);
            visualization.historyUpdated();

            delay = 0;
        }

        setTimeout(function() {
            runModel();
        }, delay);
    });
}

/* Utilities */

function intParam(key) {
    return Number(strParam(key));
}

function strParam(key) {
    return $.url().fparam(key);
}

function defaultModelURL() {
    return "http://" + window.location.hostname + ":9090/_model";
}
