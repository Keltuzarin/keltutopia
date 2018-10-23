var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.helloWorld('World');
    },

    // Update DOM on a Received Event
    helloWorld: function(txt) {
        console.log('Hello ' + txt);
    }
};

app.initialize();