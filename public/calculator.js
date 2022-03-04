var screen = document.getElementsByTagName('INPUT')[0];
var form = document.getElementsByTagName('FORM')[0];
var sign = ['*', '+', '-', '/']
var valid_keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']

screen.addEventListener('focusin', function(){
    if(this.value=='0') this.value = '';
})

screen.addEventListener('focusout', function(){
    if(this.value=='') this.value = '0';
})

screen.onkeydown = function(event){
    var key = event.key;

    if(key=="F5") location.reload();
    if(key=="Backspace" || key==" " || key=="ArrowLeft" || key=="ArrowRight")  return;
    if(key=="Enter"){
        this.value = calculate(this.value);
        return;
    }

    event.preventDefault();
    if((!search_sign(key)) || (!search_number(key))) add(key);
}

form.onsubmit = function(event){
    event.preventDefault();
    screen.value = calculate(screen.value);
}

function add(element){
    let val = element;
    let result = "";

    if(screen.value=='Error') screen.value = '';

    if((screen.value=='0' || screen.value=='Infinity') && (search_sign(val) && val!='.')) screen.value = '';

    if((!search_sign(val) && !search_sign(screen.value.substr(-1))) || (val=='.' && !search_sign(screen.value.substr(-1))) || (!search_sign(val) && screen.value.substr(-1)=='.' )){
        screen.value = screen.value.substr(0, screen.value.length-1);
        result = val;
    }

    if(val=='1/x')  result = inverse(calculate(screen.value));
    else result = screen.value + val;

    if(screen.value=='Infinity' && val=='.') result = 'Infinity';

    if(val=='.' && dot_control(screen.value)) result = screen.value;

    screen.value = result;
}

function calculate(oepration){
    if(!search_sign(screen.value.substr(-1))) return screen.value;
    else{
        var result = eval(oepration);
        if(Number.isNaN(result)) return 'Error';
        else return result;
    } 
}

function inverse(val){
    if(!search_sign(screen.value.substr(-1))) return screen.value;
    else if(val===undefined) return Infinity;
    else return 1/val;
}

function clear_screen(){ screen.value = '0'; }

function search_sign(val){ return sign.indexOf(val)<0; }

function search_number(val){ return valid_keys.indexOf(val)<0; }

function dot_control(val){
    for(var i = val.length-1; i>-1; i--){
        if(!search_sign(val[i])){
            val = val.substr(i+1, val.length);
        }
    }
    if(val.indexOf('.')>-1) return true;
    return false;
}