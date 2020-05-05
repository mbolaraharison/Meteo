$(document).ready(function(){

    function hint(response){
            var selected = "";
            var tmp_names = [];
            var names = [];
            var ids = [];
            var str = "";
            str = $('#tags').val();
            str = str.toLowerCase();
            var i=0;
            while(i<response.length){
                var tmp = response[i].name+','+response[i].country+','+response[i].id;
                var name = tmp.toLowerCase();
                if(str.length>0 && str.localeCompare(name.substring(0,str.length))==0 && $.inArray(tmp, tmp_names)==-1){
                    $('#tags').addClass('sph-widget');
                    tmp_names.push(tmp);
                    if(tmp_names.length==10){
                        break;
                    }
                }
                i++;
            }
            if(tmp_names.length != 0){
                tmp_names = tmp_names.sort();
                for(var i=0; i<tmp_names.length;i++){
                    var my_split = tmp_names[i].split(',');
                    var tmp = my_split[2];
                    ids[i] = tmp;
                    names[i] = my_split[0]+','+my_split[1];
                }
            }
            resp = names;
            $( "#tags" ).autocomplete({ 
                source: names,
                minLength: 0,
                delay:0,
                search: function(e,ui){
                    $('#tags').removeClass('sph-widget');
                    $(this).data("ui-autocomplete").menu.bindings = $();
                },
                select: function(e, ui){
                    selected = ui.item.value;
                    var my_id = "";
                    var i=0;
                    while(i<names.length){
                        if(names[i].localeCompare(selected)==0){
                            my_id = ids[i];
                            break;
                        }
                        i++;
                    }
                    window.location.replace('/'+my_id);
                }
              }).bind('focus', function(){ $(this).autocomplete("search"); });
    }

    $.ajax({
        url: "js/cities.json",
      }).done(function(response) {
        
        $('#tags').on('input',function(){
            hint(response);
        });

        $('#tags').on('keydown',function(e){
            if(e.key.localeCompare("Backspace")==0){
                hint(response);
            }
        });
        /*$('#tags').blur(function(){
            var val = $('#tags').val();
            if(val.localeCompare(selected)!=0){
                $('#tags').val("");
            }
        });*/
      });
});

$(document).ready(function(){
    $('#location_id').on('click', function(){
        if ("geolocation" in navigator){ //check geolocation available 
            //try to get user current location using getCurrentPosition() method
            navigator.geolocation.getCurrentPosition(function(position){ 
                    console.log(position.coords.latitude+","+ position.coords.longitude);
                    window.location.replace('/'+position.coords.latitude+'/'+position.coords.longitude);
                });
        }else{
            console.log("Browser doesn't support geolocation!");
        }
    });
});