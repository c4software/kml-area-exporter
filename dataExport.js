function extract(){

    if(lastLayer == undefined){
        alert("Aucune zone d'extraction defini.");
        return false;
    };

    var inBounds = [];
    bounds = lastLayer.getBounds();

    for(var i in myMarker){
        marker = myMarker[i];
        if (bounds.contains(marker.getLatLng())) {
            inBounds.push(marker.options.title);
        }
    }

    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(inBounds.join()));
    pom.setAttribute('download', 'extract.csv');
    pom.click();
}

L.Control.extractData = L.Control.extend({
        statics: {
            TITLE: 'Extract data',
            LABEL: 'D'
        },
        options: {
            position: 'topleft'
        },
        initialize: function (options) {
            L.Util.setOptions(this, options);
        },
        onAdd: function(map){
            // Initialize map control
            return this._initContainer();
        },
        _initContainer: function () {
            // Create a button, and bind click on hidden file input
            var zoomName = 'leaflet-control-filelayer leaflet-control-zoom',
                barName = 'leaflet-bar',
                partName = barName + '-part',
                container = L.DomUtil.create('div', zoomName + ' ' + barName);
            var link = L.DomUtil.create('a', zoomName + '-in ' + partName, container);
            link.innerHTML = L.Control.extractData.LABEL;
            link.href = '#';
            link.title = L.Control.extractData.TITLE;

            L.DomEvent.disableClickPropagation(link);
            L.DomEvent.on(link, 'click', function (e) {
                extract();
                e.preventDefault();
            });
            return container;
        }
});

function extractData(options) {
    return new L.Control.extractData(options);
};

