dmdApp.value('dmdToastr', toastr);

dmdApp.factory('dmdNotifier', function(dmdToastr){
    return {
        notify : function(msg) {
            dmdToastr.success(msg);
            console.log(msg);
        },
        error : function(msg) {
            dmdToastr.error(msg);
            console.log(msg);
        }
    }
});