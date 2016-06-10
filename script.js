/**
 * Created by Nick on 2/27/2016.
 */

//assign color values to different buttons
var aCol = [0,130,130];
var sCol = [0,0,255];
var dCol = [0,255,0];
var fCol = [130,0,130];
var gCol = [130,130,0];
var hCol = [255,0,0];
var jCol = [50,0,200];
var kCol = [200,0,100];
var lCol = [100,100,100];


//determines the boundaries of two divs on a page, determines of they overlap
//  if so, change modal backdrop image based on which modal trigger was clicked
/*
function cursorHover(item, index){

    //the 'cursor'
    var div1 = $('#player');
    var l1 = div1.offset().left;//left bound
    var t1 = div1.offset().top;//top bound
    var h1 = div1.outerHeight(false);//height
    var w1 = div1.outerWidth(false);//width
    var b1 = t1 + h1;//bottom bound
    var r1 = l1 + w1;//right bound

    var div2 = $(item);
    //the 'info' boxes
    var l2 = div2.offset().left;
    var t2 = div2.offset().top;
    var h2 = div2.outerHeight(false);
    var w2 = div2.outerWidth(false);
    var b2 = t2 + h2;
    var r2 = l2 + w2;

    //console.log('player bounds L' + l1 + ' T' + t1 + ' R' + r1 + ' B' + b1);
    //console.log(index+1 + 'box bounds L' + l2 + ' T' + t2 + ' R' + r2 + ' B' + b2);

    if (!(b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) ) {
        //console.log('target hit');
        var target = $('#modal' + (index+1));

        target.modal('show');
        switch(index){
            case 0:
                target.data('bs.modal').$backdrop.css('background',"url(resources/clouds.png)");
                break;
            case 1:
                target.data('bs.modal').$backdrop.css('background',"url(resources/rain.jpg)");
                break;
            case 2:
                target.data('bs.modal').$backdrop.css('background',"url(resources/wet_cave.jpg)");
                break;
            case 3:
                target.data('bs.modal').$backdrop.css('background',"url(resources/pointy.jpg) no-repeat");
                target.data('bs.modal').$backdrop.css('background-size',"cover");
                break;
            case 4:
                target.data('bs.modal').$backdrop.css('background',"url(resources/leaves.jpg)");
                break;
            case 5:
                target.data('bs.modal').$backdrop.css('background',"url(resources/grue.jpg)");
                target.data('bs.modal').$backdrop.css('background-size',"cover");
                break;
            default:
                console.log("congratulations, you broke it");
        };
    }
}
*/

// FUNCTIONS USED BY BOTH  MAIN AND PROJECTS CONTROLLERS
function mousePos( $event ) {
    var xPos = $event.screenX;
    var yPos = $event.screenY;
    return {x: xPos, y: yPos};
}

function centerPt(target){
    //console.log(target, target.offset());
    var targetOffset = target.offset();
    return {
        top: targetOffset.top + (target.height() * 2),
        left: targetOffset.left + (target.width() / 2)
    };
}

function findDist(targetCenter, xPos, yPos)
{
    return (Math.pow(targetCenter.left - xPos,2) + Math.pow(targetCenter.top - yPos,2));
}
// END OF FUNCTIONS USED BY BOTH  MAIN AND PROJECTS CONTROLLERS

/*
* ANGULAR ROUTES START
*
* */
var app = angular.module('routingApp', ['ngRoute']);

app.service('routeService', function(){

});

app.controller('routeCtrl', function($scope, routeService){

    //populating variable default values
    $scope.xPos = 0;
    $scope.yPos = 0;
    $scope.goRight = false;

    //function currentPos
    //  finds and sets xPos and yPos
    //      centers player icon on mouse position
    $scope.currentPos = function( $event ) {
        var coords = mousePos($event);
        if ( coords.x > $scope.xPos -1 )
        {
            $scope.mouseDirect = {'cursor': 'url(resources/dogstandR.png) 32 40, auto'};
        }
        else
        {
            $scope.mouseDirect = {'cursor': 'url(resources/dogstandL.png) 32 40, auto'};
        }
        $scope.xPos = coords.x;
        //console.log($scope.goRight);
    };

    $scope.getBounds = function(element) {
        return routeService.elemBounds(element);
    };
});

