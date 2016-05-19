
define(['jquery','lodash','sockjs.reconnect','base.handlers'], function($,_,SockReconnect,base_handlers) {
    return function (baseurl,apikey,interface,handlers,router) {
        handlers = _.extend(base_handlers,handlers||{});
        router = router || function(message){
            var f = handlers[message.action];
            var g = (f?f(message):console.log('unknown action:',message.action,message));
        };
        var log     = [];
        var showlog = false;
        var logging = function(label,data){
            log.push([(new Date()).toString(),label,data]);
            log = log.slice(-20);
            if (showlog){
                console.info.apply(console,arguments);
            }
        };

        window.socklog = function(force){
            showlog = (force !== undefined)?force:!showlog;
            if (showlog){
                _.each(log,function(l){
                    console.info.apply(console,l);
                });
            }
            return showlog?'log visible':'log hidden';
        };

        var self     = this
            , auth   = false
            , events = {
                status : function(s){
                    logging('sock status:',s);
                }
                , onmessage : function(evt){
                    var data = $.parseJSON(evt.data);
                    if (data.action === 'connect' && data.auth){
                        auth = true;
                        delete data.auth;
                    }
                    logging('socket.Rx <==',data);
                    router(data);
                }
                , onopen : function() {
                    auth = false;
                    // console.info('put on your sock!');
                    $.ajax({url:baseurl + 'chat/cid/'+(apikey?apikey+'/':'')+interface+'/',type:'GET',dataType: "jsonp"})
                    .done(function( data ) {
                        // console.log('cid request:',data);
                        if (data && data.cid){
                            self.send('connect',{cid:data.cid});
                        }else{
                            console.error('No cid acquired',data);
                        }
                    });
                }
                , onclose : function() {
                    // console.info('your sock has fallen off!');
                }
            }
            , client     = new SockReconnect(baseurl+'sock/', null, events.status, events.onmessage, events.onopen, events.onclose)
        ;
        client.connect();

        // send an action to the server
        self.send = function(action,payload){
            if (!auth && action !== 'connect'){
                console.error('action failed -- not authorized:',action,payload);
                return;
            }
            var data = _.extend(payload||{},{'action':action});
            logging('socket.Tx ==>',[action,data]);
            client.send(JSON.stringify(data));
        };

    };
});














