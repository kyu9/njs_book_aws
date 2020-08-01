const redis = require('redis');
var json = require('JSON');
client = redis.createClient(6379, '127.0.0.1');

app.use(function(req, res, next){
    req.cache = client;
    next();
})

app.post('/',function(req, res, next){
    req.accepts('application/json');

    var key = req.body.name;
    var value = JSON.stringify(req.body);

    req.cache.set(key, value, function(err, data){
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        req.cache.expire(key, 20);
        res.json(value);
    });
})

app.get('/', function (req, res, next){
    var key = req.params.name;

    req.cache.get(key, function(err, data){
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        var value = JSON.parse(data);
        res.json(value);
    })
})