var main = function() {
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
    var assign_roles;
    var show_pass_to;
    var pass_to;
    var show_give_role;
    var give_role;
    var show_done;
    var done;

    get_number = function() {
        num_players = $('input[name="num_players"]').val();
        num_bad = Math.ceil(num_players / 3);
        num_good = num_players - num_bad;

        show_get_names();
        /* $.getJSON($SCRIPT_ROOT + '/setNumPlayers', {
         *     a: $('input[name="a"]').val(),
         *     b: $('input[name="b"]').val()
         * }, function(data) {

         *     $('#result').text(data.result);
         *     $('input[name=a]').focus().select();
         * });*/
    };
    $('#num_players_button').bind('click', get_number);

    /* $('input[type=text]').bind('keydown', function(e) {
     *     if (e.keyCode == 13) {
     *         submit_form(e);
     *     }
     * });*/
    $('input[name=num_players]').focus();

    show_get_names = function() {
        $('#num_players_button').unbind();
        $('.num_players_page').animate({
            left: "-300px"
        }, 200);

        // Populate the page with text boxes for player names
        for(var i = num_players - 1; i >= 0; i--){
            $('.get_names_page').prepend(
                '<input type="text" name="name' + String(i) + '"> <br>'
            );
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
            left: "-300px"
        }, 200);

        $('.num_good').append(String(num_good));
        $('.num_bad').append(String(num_bad));
        if(num_bad < 3) {
            $('.remove_lt_3_bad').remove();
        }
        if(num_bad < 4) {
            $('.remove_lt_4_bad').remove();
        }
        if(num_good < 4) {
            $('.remove_lt_4_good').remove();
        } else {
            $('.num_good-3').append(String(num_good - 3));
            if(num_good < 5) {
                $('.remove_lt_5_good').remove();
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

    assign_roles = function() {
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
    };

    function hide_get_role_set(){
        $('#bland_set').unbind();
        $('#blind_set').unbind();
        $('#party_set').unbind();
        $('#snape_set').unbind();
        $('#lancelot_set').unbind();
        $('#custom_set').unbind();

        $('.get_role_set_page').animate({
            left: "-3000px"
        }, 200);
        show_pass_to();
    }

    show_pass_to = function(i) {

    };
    pass_to = function() {

    };
    show_give_role = function() {

    };
    give_role = function() {

    };
    show_done = function() {

    };
    done = function() {

    };
};

$(document).ready(main);

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
