/**
 * Created by Nick on 2/27/2016.
 */

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

$(document).ready(function() {

    this.self = this;

    //prepare to store position
    this.xPos = 0;
    this.yPos = 0;

    //assign color values to different buttons
    this.aCol = [0,130,130];
    this.sCol = [0,0,130];
    this.dCol = [0,130,0];
    this.fCol = [130,0,130];
    this.gCol = [130,130,0];
    this.hCol = [130,0,0];

    //accepts a jQuery object (assumed to be a div) and returns an object containing center-point of the passed object
    this.centerPt = function(target){
        return {
            top: target.offset().top + (target.height() / 2),
            left: target.offset().left + (target.width() / 2)
        };
    };

    // find coordinates for the center of each button on page
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
    */

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
        if (event.pageX > this.xPos)
        {
            $('#player').addClass('flipRight');
        }
        else
        {
            $('#player').removeClass('flipRight');
        }

        //get location data from mouse position
        this.xPos = event.pageX;
        this.yPos = event.pageY;

        $('#player').css({
            left:  this.self.xPos -36,
            top:   this.self.yPos -28
        });

        //calculate distances from points (currently top-left corner of divs) - simple a^2 + b^2 = c^2
        //  currently not bothering with taking square root of c, proportions of distance still have correct ratio
        this.distA = (Math.pow(this.aFar.left - this.xPos,2) + Math.pow(this.aFar.top - this.yPos,2)); //Math.abs
        this.distS = (Math.pow(this.sFar.left - this.xPos,2) + Math.pow(this.sFar.top - this.yPos,2));
        this.distD = (Math.pow(this.dFar.left - this.xPos,2) + Math.pow(this.dFar.top - this.yPos,2));
        this.distF = (Math.pow(this.fFar.left - this.xPos,2) + Math.pow(this.fFar.top - this.yPos,2));
        this.distG = (Math.pow(this.gFar.left - this.xPos,2) + Math.pow(this.gFar.top - this.yPos,2));
        this.distH = (Math.pow(this.hFar.left - this.xPos,2) + Math.pow(this.hFar.top - this.yPos,2));

        // maximum distance for color to have influence in - currently arbitrary
        this.maxDistance = 60000;

        //if past a certain amount of distance, give no weight to that color
        if (this.distA > this.maxDistance){this.distA = this.maxDistance;}
        if (this.distS > this.maxDistance){this.distS = this.maxDistance;}
        if (this.distD > this.maxDistance){this.distD = this.maxDistance;}
        if (this.distF > this.maxDistance){this.distF = this.maxDistance;}
        if (this.distG > this.maxDistance){this.distG = this.maxDistance;}
        if (this.distH > this.maxDistance){this.distH = this.maxDistance;}

        //turn smaller distance into greater color 'weight'
        this.bgRed = Math.floor((
                (1 - (this.distA / this.maxDistance) )*this.aCol[0] +
                (1 - (this.distS / this.maxDistance) )*this.sCol[0] +
                (1 - (this.distD / this.maxDistance) )*this.dCol[0] +
                (1 - (this.distF / this.maxDistance) )*this.fCol[0] +
                (1 - (this.distG / this.maxDistance) )*this.gCol[0] +
                (1 - (this.distH / this.maxDistance) )*this.hCol[0]
            )/3);
        this.bgGrn = Math.floor((
                (1 - (this.distA / this.maxDistance) )*this.aCol[1] +
                (1 - (this.distS / this.maxDistance) )*this.sCol[1] +
                (1 - (this.distD / this.maxDistance) )*this.dCol[1] +
                (1 - (this.distF / this.maxDistance) )*this.fCol[1] +
                (1 - (this.distG / this.maxDistance) )*this.gCol[1] +
                (1 - (this.distH / this.maxDistance) )*this.hCol[1]
            )/3);
        this.bgBlu = Math.floor((
                (1 - (this.distA / this.maxDistance) )*this.aCol[2] +
                (1 - (this.distS / this.maxDistance) )*this.sCol[2] +
                (1 - (this.distD / this.maxDistance) )*this.dCol[2] +
                (1 - (this.distF / this.maxDistance) )*this.fCol[2] +
                (1 - (this.distG / this.maxDistance) )*this.gCol[2] +
                (1 - (this.distH / this.maxDistance) )*this.hCol[2]
            )/3);

        //make background calculated color
        $('body > div').css( "background-color", "rgb(" + this.bgRed + "," + this.bgGrn + "," + this.bgBlu +")" ) ;//= [0,this.bgGrn,0]; //[this.bgRed,this.bgGrn,this.bgBlu];

    });

    //$('#modal1').data('bs.modal').$backdrop.css('background',"url(resources/clouds.png)");
});