app.config(function($routeProvider) {
    $routeProvider
    //default and main
        .when('/main',{
            templateUrl: 'main.html',
            controller: 'mainCtrl'
        })
        //projects page
        .when('/projects',{
            templateUrl: 'projects.html',
            controller: 'projCtrl'
        })
        //error catch
        .otherwise({
            redirectTo:'/main'
        })
});

app.service('mainService', function(){

    this.changeModalBG = function(targetIndex)
    {
        var target = $('#modal' + (targetIndex));

        target.modal('show');
        switch(targetIndex){
            case 1:
                target.data('bs.modal').$backdrop.css('background',"url(resources/clouds.png)");
                break;
            case 2:
                target.data('bs.modal').$backdrop.css('background',"url(resources/rain.jpg)");
                break;
            case 3:
                target.data('bs.modal').$backdrop.css('background',"url(resources/wet_cave.jpg)");
                break;
            case 4:
                target.data('bs.modal').$backdrop.css('background',"url(resources/pointy.jpg) no-repeat");
                target.data('bs.modal').$backdrop.css('background-size',"cover");
                break;
            case 5:
                target.data('bs.modal').$backdrop.css('background',"url(resources/leaves.jpg)");
                break;
            case 6:
                target.data('bs.modal').$backdrop.css('background',"url(resources/grue.jpg)");
                target.data('bs.modal').$backdrop.css('background-size',"cover");
                break;
            default:
                console.log("congratulations, you broke it");
        };
        //$('.modal-backdrop').data('bs.modal').$backdrop.css('background-image','url(' + targetUrl + ')');
    }
});

app.controller('mainCtrl', function($scope, mainService) {

    /*
     * only have to get mouse location, don't have to get info from main controller
     * can get mouse position independent of routeCtrl
     *
     * can target elements on page only from matching controller, no inheriting/binding
     * i.e. routeCtrl can move cursor when getting mousemove location
     * and mainCtrl can get button positions/change BGcolor when getting mouse information
     * but neither should interact
     * */

    //$scope.targetElem = $('[data-target=#modal1]');
    //console.log($scope.targetElem);

    //populating variable default values
    var self = this;
    $scope.xPos = 0;
    $scope.yPos = 0;
    $scope.maxDistance = 50000;
    $scope.bgRed = 1;
    $scope.bgGrn = 18;
    $scope.bgBlu = 40;

    // find coordinates for the center of each button on page
    //console.log($('[data-target="#modal1"] > div'));
    this.aFar = centerPt($('[data-target="#modal1"] > div'));
    this.sFar = centerPt($('[data-target="#modal2"] > div'));
    this.dFar = centerPt($('[data-target="#modal3"] > div'));
    this.fFar = centerPt($('[data-target="#modal4"] > div'));
    this.gFar = centerPt($('[data-target="#modal5"] > div'));
    this.hFar = centerPt($('[data-target="#modal6"] > div'));

    //console.log(this.aFar, this.sFar, this.dFar, this.fFar, this.gFar, this.hFar);

    $scope.updateBGcolor = function ($event) {

        $('.modal-dialog').hover(function() {
            $('.modal-dialog').css('cursor', 'default');
        });

        var coords = mousePos($event);

        $scope.xPos = coords.x;
        $scope.yPos = coords.y;

        //calculate distances from points (currently top-left corner of divs)
        this.distA = findDist(self.aFar, $scope.xPos, $scope.yPos);
        this.distS = findDist(self.sFar, $scope.xPos, $scope.yPos);
        this.distD = findDist(self.dFar, $scope.xPos, $scope.yPos);
        this.distF = findDist(self.fFar, $scope.xPos, $scope.yPos);
        this.distG = findDist(self.gFar, $scope.xPos, $scope.yPos);
        this.distH = findDist(self.hFar, $scope.xPos, $scope.yPos);

        //console.log(this.distA, this.distS, this.distD, this.distF, this.distG, this.distH);

        //if past a certain amount of distance, give no weight to that color
        if (this.distA > $scope.maxDistance) {
            this.distA = $scope.maxDistance;
        }
        if (this.distS > $scope.maxDistance) {
            this.distS = $scope.maxDistance;
        }
        if (this.distD > $scope.maxDistance) {
            this.distD = $scope.maxDistance;
        }
        if (this.distF > $scope.maxDistance) {
            this.distF = $scope.maxDistance;
        }
        if (this.distG > $scope.maxDistance) {
            this.distG = $scope.maxDistance;
        }
        if (this.distH > $scope.maxDistance) {
            this.distH = $scope.maxDistance;
        }
        //console.log(this.distA);

        //turn smaller distance into greater color 'weight'
        $scope.bgRed = Math.floor((
                (1 - (this.distA / this.maxDistance) ) * aCol[0] +
                (1 - (this.distS / this.maxDistance) ) * sCol[0] +
                (1 - (this.distD / this.maxDistance) ) * dCol[0] +
                (1 - (this.distF / this.maxDistance) ) * fCol[0] +
                (1 - (this.distG / this.maxDistance) ) * gCol[0] +
                (1 - (this.distH / this.maxDistance) ) * hCol[0]
            ) /3);
        $scope.bgGrn = Math.floor((
                (1 - (this.distA / this.maxDistance) ) * aCol[1] +
                (1 - (this.distS / this.maxDistance) ) * sCol[1] +
                (1 - (this.distD / this.maxDistance) ) * dCol[1] +
                (1 - (this.distF / this.maxDistance) ) * fCol[1] +
                (1 - (this.distG / this.maxDistance) ) * gCol[1] +
                (1 - (this.distH / this.maxDistance) ) * hCol[1]
            ) /3);
        $scope.bgBlu = Math.floor((
                (1 - (this.distA / this.maxDistance) ) * aCol[2] +
                (1 - (this.distS / this.maxDistance) ) * sCol[2] +
                (1 - (this.distD / this.maxDistance) ) * dCol[2] +
                (1 - (this.distF / this.maxDistance) ) * fCol[2] +
                (1 - (this.distG / this.maxDistance) ) * gCol[2] +
                (1 - (this.distH / this.maxDistance) ) * hCol[2]
            ) /3);
    };

    $scope.modalClick = function( modalIndex )
    {
        mainService.changeModalBG(modalIndex);
    };
});

