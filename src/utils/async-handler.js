function asyncHandler(requestHander){
    return function(req, res, next){
        Promise
            .resolve(requestHander(res, req, next))
            .catch(function(err){
                next(err)
            });
    };
}

export {asyncHandler};