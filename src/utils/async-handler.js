function asyncHandler(requestHander){
    return function(req, res, next){
        Promise
            .resolve(requestHander(req, res, next))
            .catch(function(err){
                next(err)
            });
    };
}

export {asyncHandler};