app.service('projService', function(){
    //to be continued
});

app.controller('projCtrl', function($scope, projService){

    //populating variable default values
    var self = this;
    $scope.xPos = 0;
    $scope.yPos = 0;
    $scope.maxDistance = 50000;
    $scope.bgRed = 1;
    $scope.bgGrn = 18;
    $scope.bgBlu = 40;

    // find coordinates for the center of each button on page
    //console.log($('[data-target="#modal1"] > div'));
    this.aFar = centerPt($('[data-target="#modal1"] > div'));
    this.sFar = centerPt($('[data-target="#modal2"] > div'));
    this.dFar = centerPt($('[data-target="#modal3"] > div'));
    this.fFar = centerPt($('[data-target="#modal4"] > div'));
    this.gFar = centerPt($('[data-target="#modal5"] > div'));
    this.hFar = centerPt($('[data-target="#modal6"] > div'));
    this.jFar = centerPt($('[data-target="#modal7"] > div'));
    this.kFar = centerPt($('[data-target="#modal8"] > div'));
    this.lFar = centerPt($('[data-target="#modal9"] > div'));

    //console.log(this.aFar, this.sFar, this.dFar, this.fFar, this.gFar, this.hFar);

    $scope.updateBGcolor = function ($event) {

        $('.modal-dialog').hover(function() {
            $('.modal-dialog').css('cursor', 'default');
        });

        var coords = mousePos($event);

        $scope.xPos = coords.x;
        $scope.yPos = coords.y;

        //calculate distances from points (currently top-left corner of divs)
        this.distA = findDist(self.aFar, $scope.xPos, $scope.yPos);
        this.distS = findDist(self.sFar, $scope.xPos, $scope.yPos);
        this.distD = findDist(self.dFar, $scope.xPos, $scope.yPos);
        this.distF = findDist(self.fFar, $scope.xPos, $scope.yPos);
        this.distG = findDist(self.gFar, $scope.xPos, $scope.yPos);
        this.distH = findDist(self.hFar, $scope.xPos, $scope.yPos);
        this.distJ = findDist(self.jFar, $scope.xPos, $scope.yPos);
        this.distK = findDist(self.kFar, $scope.xPos, $scope.yPos);
        this.distL = findDist(self.lFar, $scope.xPos, $scope.yPos);


        //console.log(this.distA, this.distS, this.distD, this.distF, this.distG, this.distH);

        //if past a certain amount of distance, give no weight to that color
        if (this.distA > $scope.maxDistance) {
            this.distA = $scope.maxDistance;
        }
        if (this.distS > $scope.maxDistance) {
            this.distS = $scope.maxDistance;
        }
        if (this.distD > $scope.maxDistance) {
            this.distD = $scope.maxDistance;
        }
        if (this.distF > $scope.maxDistance) {
            this.distF = $scope.maxDistance;
        }
        if (this.distG > $scope.maxDistance) {
            this.distG = $scope.maxDistance;
        }
        if (this.distH > $scope.maxDistance) {
            this.distH = $scope.maxDistance;
        }
        if (this.distJ > $scope.maxDistance) {
            this.distJ = $scope.maxDistance;
        }
        if (this.distK > $scope.maxDistance) {
            this.distK = $scope.maxDistance;
        }
        if (this.distL > $scope.maxDistance) {
            this.distL = $scope.maxDistance;
        }
        //console.log(this.distA);

        //turn smaller distance into greater color 'weight'
        $scope.bgRed = Math.floor((
                (1 - (this.distA / this.maxDistance) ) * aCol[0] +
                (1 - (this.distS / this.maxDistance) ) * sCol[0] +
                (1 - (this.distD / this.maxDistance) ) * dCol[0] +
                (1 - (this.distF / this.maxDistance) ) * fCol[0] +
                (1 - (this.distG / this.maxDistance) ) * gCol[0] +
                (1 - (this.distH / this.maxDistance) ) * hCol[0] +
                (1 - (this.distJ / this.maxDistance) ) * jCol[0] +
                (1 - (this.distK / this.maxDistance) ) * kCol[0] +
                (1 - (this.distL / this.maxDistance) ) * lCol[0]
            ) /3);
        $scope.bgGrn = Math.floor((
                (1 - (this.distA / this.maxDistance) ) * aCol[1] +
                (1 - (this.distS / this.maxDistance) ) * sCol[1] +
                (1 - (this.distD / this.maxDistance) ) * dCol[1] +
                (1 - (this.distF / this.maxDistance) ) * fCol[1] +
                (1 - (this.distG / this.maxDistance) ) * gCol[1] +
                (1 - (this.distH / this.maxDistance) ) * hCol[1] +
                (1 - (this.distJ / this.maxDistance) ) * jCol[1] +
                (1 - (this.distK / this.maxDistance) ) * kCol[1] +
                (1 - (this.distL / this.maxDistance) ) * lCol[1]
            ) /3);
        $scope.bgBlu = Math.floor((
                (1 - (this.distA / this.maxDistance) ) * aCol[2] +
                (1 - (this.distS / this.maxDistance) ) * sCol[2] +
                (1 - (this.distD / this.maxDistance) ) * dCol[2] +
                (1 - (this.distF / this.maxDistance) ) * fCol[2] +
                (1 - (this.distG / this.maxDistance) ) * gCol[2] +
                (1 - (this.distH / this.maxDistance) ) * hCol[2] +
                (1 - (this.distJ / this.maxDistance) ) * jCol[2] +
                (1 - (this.distK / this.maxDistance) ) * kCol[2] +
                (1 - (this.distL / this.maxDistance) ) * lCol[2]
            ) /3);
    };
});

