var Roles = {
    normal_good: 0,
    merlin: 1,
    percival: 2,
    good_lancelot: 3,
    normal_bad: 4,
    mordred: 5,
    morgana: 6,
    oberon: 7,
    snape: 8,
    bad_lancelot: 9
};

// Game state data
var num_players;
var num_good;
var num_bad;
var names = [];
var good_roles = []; // Good roles to choose from
var bad_roles = []; // Evil roles to choose from
var use_roles = []; // Roles in use for this game

// Functions
var show_get_number;
var get_number;
var show_get_names;
var get_names;
var show_get_role_set;
var set_bland_set;
var set_blind_set;
var set_party_set;
var set_snape_set;
var set_lancelot_set;
var show_get_custom_set;
var get_custom_set;
var show_pass_to;
var show_role;
var show_done;

show_get_number = function() {
    $('.num_players_page').animate({
        left: "0px"
    }, 200);
    $('#num_players_button').bind('click', get_number);

    /* $('input[type=text]').bind('keydown', function(e) {
     *     if (e.keyCode == 13) {
     *         submit_form(e);
     *     }
     * });*/
    $('input[name=num_players]').focus();
};

get_number = function() {
    num_players = $('input[name="num_players"]').val();
    num_bad = Math.ceil(num_players / 3);
    num_good = num_players - num_bad;

    show_get_names();
};

show_get_names = function() {
    $('#num_players_button').unbind();
    $('.num_players_page').animate({
        left: "-100vw"
    }, 200);

    // Populate the page with text boxes for player names
    //$('.get_names_page').find

    $(".get_name_input").remove();
    for(var i = num_players - 1; i >= 0; i--){
        $('.get_names_page').prepend(
            "<span class='get_name_input'> \
<input type='text' name='name" + String(i) + "'> \
<br></span>");
    }

    $('.get_names_page').animate({
        left: "0px"
    }, 200);
    $('#get_names_button').bind('click', get_names);
};
get_names = function() {
    // Store the names into an array
    for(var i = 0; i < num_players; i++){
        names.push($('input[name="name' + String(i) + '"]').val());
    }
    show_get_role_set();
};

show_get_role_set = function() {
    $('#get_names_button').unbind();
    $('.get_names_page').animate({
        left: "-100vw"
    }, 200);

    // Fill class=num_good with value of num_good
    $('.num_good').empty();
    $('.num_good').append(String(num_good));
    $('.num_bad').empty();
    $('.num_bad').append(String(num_bad));
    if(num_bad < 3) {
        $('.remove_lt_3_bad').hide();
    }
    if(num_bad < 4) {
        $('.remove_lt_4_bad').hide();
    }
    if(num_good < 4) {
        $('.remove_lt_4_good').hide();
    } else {
        $('.num_good-3').empty();
        $('.num_good-3').append(String(num_good - 3));
        if(num_good < 5) {
            $('.remove_lt_5_good').hide();
        }
    }

    $('.get_role_set_page').animate({
        left: "0px"
    }, 200);
    $('#bland_set').bind('click', set_bland_set);
    $('#blind_set').bind('click', set_blind_set);
    $('#party_set').bind('click', set_party_set);
    $('#snape_set').bind('click', set_snape_set);
    $('#lancelot_set').bind('click', set_lancelot_set);
    $('#custom_set').bind('click', show_get_custom_set);
};
show_get_custom_set = function() {
    hide_get_role_set();
    $('.get_custom_set_page').animate({
        left: "0px"
    }, 200);

    $('#get_custom_set_button').bind('click', function(){
        if(get_custom_set()){ // If there are enough goods and bads
            $('.get_custom_set_page').animate({
                left: "-100vw"
            }, 200);
            $('#get_custom_set_button').unbind();
            assign_roles();
        }
    });
};
get_custom_set = function() {
    good_roles = [];
    bad_roles = [];
    for(var i = 0; i < $('#num_normal_good').val(); i++){
        good_roles.push(Roles.normal_good);
    }
    for(var i = 0; i < $('#num_merlin').val(); i++){
        good_roles.push(Roles.merlin);
    }
    for(var i = 0; i < $('#num_percival').val(); i++){
        good_roles.push(Roles.percival);
    }
    for(var i = 0; i < $('#num_good_lancelot').val(); i++){
        good_roles.push(Roles.good_lancelot);
    }
    for(var i = 0; i < $('#num_snape').val(); i++){
        bad_roles.push(Roles.snape);
    }
    for(var i = 0; i < $('#num_normal_bad').val(); i++){
        bad_roles.push(Roles.normal_bad);
    }
    for(var i = 0; i < $('#num_mordred').val(); i++){
        bad_roles.push(Roles.mordred);
    }
    for(var i = 0; i < $('#num_morgana').val(); i++){
        bad_roles.push(Roles.morgana);
    }
    for(var i = 0; i < $('#num_oberon').val(); i++){
        bad_roles.push(Roles.oberon);
    }
    for(var i = 0; i < $('#num_bad_lancelot').val(); i++){
        bad_roles.push(Roles.bad_lancelot);
    }
    if(good_roles.length < num_good){
        alert("You need at least " + num_good +
              " Servants of Arthur (not including Snape)");
        return false;
    }
    if(bad_roles.length < num_bad){
        alert("You need at least " + num_bad +
              " Minions of Mordred (including Snape)");
        return false;
    }
    return true;
};

