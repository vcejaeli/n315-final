var MODEL = (function() {

    var _getMyVariable = function (pageID) {

        $.get(`pages/${pageID}/${pageID}.html`,
        function(data) {
        $("#app").html(data);
    });
    }
    
    return {
        getMyVariable: _getMyVariable,
    };

})();