/*
* ANGULAR ROUTES END
* */

/*
$(document).ready(function() {

    var self = this;

    //accepts a jQuery object (assumed to be a div) and returns an object containing center-point of the passed object
    this.centerPt = function(target){
        console.log(target, target.offset());
        return {
            top: target.offset().top + (target.height() / 2),
            left: target.offset().left + (target.width() / 2)
        };
    };

    // find coordinates for the center of each button on page
    console.log($('[data-target="#modal1"] > div'));
    this.aFar = this.centerPt($('[data-target="#modal1"] > div'));
    this.sFar = this.centerPt($('[data-target="#modal2"] > div'));
    this.dFar = this.centerPt($('[data-target="#modal3"] > div'));
    this.fFar = this.centerPt($('[data-target="#modal4"] > div'));
    this.gFar = this.centerPt($('[data-target="#modal5"] > div'));
    this.hFar = this.centerPt($('[data-target="#modal6"] > div'));

    /*
    console.log(this.aFar.left, this.aFar.top);
    console.log(this.sFar.left, this.sFar.top);
    console.log(this.dFar.left, this.dFar.top);
    console.log(this.fFar.left, this.fFar.top);
    console.log(this.gFar.left, this.gFar.top);
    console.log(this.hFar.left, this.hFar.top);


    $(document).click(function() {
        if ($('.modal-backdrop.fade.in').length < 1)
        {
            $('.info').each(function(i){
                cursorHover(this, i);
            });
        }
    });

    $(document).mousemove(function( event ) {

        //cause dog to flip direction
        if (event.pageX > xPos)
        {
            $('#player').addClass('flipRight');
        }
        else
        {
            $('#player').removeClass('flipRight');
        }

        //get location data from mouse position
        xPos = event.pageX;
        yPos = event.pageY;

        $('#player').css({
            left:  xPos -36,
            top:   yPos -28
        });

        //calculate distances from points (currently top-left corner of divs)
        this.distA = (Math.pow(self.aFar.left - xPos,2) + Math.pow(self.aFar.top - yPos,2)); //Math.abs
        this.distS = (Math.pow(self.sFar.left - xPos,2) + Math.pow(self.sFar.top - yPos,2));
        this.distD = (Math.pow(self.dFar.left - xPos,2) + Math.pow(self.dFar.top - yPos,2));
        this.distF = (Math.pow(self.fFar.left - xPos,2) + Math.pow(self.fFar.top - yPos,2));
        this.distG = (Math.pow(self.gFar.left - xPos,2) + Math.pow(self.gFar.top - yPos,2));
        this.distH = (Math.pow(self.hFar.left - xPos,2) + Math.pow(self.hFar.top - yPos,2));

        //$( "#log" ).text( "distA: " + this.distA + ", distS: " + this.distS + ", distD: " + this.distD + ", distF: " + this.distF );

        this.maxDistance = 50000;

        //if past a certain amount of distance, give no weight to that color
        if (this.distA > this.maxDistance){this.distA = this.maxDistance;}
        if (this.distS > this.maxDistance){this.distS = this.maxDistance;}
        if (this.distD > this.maxDistance){this.distD = this.maxDistance;}
        if (this.distF > this.maxDistance){this.distF = this.maxDistance;}
        if (this.distG > this.maxDistance){this.distG = this.maxDistance;}
        if (this.distH > this.maxDistance){this.distH = this.maxDistance;}

        //turn smaller distance into greater color 'weight'
        this.bgRed = Math.floor((
                (1 - (this.distA / this.maxDistance) )*aCol[0] +
                (1 - (this.distS / this.maxDistance) )*sCol[0] +
                (1 - (this.distD / this.maxDistance) )*dCol[0] +
                (1 - (this.distF / this.maxDistance) )*fCol[0] +
                (1 - (this.distG / this.maxDistance) )*gCol[0] +
                (1 - (this.distH / this.maxDistance) )*hCol[0]
            )/3);
        this.bgGrn = Math.floor((
                (1 - (this.distA / this.maxDistance) )*aCol[1] +
                (1 - (this.distS / this.maxDistance) )*sCol[1] +
                (1 - (this.distD / this.maxDistance) )*dCol[1] +
                (1 - (this.distF / this.maxDistance) )*fCol[1] +
                (1 - (this.distG / this.maxDistance) )*gCol[1] +
                (1 - (this.distH / this.maxDistance) )*hCol[1]
            )/3);
        this.bgBlu = Math.floor((
                (1 - (this.distA / this.maxDistance) )*aCol[2] +
                (1 - (this.distS / this.maxDistance) )*sCol[2] +
                (1 - (this.distD / this.maxDistance) )*dCol[2] +
                (1 - (this.distF / this.maxDistance) )*fCol[2] +
                (1 - (this.distG / this.maxDistance) )*gCol[2] +
                (1 - (this.distH / this.maxDistance) )*hCol[2]
            )/3);

        //make background calculated color
        $('body > div').css( "background-color", "rgb(" + this.bgRed + "," + this.bgGrn + "," + this.bgBlu +")" ) ;//= [0,this.bgGrn,0]; //[this.bgRed,this.bgGrn,this.bgBlu];

    });
});
*/