set_bland_set = function() {
    for(var i = 0; i < num_good; i++){
        good_roles.push(Roles.normal_good);
    }
    for(var i = 0; i < num_bad; i++){
        bad_roles.push(Roles.normal_bad);
    }
    assign_roles();
};
set_blind_set = function() {
    for(var i = 0; i < num_good; i++){
        good_roles.push(Roles.normal_good);
    }
    for(var i = 0; i < num_bad; i++){
        bad_roles.push(Roles.oberon);
    }
    assign_roles();
};
set_party_set = function() {
    good_roles.push(Roles.merlin);
    good_roles.push(Roles.percival);
    for(var i = 0; i < num_good - 2; i++){
        good_roles.push(Roles.normal_good);
    }
    bad_roles.push(Roles.mordred);
    bad_roles.push(Roles.morgana);
    if(num_bad > 2){
        bad_roles.push(Roles.oberon);
    }
    for(var i = 0; i < num_bad - 3; i++){
        bad_roles.push(Roles.normal_bad);
    }
    assign_roles();
};
set_snape_set = function() {
    good_roles.push(Roles.merlin);
    good_roles.push(Roles.percival);
    for(var i = 0; i < num_good - 2; i++){
        good_roles.push(Roles.normal_good);
    }
    bad_roles.push(Roles.snape);
    bad_roles.push(Roles.mordred);
    if(num_good + 1 > 2){
        bad_roles.push(Roles.morgana);
    }
    if(num_good + 1 > 3){
        bad_roles.push(Roles.oberon);
    }
    for(var i = 0; i < num_good + 1 - 4; i++){
        bad_roles.push(Roles.normal_bad);
    }
    assign_roles();
};
set_lancelot_set = function() {
    good_roles.push(Roles.merlin);
    good_roles.push(Roles.percival);
    good_roles.push(Roles.good_lancelot);
    for(var i = 0; i < num_good - 3; i++){
        good_roles.push(Roles.normal_good);
    }
    bad_roles.push(Roles.bad_lancelot);
    bad_roles.push(Roles.mordred);
    if(num_bad > 2){
        bad_roles.push(Roles.morgana);
    }
    if(num_bad > 3){
        bad_roles.push(Roles.oberon);
    }
    for(var i = 0; i < num_bad - 4; i++){
        // This won't run unless you have a lot of people (13)
        bad_roles.push(Roles.normal_bad);
    }
    assign_roles();
};

