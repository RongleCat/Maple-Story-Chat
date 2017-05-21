var socketio = {};
var socket_io = require('socket.io');

//获取io  
socketio.getSocketio = function(server) {

    var io = socket_io.listen(server);
    var users = {};
    let id2name = {};

    //冒险岛聊天室
    io.sockets.on('connection', function(socket) {
        let userId = socket.id;
        io.sockets.emit('getUsers', users);
        console.log(userId + '连接了a');

        socket.on('changeItem', (data) => {
            if (users[id2name[userId]]) {
                users[id2name[userId]] = data;
                io.sockets.emit('changeItem', { name: id2name[userId], item: users[id2name[userId]] });
            }
        });
        socket.on('checkUserName', (data) => {
            if (data.userName.length >= 7) {
                socket.emit('checkUserName', { code: 0, msg: '昵称最多6个字！' });
            } else if (users[data.userName]) {
                socket.emit('checkUserName', { code: 0, msg: '重名啦！' });
            } else {
                socket.emit('checkUserName', { code: 200 });
            }
        });
        socket.on('addUsers', (data) => {
            users[data.userName] = data.userOpt
            id2name[userId] = data.userName;
            io.sockets.emit('getUsers', users);
            socket.emit('addUsersState', { code: 200, msg: '加入成功' });
        });
        socket.on('disconnect', function() {
            delete users[id2name[userId]];
            io.sockets.emit('getUsers', users);
        })
    });
    //小球移动部分逻辑
    // io.sockets.on('connection', function(socket) {
    //     let userId = socket.id;
    //     console.log(userId + '连接了');
    //     io.sockets.emit('getUsers', users);
    //     socket.on('addUsers', (data) => {
    //         if (users[data.myName]) {
    //             socket.emit('addUsersState',{code:0,msg:'重名啦！'});
    //         } else {
    //             let top = Math.round(Math.random() * 699 + 1);
    //             let left = Math.round(Math.random() * 999 + 1);
    //             users[data.myName] = {
    //                 top: top + 'px',
    //                 left: left + 'px',
    //                 background: '#' + Math.floor(Math.random() * 16777215).toString(16)
    //             }
    //             id2name[userId] = data.myName;
    //             io.sockets.emit('getUsers', users);
    //             socket.emit('addUsersState',{code:200,msg:'加入成功',pos:{top:top,left:left}});
    //         }
    //     });
    //     socket.on('changePos', (data) => {
    //         users[id2name[userId]].top = data.top+'px';
    //         users[id2name[userId]].left = data.left+'px';

    //         console.log(users[id2name[userId]]);
    //         io.sockets.emit('changeItem', {name:id2name[userId],item:users[id2name[userId]]});
    //     });
    //     socket.on('disconnect', function() {
    //         delete users[id2name[userId]];
    //         io.sockets.emit('getUsers', users);
    //     })
    // })
};



module.exports = socketio;