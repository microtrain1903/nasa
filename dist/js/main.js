var apod = {
    //Application Constructor
    init: function(){
        this.getRequest();
    },
    //Create a random date
    randomDate: function(start, end) {
        //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
        let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
        //Format the date
        let d = date.getDate();
        let m = date.getMonth() + 1; //In JS months start at 0
        let y = date.getFullYear();
    
        //Change the maonth and day strings so that they match the documented format.
        if(m < 10){
        m = '0'+m
        }
    
        if(d < 10){
        d = '0'+d
        }
    
        return `${y}-${m}-${d}`;
    },
    getRequest: function(){
        var _this = this;
        var date = this.randomDate(new Date(1995,5,16), new Date());
        //var date = "2013-06-06";
        var url = "https://api.nasa.gov/planetary/apod?api_key=" + nasaKey + "&date=" + date;
        $.ajax({
            url: url
        }).done(function(result){ 
            console.log(result);
            _this.buildDOM(result);
            
        }).fail(function(result){
          console.log(result);
        }); 
    },
    buildDOM: function(result){
        //If the media type is video hide the image elements and display a video.
        if(result.media_type === 'video') {
            $("#apodImg").hide();
            $("#apodVideo > iframe").attr("src", result.url).show();
        }else{
            $("#apodVideo").hide();
            $("#apodImg").attr("src", result.url).attr('alt', result.title).show();
        }
        $("#apodTitle").text(result.title);
        $("#apodCopyright").text("Copyright: " + result.copyright);
        $("#apodDate").text("Date: " + result.date);
        $("#apodDesc").text(result.explanation);
    }
};


    $('#btnRandApod').on('click',function(){
      apod.getRequest();
    });


//apod.init();


var date = "2013-06-06";
var answer="";
var url = "https://api.nasa.gov/planetary/apod?api_key=" + nasaKey + "&date=" + date;
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        answer = this.responseText;
        console.log(answer);
        answer = JSON.parse(answer);
        console.log(answer);
    };
    xhttp.open("GET", url, true);
    xhttp.send(); 
}

loadDoc();