function assign_roles() {
    if(num_good > good_roles.length){
        alert("Bad! Not enough good roles");
        return;
    }
    if(num_bad > bad_roles.length){
        alert("Bad! Not enough bad roles");
        return;
    }

    shuffle(good_roles);
    shuffle(bad_roles);
    use_roles = (good_roles.slice(0, num_good))
        .concat(bad_roles.slice(0, num_bad));
    shuffle(use_roles);

    hide_get_role_set();
    show_pass_to(0);
}

function hide_get_role_set(){
    $('#bland_set').unbind();
    $('#blind_set').unbind();
    $('#party_set').unbind();
    $('#snape_set').unbind();
    $('#lancelot_set').unbind();
    $('#custom_set').unbind();

    $('.get_role_set_page').animate({
        left: "-100vw"
    }, 200);
}

show_pass_to = function(player_index) {
    $('#show_role_button').unbind();
    $('.show_role_page').animate({
        left: "-100vw"
    }, 200);
    // Reset role info page
    $('.alignment').empty();
    $('.role').empty();
    $('.spy_info').show();
    $('#spy_list').empty();
    $('#bad_lancelot_info').show();
    $('#bad_lancelot').empty();
    $('#snape_info').show();
    $('#snape').empty();
    $('#merlin_info').show();
    $('#merlin').empty();
    $('#percival_info').show();
    $('#percival_list').empty();
    $('#show_role_button').hide();

    if(player_index == num_players){
        show_done();
        return;
    }

    // Put name in class=name
    $('.name').empty();
    $('.name').append(names[player_index]);
    $('.pass_to_page').animate({
        left: "0px"
    }, 200);
    $('#pass_to_button').bind('click', function(){
        show_role(player_index);
    });
};
show_role = function(player_index) {
    $('#pass_to_button').unbind();
    $('.pass_to_page').animate({
        left: "-100vw"
    }, 200);

    // Put role information in page
    var public_spy_list = "";
    for(var i = 0; i < num_players; i++){
        // If roles[i] is a (public) spy
        if([Roles.normal_bad, Roles.mordred, Roles.morgana, Roles.snape]
           .indexOf(use_roles[i]) != -1){
            public_spy_list += "<li>" + names[i] + "</li>";
        }
    }
    switch(use_roles[player_index]){
    case Roles.normal_good:
        $('.alignment').append("Arthur");
        $('.role').append("Servant of Arthur");
        $('.spy_info').hide();
        $('#bad_lancelot_info').hide();
        $('#snape_info').hide();
        $('#merlin_info').hide();
        $('#percival_info').hide();
        break;
    case Roles.merlin:
        $('.alignment').append("Arthur");
        $('.role').append("Merlin");
        for(var i = 0; i < num_players; i++){
            // If roles[i] is a spy
            if([Roles.normal_bad, Roles.morgana, Roles.oberon, Roles.snape,
                Roles.bad_lancelot].indexOf(use_roles[i]) != -1){
                $('#spy_list').append("<li>" + names[i] + "</li>");
            }
        }
        $('#bad_lancelot_info').hide();
        if(use_roles.indexOf(Roles.snape) == -1){
            $('#snape_info').hide();
        } else {
            $('#snape').append(names[use_roles.indexOf(Roles.snape)]);
        }
        $('#merlin_info').hide();
        $('#percival_info').hide();
        break;
    case Roles.percival:
        $('.alignment').append("Arthur");
        $('.role').append("Percival");
        $('.spy_info').hide();
        $('#bad_lancelot_info').hide();
        $('#snape_info').hide();
        $('#merlin_info').hide();
        for(var i = 0; i < num_players; i++){
            // If roles[i] is a merlin or morgana
            if([Roles.merlin, Roles.morgana].indexOf(use_roles[i]) != -1){
                $('#percival_list').append("<li>" + names[i] + "</li>");
            }
        }
        break;
    case Roles.good_lancelot:
        $('.alignment').append("Arthur");
        $('.role').append("Good Lancelot");
        $('.spy_info').hide();
        $('#bad_lancelot_info').hide();
        $('#snape_info').hide();
        $('#merlin_info').hide();
        $('#percival_info').hide();
        break;
    case Roles.normal_bad:
        spy_role_setup(public_spy_list);
        $('.role').append("Minion of Mordred");
        break;
    case Roles.mordred:
        spy_role_setup(public_spy_list);
        $('.role').append("Mordred");
        break;
    case Roles.morgana:
        spy_role_setup(public_spy_list);
        $('.role').append("Morgana");
        break;
    case Roles.oberon:
        $('.alignment').append("Mordred");
        $('.role').append("Oberon");
        $('.spy_info').hide();
        $('#bad_lancelot_info').hide();
        $('#snape_info').hide();
        $('#merlin_info').hide();
        $('#percival_info').hide();
        break;
    case Roles.bad_lancelot:
        $('.alignment').append("Mordred");
        $('.role').append("Evil Lancelot");
        $('.spy_info').hide();
        $('#bad_lancelot_info').hide();
        $('#snape_info').hide();
        $('#merlin_info').hide();
        $('#percival_info').hide();
        break;
    case Roles.snape:
        $('.alignment').append("Arthur");
        $('.role').append("Snape");
        for(var i = 0; i < num_players; i++){
            if([Roles.normal_bad, Roles.mordred, Roles.morgana]
               .indexOf(use_roles[i]) != -1){
                $('#spy_list').append("<li>" + names[i] + "</li>");
            }
        }
        if(use_roles.indexOf(Roles.bad_lancelot) == -1){
            $('#bad_lancelot_info').hide();
        } else {
            $('#bad_lancelot').append(
                names[use_roles.indexOf(Roles.bad_lancelot)]
            );
        }
        $('#snape_info').hide();
        $('#merlin').append(names[use_roles.indexOf(Roles.merlin)]);
        $('#percival_info').hide();
        break;
    default:
        alert("Error! No role information");
        return;
        break;
    }

    $('.show_role_page').animate({
        left: "0px"
    }, 200);
    // Done button only appears after a random amount of time
    setTimeout(function(){
        $('#show_role_button').show();
        $('#show_role_button').bind('click', function(){
            show_pass_to(player_index + 1);
        });
    }, (Math.random() * 5 + 5) * 1000);
};

