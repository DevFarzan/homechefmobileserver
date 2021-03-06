var express        = require('express'),
    glob           = require('glob'),
    app            = express(),
    favicon        = require('serve-favicon'),
    logger         = require('morgan'),
    cookieParser   = require('cookie-parser'),
    bodyParser     = require('body-parser'),
    compress       = require('compression'),
    methodOverride = require('method-override');

module.exports = function(app, config) {
    var env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';

    app.use(logger('dev'));
    app.use(function(req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        next();
    });

    app.use(bodyParser.json());         //use for JSON form data uploading
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb'
    }));
    app.use(cookieParser());
    app.use(compress());
    app.use(methodOverride());
   
    /*var controllers1 = glob.sync(config.root + '/app/controller/home.js');

    controllers1.forEach(function (controller) {
        require(controller)(app);
    });*/

    var homeControllers = glob.sync(config.root +'/app/controller/home.js');

   homeControllers.forEach(function(controller){
      require(controller)(app);
   })
    
    var controllers3 = glob.sync(config.root + '/app/controller/getAllUsersDishes.js');

    controllers3.forEach(function (controller) {
        require(controller)(app);
    });
  var userFormController = glob.sync(config.root + '/app/controller/userFormData.js');

    userFormController.forEach(function (controller) {
        require(controller)(app);
    });
    var emailForUserFormData = glob.sync(config.root + '/app/controller/emailSubscription.js');

    emailForUserFormData.forEach(function (controller) {
        require(controller)(app);
    });
    var userLogin = glob.sync(config.root + '/app/controller/userLogin.js');

    userLogin.forEach(function (controller) {
        require(controller)(app);
    });
   
    /*var userSignup = glob.sync(config.root + '/app/controller/usersignup.js');

    userSignup.forEach(function (controller) {
        require(controller)(app);

    });*/
    /*var controllers8 = glob.sync(config.root + '/app/controllers/getDoctorDetailAPI.js');

    controllers8.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers9 = glob.sync(config.root + '/app/controllers/getMachineStatusAPI.js');

    controllers9.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers10 = glob.sync(config.root + '/app/controllers/getAllAppointmentsAPI.js');

    controllers10.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers12 = glob.sync(config.root + '/app/controllers/doctorLoginAPI.js');

    controllers12.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers13 = glob.sync(config.root + '/app/controllers/getAllUsersAPI.js');

    controllers13.forEach(function (controller) {
        require(controller)(app);
    });

    var controllers14 = glob.sync(config.root + '/app/controllers/changeDoctorStatusAPI.js');

    controllers14.forEach(function (controller) {
        require(controller)(app);
    });

    var controllers15 = glob.sync(config.root + '/app/controllers/changeServeNumberAPI.js');

    controllers15.forEach(function (controller) {
        require(controller)(app);
    });

    var controllers16 = glob.sync(config.root + '/app/controllers/getPastAppointmentsAPI.js');

    controllers16.forEach(function (controller) {
        require(controller)(app);
    });

    var controllers17 = glob.sync(config.root + '/app/controllers/rescheduleAPI.js');

    controllers17.forEach(function (controller) {
        require(controller)(app);
    });

    var controllers18 = glob.sync(config.root + '/app/controllers/cancelAppointmentAPI.js');

    controllers18.forEach(function (controller) {
        require(controller)(app);
    });

    var controllers19 = glob.sync(config.root + '/app/controllers/adminLoginAPI.js');

    controllers19.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers20 = glob.sync(config.root + '/app/controllers/addReviewsAPI.js');

    controllers20.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers21 = glob.sync(config.root + '/app/controllers/addAdminAPI.js');

    controllers21.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers22 = glob.sync(config.root + '/app/controllers/getAdminAppointmentsAPI.js');

    controllers22.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers23 = glob.sync(config.root + '/app/controllers/addSuperAdminAPI.js');

    controllers23.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers24 = glob.sync(config.root + '/app/controllers/deleteDoctorAPI.js');

    controllers24.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers25 = glob.sync(config.root + '/app/controllers/deleteClinicAPI.js');

    controllers25.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers26 = glob.sync(config.root + '/app/controllers/getAdminsAPI.js');

    controllers26.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers27 = glob.sync(config.root + '/app/controllers/getAdminDetailAPI.js');

    controllers27.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers28 = glob.sync(config.root + '/app/controllers/deleteAdminAPI.js');

    controllers28.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers29 = glob.sync(config.root + '/app/controllers/addAdminAPI.js');

    controllers29.forEach(function (controller) {
        require(controller)(app);
    });
    var controllers30 = glob.sync(config.root + '/app/controllers/findClinicAPI.js');

    controllers30.forEach(function (controller) {
        require(controller)(app);
    });
*/
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if(app.get('env') === 'development'){
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.send(err);
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(err);
    });
};