show_done = function() {
    $('.done_page').animate({
        left: "0px"
    }, 200);

    $('#same_setup_button').bind('click', function(){
        hide_done();
        assign_roles();
    });
    $('#new_roles_button').bind('click', function(){
        hide_done();
        good_roles = [];
        bad_roles = [];
        use_roles = [];
        show_get_role_set();
    });
    $('#new_players_button').bind('click', function(){
        hide_done();
        num_players = 0;
        num_good = 0;
        num_bad = 0;
        names = [];
        good_roles = [];
        bad_roles = [];
        use_roles = [];
        show_get_number();
    });
};
function hide_done(){
    $('body').find("input").unbind();
    $('.done_page').animate({
        left: "-100vw"
    }, 200);

}

/* --------------------------------------------------------- */

// HELPER FUNCTIONS

// From http://stackoverflow.com/a/12646864 by Laurens Holst
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        if(i != j){
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    return array;
}
function spy_role_setup(public_spy_list){
    $('.alignment').append("Mordred");
    $('#spy_list').append(public_spy_list);
    if(use_roles.indexOf(Roles.bad_lancelot) == -1){
        $('#bad_lancelot_info').hide();
    } else {
        $('#bad_lancelot').append(
            names[use_roles.indexOf(Roles.bad_lancelot)]
        );
    }
    $('#snape_info').hide();
    $('#merlin_info').hide();
    $('#percival_info').hide();
}

/* --------------------------------------------------------- */

// ACTUAL IMPORTANT STUFF

var main = function() {
    show_get_number();
};
$(document).ready(main);
